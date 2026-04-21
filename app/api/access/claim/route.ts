import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE_MAX_AGE, ACCESS_COOKIE_NAME } from "@/lib/constants";
import { verifyAccessToken } from "@/lib/lemonsqueezy";

type ClaimBody = {
  email?: string;
  accessToken?: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as ClaimBody;

  if (!body.email || !body.accessToken) {
    return NextResponse.json(
      { error: "Email and access token are required." },
      { status: 400 }
    );
  }

  const session = verifyAccessToken(body.accessToken);

  if (!session || session.email.toLowerCase() !== body.email.toLowerCase()) {
    return NextResponse.json(
      { error: "Purchase validation failed. Double-check your receipt details." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: body.accessToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ACCESS_COOKIE_MAX_AGE,
    path: "/"
  });

  return response;
}
