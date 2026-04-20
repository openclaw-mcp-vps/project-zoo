import { z } from "zod";

export const ACCESS_COOKIE_NAME = "project_zoo_access";

const accessPayloadSchema = z.object({
  orderId: z.string().min(1),
  email: z.string().email(),
  exp: z.number().int().positive()
});

export const lemonWebhookSchema = z
  .object({
    meta: z
      .object({
        event_name: z.string()
      })
      .passthrough(),
    data: z
      .object({
        id: z.string(),
        attributes: z.record(z.string(), z.unknown()).optional()
      })
      .passthrough()
  })
  .passthrough();

export type LemonWebhookPayload = z.infer<typeof lemonWebhookSchema>;

const signatureSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function signValue(value: string): Promise<string> {
  if (!signatureSecret) {
    return "";
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signatureSecret),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function getCheckoutUrl(): string {
  const variantId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID;

  if (!variantId) {
    return "";
  }

  return `https://checkout.lemonsqueezy.com/buy/${variantId}?embed=1&media=0&logo=0`;
}

export async function verifyLemonWebhookSignature(
  rawBody: string,
  incomingSignature: string | null
): Promise<boolean> {
  if (!signatureSecret || !incomingSignature) {
    return false;
  }

  const digest = await signValue(rawBody);
  return digest === incomingSignature;
}

export async function createAccessToken(orderId: string, email: string): Promise<string> {
  const payload = accessPayloadSchema.parse({
    orderId,
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 31
  });

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = await signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAccessToken(
  token: string | undefined
): Promise<z.infer<typeof accessPayloadSchema> | null> {
  if (!token || !signatureSecret) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = await signValue(encodedPayload);

  if (!expectedSignature || expectedSignature !== signature) {
    return null;
  }

  try {
    const decoded = JSON.parse(fromBase64Url(encodedPayload));
    const payload = accessPayloadSchema.parse(decoded);

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
