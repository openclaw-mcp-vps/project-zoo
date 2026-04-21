"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, Layers3, Rocket } from "lucide-react";
import { PricingSection } from "@/components/PricingSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LandingClientProps = {
  paywallTriggered: boolean;
};

const faq = [
  {
    question: "What exactly is included in the Pro plan?",
    answer:
      "You unlock the full curated catalog, premium template metadata, one-click clone command generation, and continuous updates as new high-quality starters are added."
  },
  {
    question: "How much setup time does project-zoo save in practice?",
    answer:
      "Most teams report saving 2-4 hours per new project by skipping repetitive initial setup, tooling wiring, and repo hunting."
  },
  {
    question: "Do templates include only JavaScript stacks?",
    answer:
      "No. The catalog includes Next.js, Rails, Laravel, Django, Expo, and additional fullstack templates across multiple ecosystems."
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes. Billing is managed via Stripe hosted checkout and self-serve customer portal controls."
  }
];

export function LandingClient({ paywallTriggered }: LandingClientProps) {
  return (
    <main className="overflow-x-hidden pb-20">
      <section className="relative mx-auto max-w-6xl px-4 pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.15),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.14),transparent_40%)]" />

        {paywallTriggered ? (
          <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Pro access is required to use the full template tool. Start a plan below
            and unlock instantly.
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl"
        >
          <Badge>Curated Project Template Directory</Badge>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-100 sm:text-6xl">
            Stop rebuilding boilerplate.
            <br />
            Start shipping from day one.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            project-zoo helps developers find proven open-source starters across
            modern stacks, preview architecture fast, and clone production-grade
            foundations in seconds.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#pricing">
                Get Pro Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/browse">Open Catalog</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl gap-4 px-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Clock3 className="mr-2 h-5 w-5 text-teal-300" />
              The Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            Teams lose momentum every time they bootstrap a new project: package
            setup, auth wiring, linting, folder structure, and DevOps scaffolding.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Layers3 className="mr-2 h-5 w-5 text-teal-300" />
              The Solution
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            project-zoo indexes and scores battle-tested template repos so you can
            pick a stack, inspect fit quickly, and start coding features.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Rocket className="mr-2 h-5 w-5 text-teal-300" />
              The Outcome
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            Prototype in hours, not days. Keep team velocity high while still
            starting from quality foundations that are easy to maintain.
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4">
        <h2 className="text-3xl font-semibold text-slate-100">Why developers pay for this</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Skip GitHub rabbit holes with stack-specific curated picks.",
            "Compare setup time, complexity, and maintenance burden before cloning.",
            "Spot premium templates that already include auth, billing, and CI.",
            "Use one-click clone commands tailored to each repository."
          ].map((item) => (
            <div
              key={item}
              className="flex items-start rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-200"
            >
              <CheckCircle2 className="mr-3 mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <PricingSection />

      <section className="mx-auto mt-20 max-w-6xl px-4" id="faq">
        <h2 className="text-3xl font-semibold text-slate-100">FAQ</h2>
        <div className="mt-6 space-y-3">
          {faq.map((item) => (
            <Card key={item.question}>
              <CardHeader>
                <CardTitle className="text-lg">{item.question}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">{item.answer}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
