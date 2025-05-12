import { Metadata } from "next";
import React from "react";
import "../client/src/index.css";
import ClientRoot from "./client-root";

export const metadata: Metadata = {
  title: "Fact Verification App",
  description: "A web application for fact verification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background text-foreground">
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
