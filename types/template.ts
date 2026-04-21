export type TemplatePricing = "free" | "premium";

export type TemplateCategory =
  | "SaaS"
  | "AI"
  | "Ecommerce"
  | "Fullstack"
  | "DevTools"
  | "Mobile";

export type TemplateDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Template {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: TemplateCategory;
  pricing: TemplatePricing;
  technologies: string[];
  features: string[];
  repositoryUrl: string;
  previewUrl: string;
  stars: number;
  updatedAt: string;
  setupTimeMinutes: number;
  difficulty: TemplateDifficulty;
}

export interface TemplateFilters {
  query?: string;
  category?: TemplateCategory | "All";
  technology?: string | "All";
  pricing?: TemplatePricing | "all";
}
