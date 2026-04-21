import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME } from "@/lib/constants";
import { verifyAccessToken } from "@/lib/lemonsqueezy";
import {
  getTemplateCategories,
  getTemplateTechnologies,
  getTemplates
} from "@/lib/templates";
import { TemplateFilters } from "@/types/template";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const filters: TemplateFilters = {
    query: params.get("query") ?? undefined,
    category: (params.get("category") as TemplateFilters["category"]) ?? undefined,
    technology:
      (params.get("technology") as TemplateFilters["technology"]) ?? undefined,
    pricing: (params.get("pricing") as TemplateFilters["pricing"]) ?? undefined
  };

  const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const hasAccess = Boolean(verifyAccessToken(token));

  const allTemplates = await getTemplates();
  const filteredTemplates = await getTemplates(filters);
  const visibleTemplates = hasAccess
    ? filteredTemplates
    : filteredTemplates.filter((template) => template.pricing === "free");

  return NextResponse.json({
    templates: visibleTemplates,
    hasAccess,
    categories: getTemplateCategories(allTemplates),
    technologies: getTemplateTechnologies(allTemplates)
  });
}
