# Next.js Migration Notebook

## Project Overview

Current stack: Vite + Express
Target stack: Next.js

The project appears to be a web application for fact verification with:

- Frontend built with React, Vite, and various UI libraries
- Backend built with Express, serving JSON data from static files
- Uses React Query for data fetching
- Uses Wouter for routing
- UI built with Tailwind CSS and Radix UI components

## Migration Plan

### Phase 1: Setup and Configuration

- [x] Create the basic Next.js project structure
- [x] Configure Next.js settings
- [x] Setup appropriate tsconfig.json
- [x] Migrate Tailwind CSS configuration

### Phase 2: Core Architecture Migration

- [x] Convert Express routes to Next.js API routes
- [ ] Move server code to Next.js API routes
- [x] Migrate Vite configuration to Next.js
- [x] Setup appropriate directory structure

### Phase 3: Frontend Migration

- [x] Move components to appropriate Next.js structure
- [x] Convert routes to Next.js pages
- [x] Replace Wouter with Next.js Router
- [x] Setup React Query with Next.js
- [ ] Update imports and paths

### Phase 4: Testing and Refinement

- [x] Test all API routes
- [x] Test all pages
- [x] Fix any styling issues
- [ ] Optimize performance
- [ ] Add proper error handling

## Migration Progress

### Phase 1: Setup and Configuration

#### Create the basic Next.js project structure ✅

- Created app directory
- Created app/api directory
- Set up basic Next.js configuration

#### Configure Next.js settings ✅

- Created next.config.mjs
- Set up appropriate configurations for aliases
- Added webpack configuration for compatibility during migration

#### Setup appropriate tsconfig.json ✅

- Added app directory to include paths
- Added paths aliases for better imports
- Added Next.js plugin

#### Migrate Tailwind CSS configuration ✅

- Added app directory to the content array
- Maintained all existing Tailwind configurations

### Phase 2: Core Architecture Migration

#### Convert Express routes to Next.js API routes ✅

- Created app/api/claims/route.ts for fetching all claims
- Created app/api/claims/[id]/route.ts for fetching a claim by ID

#### Setup appropriate directory structure ✅

- Created app directory structure for Next.js app router
- Created pages for home and claim detail views
- Set up lib folder for utilities and shared code

#### Migrate Vite configuration to Next.js ✅

- Added appropriate Next.js configurations
- Updated package.json with Next.js scripts (while keeping legacy scripts for compatibility)
- Set up appropriate webpack configurations for the transition period

### Phase 3: Frontend Migration

#### Convert routes to Next.js pages ✅

- Created home page
- Created dynamic claim detail page
- Created not-found page

#### Setup React Query with Next.js ✅

- Created queryClient.ts that re-exports from the client code (for transitional period)
- Added QueryClientProvider to the RootLayout component

#### Move components to appropriate Next.js structure ✅

- Created migration script to help with component migration
- Migrated Navbar component from Wouter to Next.js
- Migrated ThemeToggle component
- Updated pages to use the new components

#### Replace Wouter with Next.js Router ✅

- Replaced useParams from Wouter with useParams from Next.js
- Replaced Link from Wouter with Link from next/link
- Updated routes to use Next.js dynamic routes
- Added proper route handling in claim detail page

### Phase 4: Testing and Refinement

#### Test all API routes ✅

- Tested claims endpoint successfully
- Tested individual claim endpoint successfully

#### Test all pages ✅

- Tested home page successfully
- Tested claim detail page successfully

#### Fix any styling issues ✅

- Fixed import paths for UI components
- Ensured proper CSS loading and styling

## Fixes Made

### Configuration Fixes

1. **Fixed Next.js Configuration**:

   - Removed deprecated `swcMinify` option
   - Moved `serverComponentsExternalPackages` to the root-level `serverExternalPackages`
   - Changed `esmExternals` from 'loose' to a boolean value

2. **Fixed Layout Structure**:

   - Separated client components into their own files
   - Fixed metadata export in the layout file
   - Created a separate `ClientRoot` component for client-side providers

3. **Fixed Type Definitions**:

   - Defined types directly in the app directory instead of re-exporting from shared
   - This avoids path resolution issues during the migration

4. **Fixed Import Paths**:
   - Updated component imports to use relative paths during migration
   - Fixed UI component imports in ThemeToggle

### Component Migration Progress

1. **Fully Migrated to Next.js**:

   - Navbar component
   - ThemeToggle component
   - HomePage component
   - ClaimDetailPage component
   - NotFoundPage component

2. **Routing Updates**:
   - Converted dynamic route parameters to use Next.js useParams
   - Updated Link components to use Next.js Link
   - Created page components for Next.js app router structure

## Next Steps

1. Continue migrating remaining components to the app directory structure
2. Update all imports to use the configured path aliases
3. Move server-side code completely to Next.js API routes
4. Test the application thoroughly and fix any issues

## Running with Next.js

```bash
# Development mode with Next.js
npm run dev

# Build with Next.js
npm run build

# Start production server with Next.js
npm run start
```

## Migration Challenges and Solutions

1. **Wouter to Next.js Navigation** - Replaced Wouter's useParams hook with Next.js's useParams and updated routing
2. **Path Aliases** - Maintained compatibility with existing imports while introducing new path aliases
3. **Server-Side Rendering** - Leveraged Next.js's built-in SSR capabilities instead of Express
4. **Client/Server Component Separation** - Carefully separated client and server components to avoid "use client" directive errors
5. **Component Dependencies** - Temporarily using relative imports to original client components until fully migrated
