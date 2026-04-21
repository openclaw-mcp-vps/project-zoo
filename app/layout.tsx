import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  title: {
    default: "project-zoo | Curated Open-Source Starter Templates",
    template: "%s | project-zoo"
  },
  description:
    "project-zoo is a curated directory of open-source project templates and boilerplates so developers can clone proven starters instead of rebuilding setup.",
  keywords: [
    "project templates",
    "starter kits",
    "boilerplates",
    "Next.js templates",
    "developer productivity"
  ],
  openGraph: {
    title: "project-zoo",
    description:
      "Find, preview, and clone quality open-source project templates in minutes.",
    url: "https://project-zoo.app",
    siteName: "project-zoo",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "project-zoo",
    description:
      "A curated directory of open-source project templates and boilerplates."
  },
  metadataBase: new URL("https://project-zoo.app")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#0d1117] font-[var(--font-space-grotesk)] text-slate-100 antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
