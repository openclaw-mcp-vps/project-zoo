import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE_MAX_AGE, ACCESS_COOKIE_NAME } from "@/lib/constants";
import {
  createAccessToken,
  verifyAccessToken,
  verifyPurchaseSignature
} from "@/lib/lemonsqueezy";

type StripeLikeEvent = {
  type?: string;
  email?: string;
  data?: {
    object?: {
      customer_details?: {
        email?: string;
      };
    };
    attributes?: {
      user_email?: string;
    };
  };
};

function extractEmail(payload: StripeLikeEvent) {
  return (
    payload.email ??
    payload.data?.object?.customer_details?.email ??
    payload.data?.attributes?.user_email ??
    null
  );
}

function setAccessCookie(response: NextResponse, accessToken: string) {
  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: accessToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ACCESS_COOKIE_MAX_AGE,
    path: "/"
  });
}

export async function POST(request: NextRequest) {
  const signature =
    request.headers.get("x-project-zoo-signature") ??
    request.headers.get("stripe-signature");

  if (!verifyPurchaseSignature(signature)) {
    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 401 }
    );
  }

  const payload = (await request.json().catch(() => ({}))) as StripeLikeEvent;
  const eventType = payload.type ?? "unknown";
  const email = extractEmail(payload);

  if (!email) {
    return NextResponse.json(
      { error: "Unable to locate buyer email in payload." },
      { status: 400 }
    );
  }

  const accessToken = createAccessToken(email);

  return NextResponse.json({
    received: true,
    eventType,
    email,
    accessToken,
    instructions:
      "Send this access token to the buyer, then call /api/access/claim from the client to set the paywall cookie."
  });
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  const accessToken = request.nextUrl.searchParams.get("access_token");

  const tokenPayload = verifyAccessToken(accessToken);

  if (!email || !accessToken || !tokenPayload || tokenPayload.email !== email) {
    return NextResponse.redirect(new URL("/?paywall=1", request.url));
  }

  const response = NextResponse.redirect(new URL("/browse", request.url));
  setAccessCookie(response, accessToken);

  return response;
}
