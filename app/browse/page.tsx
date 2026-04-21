import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BrowseClient } from "@/components/BrowseClient";
import { ACCESS_COOKIE_NAME } from "@/lib/constants";
import { verifyAccessToken } from "@/lib/lemonsqueezy";

export default async function BrowsePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
  const session = verifyAccessToken(accessToken);

  if (!session) {
    redirect("/?paywall=1");
  }

  return <BrowseClient />;
}
