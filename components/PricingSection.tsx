"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Lock, Rocket, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface AccessPayload {
  message?: string;
  error?: string;
}

export function PricingSection() {
  const router = useRouter();
  const checkoutVariantId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID;
  const checkoutUrl = checkoutVariantId
    ? `https://checkout.lemonsqueezy.com/buy/${checkoutVariantId}?embed=1&media=0&logo=0`
    : "";

  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  async function unlockAccess() {
    if (!orderId.trim() || !email.trim()) {
      toast.error("Enter the order ID and purchase email to unlock access.");
      return;
    }

    setIsUnlocking(true);

    try {
      const response = await fetch("/api/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId,
          email
        })
      });

      const payload = (await response.json()) as AccessPayload;

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to unlock your account yet.");
      }

      toast.success(payload.message ?? "Access unlocked. Redirecting...");
      router.push("/templates");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unlock failed.");
    } finally {
      setIsUnlocking(false);
    }
  }

  return (
    <section id="pricing" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">One plan, immediate setup velocity</h2>
          <p className="mt-3 text-[var(--muted)]">
            Skip repetitive starter setup and focus your coding time on product logic, not scaffolding.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="border-blue-300/30">
            <CardHeader>
              <CardTitle className="text-2xl">project-zoo Pro</CardTitle>
              <p className="text-4xl font-semibold tracking-tight">
                $19
                <span className="ml-1 text-base font-normal text-[var(--muted)]">/ month</span>
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-[var(--muted)]">
                <li className="inline-flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-300" />
                  Curated template directory with quality checks and setup notes
                </li>
                <li className="inline-flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-300" />
                  Guided clone commands and stack filtering for faster project fit
                </li>
                <li className="inline-flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-300" />
                  Ongoing additions of new boilerplates across frontend, backend, and mobile
                </li>
                <li className="inline-flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-blue-300" />
                  Access control backed by Lemon Squeezy payment + signed cookie gate
                </li>
              </ul>

              {checkoutUrl ? (
                <a href={checkoutUrl} className="lemonsqueezy-button block">
                  <Button size="lg" className="w-full">
                    <Rocket className="h-4 w-4" />
                    Start Pro Access
                  </Button>
                </a>
              ) : (
                <Button size="lg" className="w-full" disabled>
                  Configure Lemon Squeezy env vars to enable checkout
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-xl">
                <Lock className="h-5 w-5 text-blue-300" />
                Unlock Your Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-[var(--muted)]">
                After checkout, enter your Lemon Squeezy order ID and purchase email to activate your cookie-based access.
              </p>
              <Input
                value={orderId}
                onChange={(event) => setOrderId(event.target.value)}
                placeholder="Order ID (for example: 123456)"
              />
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Purchase email"
                type="email"
              />
              <Button onClick={unlockAccess} variant="success" className="w-full" disabled={isUnlocking}>
                {isUnlocking ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isUnlocking ? "Verifying..." : "Unlock Access"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
