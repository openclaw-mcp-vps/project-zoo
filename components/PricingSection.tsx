"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function PricingSection() {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function claimAccess(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !accessToken) {
      toast.error("Enter the purchase email and access token from your receipt.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/access/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, accessToken })
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to unlock access.");
      }

      toast.success("Access unlocked. Redirecting to the template catalog...");
      router.push("/browse");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to validate your purchase right now."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="pricing" className="mx-auto mt-20 w-full max-w-6xl px-4">
      <Card className="border-teal-500/30 bg-slate-900/70">
        <CardHeader>
          <Badge className="w-fit">Pro Access</Badge>
          <CardTitle className="mt-3 text-3xl sm:text-4xl">$19/month</CardTitle>
          <p className="max-w-2xl text-slate-300">
            Browse every curated template, copy production-ready clone commands,
            and skip repetitive project setup every sprint.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-teal-500 px-6 font-semibold text-slate-950 transition hover:bg-teal-400"
              >
                Buy Pro Access
              </a>
              <p className="text-sm text-slate-400">
                Hosted Stripe checkout. No account setup required. You can manage
                billing directly from Stripe once subscribed.
              </p>
            </div>

            <form onSubmit={claimAccess} className="space-y-3">
              <h3 className="text-base font-semibold text-slate-100">
                Already purchased?
              </h3>
              <p className="text-sm text-slate-400">
                Paste the access token from your receipt email to unlock the full
                template catalog on this device.
              </p>
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                type="text"
                placeholder="access token"
                value={accessToken}
                onChange={(event) => setAccessToken(event.target.value)}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Validating..." : "Unlock Access"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
