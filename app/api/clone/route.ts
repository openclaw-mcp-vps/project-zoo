import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME } from "@/lib/constants";
import { buildCloneCommand, getRepositoryCloneInfo } from "@/lib/github";
import { verifyAccessToken } from "@/lib/lemonsqueezy";
import { getTemplateBySlug } from "@/lib/templates";

type CloneBody = {
  slug?: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as CloneBody;

  if (!body.slug) {
    return NextResponse.json(
      { error: "Template slug is required." },
      { status: 400 }
    );
  }

  const template = await getTemplateBySlug(body.slug);

  if (!template) {
    return NextResponse.json({ error: "Template not found." }, { status: 404 });
  }

  const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const hasAccess = Boolean(verifyAccessToken(token));

  if (template.pricing === "premium" && !hasAccess) {
    return NextResponse.json(
      { error: "Premium access is required to clone this template." },
      { status: 402 }
    );
  }

  const cloneInfo = await getRepositoryCloneInfo(template.repositoryUrl);

  return NextResponse.json({
    repositoryUrl: cloneInfo.cloneUrl,
    cloneCommand: buildCloneCommand(cloneInfo, template.slug)
  });
}
