import { TEMPLATE_CATALOG } from "@/lib/template-seed";
import { getSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { Template, TemplateFilters } from "@/types/template";

type TemplateRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: Template["category"];
  pricing: Template["pricing"];
  technologies: string[];
  features: string[];
  repository_url: string;
  preview_url: string;
  stars: number;
  updated_at: string;
  setup_time_minutes: number;
  difficulty: Template["difficulty"];
};

function normalizeTemplate(row: TemplateRow): Template {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    category: row.category,
    pricing: row.pricing,
    technologies: row.technologies,
    features: row.features,
    repositoryUrl: row.repository_url,
    previewUrl: row.preview_url,
    stars: row.stars,
    updatedAt: row.updated_at,
    setupTimeMinutes: row.setup_time_minutes,
    difficulty: row.difficulty
  };
}

async function loadFromSupabase(): Promise<Template[] | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("stars", { ascending: false });

  if (error || !data) {
    return null;
  }

  return (data as TemplateRow[]).map(normalizeTemplate);
}

function applyFilters(templates: Template[], filters?: TemplateFilters) {
  if (!filters) {
    return templates;
  }

  const query = filters.query?.trim().toLowerCase();

  return templates.filter((template) => {
    const matchesQuery =
      !query ||
      template.name.toLowerCase().includes(query) ||
      template.tagline.toLowerCase().includes(query) ||
      template.technologies.some((tech) => tech.toLowerCase().includes(query));

    const matchesCategory =
      !filters.category ||
      filters.category === "All" ||
      template.category === filters.category;

    const matchesTechnology =
      !filters.technology ||
      filters.technology === "All" ||
      template.technologies.includes(filters.technology);

    const matchesPricing =
      !filters.pricing ||
      filters.pricing === "all" ||
      template.pricing === filters.pricing;

    return (
      matchesQuery && matchesCategory && matchesTechnology && matchesPricing
    );
  });
}

export async function getTemplates(filters?: TemplateFilters) {
  const supabaseTemplates = await loadFromSupabase();
  const source = supabaseTemplates ?? TEMPLATE_CATALOG;
  const filtered = applyFilters(source, filters);

  return filtered.sort((a, b) => b.stars - a.stars);
}

export async function getTemplateBySlug(slug: string) {
  const templates = await getTemplates();
  return templates.find((template) => template.slug === slug) ?? null;
}

export function getTemplateCategories(templates: Template[]) {
  return ["All", ...new Set(templates.map((template) => template.category))];
}

export function getTemplateTechnologies(templates: Template[]) {
  return ["All", ...new Set(templates.flatMap((template) => template.technologies))];
}
