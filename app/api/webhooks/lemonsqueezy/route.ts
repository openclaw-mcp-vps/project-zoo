import { NextRequest, NextResponse } from "next/server";
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import { lemonWebhookSchema, verifyLemonWebhookSignature } from "@/lib/lemonsqueezy";
import { getSupabaseServiceClient } from "@/lib/supabase";

const statusByEventName: Record<string, "active" | "inactive"> = {
  order_created: "active",
  subscription_created: "active",
  subscription_resumed: "active",
  subscription_payment_success: "active",
  subscription_expired: "inactive",
  subscription_cancelled: "inactive"
};

function extractEmail(attributes: Record<string, unknown>): string | null {
  const emailValue = attributes.user_email ?? attributes.customer_email ?? attributes.email;

  if (typeof emailValue !== "string") {
    return null;
  }

  return emailValue;
}

function extractOrderId(payloadId: string, attributes: Record<string, unknown>): string {
  const candidates = [attributes.order_id, attributes.order_number, attributes.identifier, payloadId];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }

    if (typeof candidate === "number") {
      return String(candidate);
    }
  }

  return payloadId;
}

export async function POST(request: NextRequest) {
  if (process.env.LEMON_SQUEEZY_API_KEY) {
    lemonSqueezySetup({
      apiKey: process.env.LEMON_SQUEEZY_API_KEY
    });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-signature") ?? request.headers.get("X-Signature");

  if (!(await verifyLemonWebhookSignature(rawBody, signature))) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  const payloadResult = lemonWebhookSchema.safeParse(JSON.parse(rawBody));

  if (!payloadResult.success) {
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }

  const payload = payloadResult.data;
  const eventName = payload.meta.event_name;
  const nextStatus = statusByEventName[eventName];

  if (!nextStatus) {
    return NextResponse.json({ received: true, ignored: true, reason: "Unhandled event" });
  }

  const attributes = (payload.data.attributes ?? {}) as Record<string, unknown>;
  const email = extractEmail(attributes);

  if (!email) {
    return NextResponse.json({ error: "Webhook payload is missing customer email" }, { status: 400 });
  }

  const orderId = extractOrderId(payload.data.id, attributes);
  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json({ received: true, warning: "Supabase not configured; event accepted without persistence." });
  }

  const { error } = await supabase.from("purchases").upsert(
    {
      order_id: orderId,
      email,
      status: nextStatus,
      source: "lemonsqueezy",
      updated_at: new Date().toISOString()
    },
    {
      onConflict: "order_id"
    }
  );

  if (error) {
    return NextResponse.json({ error: "Failed to persist webhook event" }, { status: 500 });
  }

  return NextResponse.json({ received: true, orderId, status: nextStatus });
}
