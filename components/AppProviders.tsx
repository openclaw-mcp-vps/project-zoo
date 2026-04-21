"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          className: "!bg-slate-900 !text-slate-100 !border !border-slate-700",
          duration: 2600
        }}
      />
    </ThemeProvider>
  );
}
