import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase";
import { CURATED_TEMPLATES } from "@/lib/template-data";
import type { Template } from "@/types/template";

const templateSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  description: z.string(),
  category: z.enum(["Full-Stack", "Frontend", "Backend", "Mobile", "Data"]),
  stack: z.array(z.string()),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  setupTime: z.string(),
  repoUrl: z.string().url(),
  demoUrl: z.string().url().optional(),
  stars: z.number().int().nonnegative(),
  license: z.enum(["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause"]),
  lastUpdated: z.string(),
  tags: z.array(z.string()),
  previewImages: z.array(z.string().url()),
  highlights: z.array(z.string()),
  featured: z.boolean().optional()
});

export interface TemplateFilters {
  search?: string;
  stack?: string;
  difficulty?: Template["difficulty"];
  license?: Template["license"];
  limit?: number;
}

function normalizeTemplate(input: unknown): Template | null {
  const parsed = templateSchema.safeParse(input);
  return parsed.success ? parsed.data : null;
}

function applyFilters(templates: Template[], filters: TemplateFilters): Template[] {
  let filtered = [...templates];

  if (filters.search) {
    const q = filters.search.trim().toLowerCase();
    filtered = filtered.filter((template) => {
      const haystack = [
        template.name,
        template.summary,
        template.description,
        template.tags.join(" "),
        template.stack.join(" ")
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }

  if (filters.stack) {
    filtered = filtered.filter((template) =>
      template.stack.some((item) => item.toLowerCase() === filters.stack?.toLowerCase())
    );
  }

  if (filters.difficulty) {
    filtered = filtered.filter((template) => template.difficulty === filters.difficulty);
  }

  if (filters.license) {
    filtered = filtered.filter((template) => template.license === filters.license);
  }

  filtered.sort((a, b) => b.stars - a.stars);

  if (filters.limit && filters.limit > 0) {
    return filtered.slice(0, filters.limit);
  }

  return filtered;
}

async function fetchTemplatesFromSupabase(): Promise<Template[] | null> {
  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("templates").select("*").limit(300);

  if (error || !data) {
    return null;
  }

  const parsed = data.map(normalizeTemplate).filter((template): template is Template => Boolean(template));
  return parsed.length ? parsed : null;
}

export async function getTemplates(filters: TemplateFilters = {}): Promise<Template[]> {
  const supabaseTemplates = await fetchTemplatesFromSupabase();
  const source = supabaseTemplates ?? CURATED_TEMPLATES;
  return applyFilters(source, filters);
}

export async function getTemplateById(id: string): Promise<Template | null> {
  const templates = await getTemplates();
  return templates.find((template) => template.id === id || template.slug === id) ?? null;
}
