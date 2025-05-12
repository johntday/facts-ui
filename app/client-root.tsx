"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "../client/src/components/ui/toaster";
import { TooltipProvider } from "../client/src/components/ui/tooltip";
import { queryClient } from "../client/src/lib/queryClient";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          {children}
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
