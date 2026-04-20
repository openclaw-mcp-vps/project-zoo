import type { Metadata } from "next";
import Link from "next/link";
import { TemplatesDirectory } from "@/components/TemplatesDirectory";
import { Button } from "@/components/ui/button";
import { getTemplates } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Template Directory",
  description: "Browse production-ready project templates by stack, complexity, and licensing constraints."
};

export default async function TemplatesPage() {
  const templates = await getTemplates({ limit: 120 });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Template Directory</h1>
          <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
            Explore vetted starter projects across full-stack, backend, frontend, mobile, and data workflows.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/">Back to Landing</Link>
        </Button>
      </div>

      <TemplatesDirectory templates={templates} />
    </main>
  );
}
