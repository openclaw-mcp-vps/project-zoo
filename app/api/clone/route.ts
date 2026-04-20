import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildCloneCommand, getRepositorySnapshot } from "@/lib/github";
import { ACCESS_COOKIE_NAME, verifyAccessToken } from "@/lib/lemonsqueezy";
import { getTemplateById } from "@/lib/templates";

const cloneRequestSchema = z
  .object({
    templateId: z.string().optional(),
    repoUrl: z.string().url().optional(),
    targetDirectory: z
      .string()
      .regex(/^[a-zA-Z0-9._/-]+$/)
      .max(140)
      .optional()
  })
  .refine((data) => Boolean(data.templateId || data.repoUrl), {
    message: "templateId or repoUrl is required"
  });

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;

  if (!(await verifyAccessToken(token))) {
    return NextResponse.json(
      {
        error: "This action is part of the paid plan. Complete checkout and unlock access first."
      },
      { status: 402 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsedBody = cloneRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Invalid request payload",
        details: parsedBody.error.flatten()
      },
      { status: 400 }
    );
  }

  const { templateId, repoUrl, targetDirectory } = parsedBody.data;
  const template = templateId ? await getTemplateById(templateId) : null;
  const finalRepoUrl = repoUrl ?? template?.repoUrl;

  if (!finalRepoUrl) {
    return NextResponse.json({ error: "Unable to resolve repository URL." }, { status: 404 });
  }

  const command = buildCloneCommand(finalRepoUrl, targetDirectory ?? template?.slug);
  const repository = await getRepositorySnapshot(finalRepoUrl);

  return NextResponse.json({
    command,
    repository,
    template: template
      ? {
          id: template.id,
          name: template.name,
          repoUrl: template.repoUrl
        }
      : null
  });
}
