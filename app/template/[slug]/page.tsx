import { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TemplatePreview } from "@/components/TemplatePreview";
import { Badge } from "@/components/ui/badge";
import { getTemplateBySlug } from "@/lib/templates";
import { ACCESS_COOKIE_NAME } from "@/lib/constants";
import { verifyAccessToken } from "@/lib/lemonsqueezy";

type TemplatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    return {
      title: "Template Not Found"
    };
  }

  return {
    title: `${template.name} Template`,
    description: template.description,
    openGraph: {
      title: `${template.name} | project-zoo`,
      description: template.tagline
    }
  };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
  const session = verifyAccessToken(accessToken);

  if (!session) {
    redirect("/?paywall=1");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10">
      <Link
        href="/browse"
        className="mb-6 inline-flex items-center text-sm text-slate-300 hover:text-slate-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to catalog
      </Link>

      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{template.category}</Badge>
          <Badge variant="secondary">{template.pricing.toUpperCase()}</Badge>
          <Badge variant="outline">{template.difficulty}</Badge>
        </div>

        <h1 className="mt-4 text-3xl font-semibold text-slate-100">{template.name}</h1>
        <p className="mt-2 max-w-3xl text-slate-300">{template.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {template.technologies.map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
      </section>

      <TemplatePreview template={template} hasAccess />
    </main>
  );
}
