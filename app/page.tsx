import { ArrowRight, Clock3, FolderGit2, Search, Shield } from "lucide-react";
import Link from "next/link";
import { PricingSection } from "@/components/PricingSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CURATED_TEMPLATES } from "@/lib/template-data";

interface HomePageProps {
  searchParams?: Promise<{
    paywall?: string;
  }>;
}

const problemPoints = [
  {
    title: "Repeated setup overhead",
    detail: "Developers lose 2-4 hours per project redoing tooling, linting, auth setup, and CI scaffolding."
  },
  {
    title: "Poor template quality control",
    detail: "Many boilerplates are outdated, abandoned, or missing production concerns like security and deployment."
  },
  {
    title: "AI speeds coding, not setup discovery",
    detail: "The new bottleneck is selecting the right foundation before implementation starts."
  }
];

const solutionSteps = [
  {
    icon: Search,
    title: "Find by stack and constraints",
    detail: "Filter templates by framework, difficulty, and license so you avoid dead-end starter choices."
  },
  {
    icon: FolderGit2,
    title: "Preview before commit",
    detail: "See architecture notes, feature highlights, and clone readiness before you pick a base."
  },
  {
    icon: Clock3,
    title: "Clone in one command",
    detail: "Generate clone commands instantly and move from idea to coding in minutes."
  },
  {
    icon: Shield,
    title: "Paid access, focused curation",
    detail: "Subscription-backed model funds continuous vetting and weekly additions, not random link dumps."
  }
];

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const featuredTemplates = CURATED_TEMPLATES.filter((template) => template.featured).slice(0, 3);

  return (
    <main>
      <section className="grid-fade border-b border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <Badge variant="accent">Curated templates for teams that ship fast</Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            project-zoo helps you launch new projects without losing hours to boilerplate setup.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
            A vetted directory of open-source templates across modern stacks. Find the right starter, preview structure,
            and clone with confidence instead of rebuilding the same foundation every sprint.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="#pricing">
                Unlock Pro Access
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/templates">Open Template Directory</Link>
            </Button>
          </div>

          {resolvedSearchParams?.paywall === "1" ? (
            <p className="mt-6 max-w-2xl rounded-md border border-blue-300/40 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
              Template access is paid. Complete checkout and unlock with your order ID to continue.
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Why project setup still hurts</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {problemPoints.map((point) => (
              <Card key={point.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--muted)]">{point.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How the directory works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {solutionSteps.map((step) => (
              <Card key={step.title}>
                <CardHeader>
                  <CardTitle className="inline-flex items-center gap-2 text-lg">
                    <step.icon className="h-5 w-5 text-blue-300" />
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--muted)]">{step.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Featured template picks</h2>
            <Badge>{CURATED_TEMPLATES.length} templates in directory</Badge>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-[var(--muted)]">{template.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.stack.slice(0, 3).map((item) => (
                      <Badge key={`${template.id}-${item}`}>{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">FAQ</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What makes this different from searching GitHub manually?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted)]">
                  project-zoo removes low-signal repos and indexes practical attributes like setup complexity, stack fit,
                  and maintenance quality so selection takes minutes instead of hours.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can small teams use this for rapid client work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted)]">
                  Yes. Agencies and startup teams use the directory to standardize project bootstrapping and reduce repeated
                  setup across monthly deliverables.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How is access controlled after payment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted)]">
                  Lemon Squeezy purchase events are validated, then a signed cookie unlocks the paid template routes and clone API.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do templates include setup guidance?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted)]">
                  Every entry includes context on setup time, difficulty, core features, and direct repository links to help you launch quickly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
