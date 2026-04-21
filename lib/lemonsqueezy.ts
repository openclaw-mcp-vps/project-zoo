import { createHmac, timingSafeEqual } from "crypto";
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import { ACCESS_COOKIE_MAX_AGE } from "@/lib/constants";

type AccessPayload = {
  email: string;
  plan: "pro";
  iat: number;
  exp: number;
};

function getCookieSecret() {
  return (
    process.env.PROJECT_ZOO_ACCESS_COOKIE_SECRET ??
    process.env.STRIPE_WEBHOOK_SECRET ??
    "project-zoo-local-dev-secret"
  );
}

function signPayload(payload: string) {
  return createHmac("sha256", getCookieSecret()).update(payload).digest("base64url");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function bootstrapLemonSqueezyClient() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (apiKey) {
    lemonSqueezySetup({ apiKey, onError: (error) => console.error(error) });
  }
}

export function createAccessToken(email: string) {
  const now = Math.floor(Date.now() / 1000);
  const payload: AccessPayload = {
    email,
    plan: "pro",
    iat: now,
    exp: now + ACCESS_COOKIE_MAX_AGE
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAccessToken(token: string | undefined | null) {
  if (!token || !token.includes(".")) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);

  const signatureMatches = safeCompare(signature, expectedSignature);

  if (!signatureMatches) {
    return null;
  }

  const payload = JSON.parse(
    Buffer.from(encodedPayload, "base64url").toString("utf8")
  ) as AccessPayload;

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}

export function verifyPurchaseSignature(signature: string | null) {
  if (!signature) {
    return false;
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return false;
  }

  return safeCompare(signature, secret);
}
