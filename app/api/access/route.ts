import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAccessToken, ACCESS_COOKIE_NAME } from "@/lib/lemonsqueezy";
import { getSupabaseServiceClient } from "@/lib/supabase";

const accessSchema = z.object({
  orderId: z.string().trim().min(1),
  email: z.string().email()
});

const qualifyingStates = new Set(["active", "paid", "completed"]);

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = accessSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Provide a valid order ID and email." }, { status: 400 });
  }

  const { orderId, email } = parsed.data;
  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json(
      {
        error: "Supabase service credentials are not configured. Cannot verify purchases yet."
      },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("purchases")
    .select("order_id,email,status")
    .eq("order_id", orderId)
    .ilike("email", email)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Purchase verification failed. Please try again." }, { status: 500 });
  }

  if (!data || !qualifyingStates.has(String(data.status ?? "").toLowerCase())) {
    return NextResponse.json(
      {
        error: "No paid order was found for this order ID and email yet."
      },
      { status: 404 }
    );
  }

  const token = await createAccessToken(orderId, email);

  const response = NextResponse.json({
    message: "Access unlocked. You can now browse and clone templates."
  });

  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 31
  });

  return response;
}
