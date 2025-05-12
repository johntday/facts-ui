#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");

// Usage validation
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: npm run migrate-component <component-path>");
  console.error("Example: npm run migrate-component components/Button.tsx");
  process.exit(1);
}

const componentPath = args[0];
const sourceFile = path.join(ROOT_DIR, "client", "src", componentPath);
const destDir = path.join(ROOT_DIR, "app", path.dirname(componentPath));
const destFile = path.join(ROOT_DIR, "app", componentPath);

// Check if source file exists
if (!fs.existsSync(sourceFile)) {
  console.error(`Source file not found: ${sourceFile}`);
  process.exit(1);
}

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Read source file
const sourceContent = fs.readFileSync(sourceFile, "utf-8");

// Transform imports
let destContent = sourceContent
  // Add 'use client' directive if not present
  .replace(/^(?!['"]use client['"])/m, "'use client';\n\n")
  // Replace relative imports with path aliases
  .replace(/from ['"]\.\.\/components\/(.*)['"]/g, "from '@/components/$1'")
  .replace(/from ['"]\.\.\/lib\/(.*)['"]/g, "from '@/lib/$1'")
  .replace(/from ['"]\.\.\/hooks\/(.*)['"]/g, "from '@/hooks/$1'")
  .replace(/from ['"]\.\.\/pages\/(.*)['"]/g, "from '@/pages/$1'")
  .replace(/from ['"]@\/([^"']*)['"]/g, "from '@/$1'");

// Replacing wouter imports with next/navigation
if (
  destContent.includes('from "wouter"') ||
  destContent.includes("from 'wouter'")
) {
  console.log("Detected wouter usage, replacing with Next.js navigation...");
  destContent = destContent
    .replace(
      /import .*from ["']wouter["']/g,
      "import { useRouter, usePathname } from 'next/navigation'"
    )
    .replace(
      /const \{\s*([^}]*)\}\s*=\s*useParams/g,
      "const pathname = usePathname()\n  const $1 = pathname.split('/').pop()"
    )
    .replace(/<Link href="([^"]+)"/g, '<Link href="$1"');
}

// Write to destination file
fs.writeFileSync(destFile, destContent);
console.log(`Component migrated: ${destFile}`);
console.log(
  "Remember to manually check the file for any issues with the automated transformations."
);
