import { LandingClient } from "@/components/LandingClient";

type HomePageProps = {
  searchParams?: Promise<{
    paywall?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;

  return <LandingClient paywallTriggered={resolvedSearchParams?.paywall === "1"} />;
}
