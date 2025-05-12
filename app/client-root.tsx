"use client";

import { Toaster } from "@components/ui/toaster.tsx";
import { TooltipProvider } from "@components/ui/tooltip.tsx";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          {children}
          <Toaster />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
