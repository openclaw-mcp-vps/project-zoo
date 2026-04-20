import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Providers } from "@/app/providers";
import { cn } from "@/lib/utils";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://project-zoo.app"),
  title: {
    default: "project-zoo | Launch Projects Without Boilerplate Setup",
    template: "%s | project-zoo"
  },
  description:
    "project-zoo is a curated directory of production-ready open-source project templates. Find, preview, and clone the right boilerplate in minutes.",
  keywords: [
    "open source templates",
    "starter kits",
    "project boilerplates",
    "developer productivity",
    "Next.js templates",
    "SaaS starter kits"
  ],
  openGraph: {
    title: "project-zoo",
    description:
      "Stop rebuilding setup from scratch. Discover proven project templates across modern stacks and clone in one command.",
    type: "website",
    url: "https://project-zoo.app",
    siteName: "project-zoo",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "project-zoo template directory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "project-zoo",
    description:
      "A curated template directory for developers who ship often and want to skip repetitive setup.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    ]
  }
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className={cn(displayFont.variable, monoFont.variable, "min-h-screen")}> 
        <Providers>{children}</Providers>
        <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
