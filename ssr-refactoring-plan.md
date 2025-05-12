# SSR Refactoring Plan

## Introduction

This document outlines the steps required to refactor the application to use Server-Side Rendering (SSR) exclusively, allowing us to cache rendered pages on the server.

## Current Application Structure

- Next.js app using App Router
- Most components are currently client-side rendered with "use client" directive
- Data fetching via TanStack Query (React Query) on the client side
- API routes serving data from JSON files in attached_assets directory

## Refactoring Tasks

### 1. Update Next.js Configuration

- [✅] Modify next.config.mjs to enable SSR caching options

### 2. Create Data Fetching Utils

- [✅] Create shared utilities for server-side data fetching
- [✅] Ensure utils can be used in Server Components

### 3. Homepage Refactoring

- [✅] Convert main page.tsx to a Server Component
- [✅] Move data fetching from client to server
- [✅] Implement pagination with server-side handling
- [✅] Create search functionality that works with SSR

### 4. Claim Detail Page Refactoring

- [✅] Convert claim detail page to a Server Component
- [✅] Move data fetching from client to server
- [✅] Implement generateStaticParams for static generation

### 5. Refactoring Shared Components

- [✅] Split components into client and server parts where needed (Navbar, ThemeToggle)
- [✅] Create client components for interactive elements (SearchBox, PaginationControls)

### 6. Add Cache Control Headers

- [✅] Implement appropriate cache-control headers for SSR pages
- [✅] Configure revalidation strategies for dynamic content

### 7. Testing

- [✅] Verify all pages render correctly
- [✅] Test caching behavior
- [✅] Test pagination functionality
- [✅] Test search functionality

## Progress

| Task                       | Status | Notes                                                               |
| -------------------------- | ------ | ------------------------------------------------------------------- |
| Create Plan                | ✅     | Initial plan created                                                |
| Create Data Fetching Utils | ✅     | Created app/lib/data.ts with server-side data fetching functions    |
| Update Next.js Config      | ✅     | Added SSR caching options and headers configuration                 |
| Create Client Components   | ✅     | Created SearchBox and PaginationControls as client components       |
| Refactor Navbar            | ✅     | Split into server component with client-side ThemeToggle            |
| Convert Homepage           | ✅     | Converted to server component with client-side interactive elements |
| Convert Claim Detail       | ✅     | Converted to server component with generateStaticParams             |
| Update API Routes          | ✅     | Added deprecation notices to existing API routes                    |

## Summary of Changes

The application has been fully refactored to use Server-Side Rendering (SSR). Here's a summary of the changes:

1. **Data Fetching**: Moved data fetching from client-side React Query to server-side functions in app/lib/data.ts
2. **Server Components**: Converted page components to Server Components that render on the server
3. **Client-Side Interactivity**: Created client components for interactive elements like search and pagination
4. **Static Generation**: Implemented generateStaticParams for the claim detail pages to pre-generate them at build time
5. **Caching**: Added cache-control headers to enable effective caching of rendered pages
6. **Legacy API Routes**: Added deprecation notices to existing API routes

### Benefits of This Approach

1. **Performance**: Pages are rendered on the server and can be cached, reducing time-to-first-contentful-paint
2. **SEO**: Server-rendered content is fully available to search engine crawlers
3. **Reduced JavaScript**: Less JavaScript is sent to the client, improving performance on low-end devices
4. **Caching**: Pages can be cached at the edge, reducing server load and improving response times
5. **Progressive Enhancement**: The app works even with JavaScript disabled for basic functionality
