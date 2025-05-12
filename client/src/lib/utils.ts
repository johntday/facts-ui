import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Use a fixed date format for consistent rendering between server and client
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  // Use a format that doesn't depend on the user's locale
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Always use UTC to ensure consistency
  }).format(d);
}

// Helper to get a stable date for SSR
export function getServerTimeString(): string {
  // Return a fixed string for server rendering to avoid hydration mismatch
  return "2023-12-01T00:00:00.000Z";
}
