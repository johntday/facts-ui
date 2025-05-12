# Claim Verification App

A web application for fact verification, built with Next.js.

## Technology Stack

- **Frontend**: React, Next.js, Tailwind CSS, Radix UI
- **Backend**: Next.js API Routes
- **Data Fetching**: TanStack Query (React Query)
- **Styling**: Tailwind CSS, Radix UI components

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd facts-ui
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Migration Status

This application is in the process of being migrated from a Vite + Express stack to Next.js. See the [migration notebook](./next-migration-notebook.md) for details on the migration progress and steps.

During the migration, you can run the application in either the legacy mode or the new Next.js mode:

```bash
# Next.js mode (recommended)
npm run dev

# Legacy mode (Vite + Express)
npm run dev:legacy
```

## Folder Structure

- `app/` - Next.js application code
  - `api/` - API routes
  - `components/` - UI components
  - `lib/` - Utility functions and shared code
- `client/` - Legacy client code (React + Vite)
- `server/` - Legacy server code (Express)
- `shared/` - Shared code between client and server
- `attached_assets/` - Data files and assets

## Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the Next.js application
- `npm run start` - Start the Next.js production server
- `npm run dev:legacy` - Start the legacy development server
- `npm run build:legacy` - Build the legacy application
- `npm run start:legacy` - Start the legacy production server
- `npm run migrate-component` - Helper script to migrate components from the legacy structure to Next.js
