import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getTemplateById, getTemplates } from "@/lib/templates";

const querySchema = z.object({
  id: z.string().optional(),
  search: z.string().optional(),
  stack: z.string().optional(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  license: z.enum(["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause"]).optional(),
  limit: z.number().int().positive().max(200).optional()
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const parsedQuery = querySchema.safeParse({
    id: searchParams.get("id") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    stack: searchParams.get("stack") ?? undefined,
    difficulty: searchParams.get("difficulty") ?? undefined,
    license: searchParams.get("license") ?? undefined,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined
  });

  if (!parsedQuery.success) {
    return NextResponse.json(
      {
        error: "Invalid query parameters",
        details: parsedQuery.error.flatten()
      },
      { status: 400 }
    );
  }

  if (parsedQuery.data.id) {
    const template = await getTemplateById(parsedQuery.data.id);

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    return NextResponse.json({ data: template });
  }

  const templates = await getTemplates(parsedQuery.data);
  return NextResponse.json({ data: templates, count: templates.length });
}
