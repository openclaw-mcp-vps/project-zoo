import type { Metadata } from "next";
import { ArrowLeft, Clock3, ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TemplatePreview } from "@/components/TemplatePreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTemplateById } from "@/lib/templates";

interface TemplateDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: TemplateDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const template = await getTemplateById(id);

  if (!template) {
    return {
      title: "Template Not Found"
    };
  }

  return {
    title: template.name,
    description: template.summary,
    openGraph: {
      title: `${template.name} | project-zoo`,
      description: template.summary,
      images: template.previewImages.slice(0, 1).map((url) => ({ url }))
    }
  };
}

export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { id } = await params;
  const template = await getTemplateById(id);

  if (!template) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/templates">
            <ArrowLeft className="h-4 w-4" />
            Back to directory
          </Link>
        </Button>
      </div>

      <section className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{template.category}</Badge>
          <Badge>{template.difficulty}</Badge>
          <Badge>{template.license}</Badge>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{template.name}</h1>
        <p className="max-w-3xl text-[var(--muted)]">{template.description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-4 w-4 text-blue-300" />
            Setup time: {template.setupTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            {template.stars.toLocaleString()} stars
          </span>
          <a href={template.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-300">
            GitHub source
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <TemplatePreview template={template} />

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stack</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {template.stack.map((stackItem) => (
              <Badge key={stackItem}>{stackItem}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {template.highlights.map((highlight) => (
                <li key={highlight} className="list-inside list-disc">
                  {highlight}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
