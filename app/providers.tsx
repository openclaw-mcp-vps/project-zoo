"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#161b22",
            color: "#e6edf3",
            border: "1px solid rgba(230,237,243,0.18)"
          }
        }}
      />
    </>
  );
}
