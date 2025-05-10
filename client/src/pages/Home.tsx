import { useQuery } from "@tanstack/react-query";
import ClaimCard from "@/components/ClaimCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { ClaimVerificationData } from "@/lib/types";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: claims, isLoading, error } = useQuery({
    queryKey: ['/api/claims'],
  });

  if (error) {
    return (
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading claims</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Failed to load claim verification data. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter claims based on search term
  const filteredClaims = !claims 
    ? [] 
    : (claims as ClaimVerificationData[]).filter(claim => {
        const searchLower = searchTerm.toLowerCase();
        return (
          claim.raw_text.toLowerCase().includes(searchLower) ||
          claim.claim_detail.some(detail => 
            detail.claim.toLowerCase().includes(searchLower)
          )
        );
      });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClaims = filteredClaims.slice(startIndex, endIndex);

  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* List Header */}
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-foreground">Claims</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A list of all claims that have been verified through our factuality analysis system.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              className="block w-full pl-10 pr-3 py-2"
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>
      </div>

      {/* Claims List */}
      {isLoading ? (
        // Loading skeleton
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mb-6">
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        ))
      ) : filteredClaims.length === 0 ? (
        // Empty state
        <div className="bg-card shadow-sm rounded-lg overflow-hidden mb-6 border border-border p-8 text-center">
          <h3 className="text-lg font-medium text-card-foreground mb-2">No claims found</h3>
          <p className="text-muted-foreground">
            {searchTerm 
              ? "No claims match your search criteria. Try a different search term." 
              : "There are no claim verification records available."}
          </p>
        </div>
      ) : (
        // Claims list
        <>
          {paginatedClaims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 mb-8">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                    to <span className="font-medium">{Math.min(endIndex, filteredClaims.length)}</span>{" "}
                    of <span className="font-medium">{filteredClaims.length}</span> results
                  </p>
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(Math.max(1, currentPage - 1));
                        }} 
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                      let pageNum: number;
                      
                      // Logic to determine which page numbers to show
                      if (totalPages <= 5) {
                        pageNum = idx + 1;
                      } else if (currentPage <= 3) {
                        pageNum = idx + 1;
                        if (idx === 4) return (
                          <PaginationItem key={idx}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + idx;
                        if (idx === 0) return (
                          <PaginationItem key={idx}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      } else {
                        if (idx === 0) return (
                          <PaginationItem key={idx}>
                            <PaginationLink 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(1);
                              }}
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                        );
                        if (idx === 1) return (
                          <PaginationItem key={idx}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                        pageNum = idx === 2 ? currentPage : (idx === 3 ? currentPage + 1 : totalPages);
                        if (idx === 3) return (
                          <PaginationItem key={idx}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      
                      return (
                        <PaginationItem key={idx}>
                          <PaginationLink 
                            href="#" 
                            isActive={pageNum === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNum);
                            }}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(Math.min(totalPages, currentPage + 1));
                        }} 
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
