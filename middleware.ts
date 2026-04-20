import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { ACCESS_COOKIE_NAME, verifyAccessToken } from "@/lib/lemonsqueezy";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Keep Supabase helper middleware active so auth integration can be expanded without rewiring.
  createMiddlewareClient({ req: request, res: response });

  const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const hasAccess = Boolean(await verifyAccessToken(token));

  const pathname = request.nextUrl.pathname;
  const isCloneApi = pathname.startsWith("/api/clone");
  const isTemplatePages = pathname.startsWith("/templates");

  if (!hasAccess && (isCloneApi || isTemplatePages)) {
    if (isCloneApi) {
      return NextResponse.json(
        {
          error: "Payment required: unlock your account before cloning templates."
        },
        { status: 402 }
      );
    }

    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("paywall", "1");
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/templates/:path*", "/api/clone"]
};
