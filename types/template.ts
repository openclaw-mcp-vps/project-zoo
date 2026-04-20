export type TemplateDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type TemplateLicense = "MIT" | "Apache-2.0" | "GPL-3.0" | "BSD-3-Clause";

export type TemplateCategory = "Full-Stack" | "Frontend" | "Backend" | "Mobile" | "Data";

export interface Template {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  category: TemplateCategory;
  stack: string[];
  difficulty: TemplateDifficulty;
  setupTime: string;
  repoUrl: string;
  demoUrl?: string;
  stars: number;
  license: TemplateLicense;
  lastUpdated: string;
  tags: string[];
  previewImages: string[];
  highlights: string[];
  featured?: boolean;
}
