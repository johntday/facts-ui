import { Metadata } from "next";
import { Suspense } from "react";
import ClaimCard from "../client/src/components/ClaimCard";
import { Skeleton } from '@components/ui/skeleton.tsx';
import Navbar from "./components/Navbar";
import PaginationControls from "./components/PaginationControls";
import SearchBox from "./components/SearchBox";
import { getPaginatedClaimVerifications } from "./lib/data";

export const metadata: Metadata = {
  title: "Claims List | Fact Verification App",
  description: "Browse and search verified claims",
};

// Enable dynamic rendering with cache
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate at most once per hour

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  // Get search params
  const params = await searchParams;
  const query = params?.q || "";
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = 6;

  // Fetch data on the server
  const { claims, totalItems, totalPages } =
    await getPaginatedClaimVerifications(currentPage, itemsPerPage, query);

  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* List Header */}
        <div className="sm:flex sm:items-center mb-6">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-foreground">CLAIMS</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              A list of all claims that have been verified.
            </p>
          </div>
        </div>

        {/* Search */}
        <SearchBox initialValue={query} />

        {/* Claims List */}
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-6">
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          ))}
        >
          {totalItems === 0 ? (
            // Empty state
            <div className="bg-card shadow-sm rounded-lg overflow-hidden mb-6 border border-border p-8 text-center">
              <h3 className="text-lg font-medium text-card-foreground mb-2">
                No claims found
              </h3>
              <p className="text-muted-foreground">
                {query
                  ? "No claims match your search criteria. Try a different search term."
                  : "There are no claim verification records available."}
              </p>
            </div>
          ) : (
            // Claims list
            claims.map((claim) => <ClaimCard key={claim.id} claim={claim} />)
          )}
        </Suspense>

        {/* Pagination */}
        {totalItems > 0 && (
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            totalItems={totalItems}
            perPage={itemsPerPage}
          />
        )}
      </main>
    </>
  );
}
