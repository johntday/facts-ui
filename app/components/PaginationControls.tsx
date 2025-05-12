"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../client/src/components/ui/pagination";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  totalItems: number;
  perPage: number;
}

export default function PaginationControls({
  totalPages,
  currentPage,
  totalItems,
  perPage,
}: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  if (totalPages <= 1) {
    return null;
  }

  // Calculate start and end indices for displaying "Showing x to y of z results"
  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(startIndex + perPage - 1, totalItems);

  return (
    <div className="flex items-center justify-between mt-8 mb-8">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
          onClick={(e) => {
            if (currentPage === 1) e.preventDefault();
          }}
          className={`relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </a>
        <a
          href={currentPage < totalPages ? createPageURL(currentPage + 1) : "#"}
          onClick={(e) => {
            if (currentPage === totalPages) e.preventDefault();
          }}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{startIndex}</span> to{" "}
            <span className="font-medium">{endIndex}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                onClick={(e) => {
                  if (currentPage === 1) e.preventDefault();
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {/* Generate pagination links */}
            {(() => {
              const items = [];
              const maxVisiblePages = 5;
              let startPage, endPage;

              if (totalPages <= maxVisiblePages) {
                // Show all pages
                startPage = 1;
                endPage = totalPages;
              } else if (currentPage <= 3) {
                // Near the start
                startPage = 1;
                endPage = 5;
                items.push(
                  <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              } else if (currentPage >= totalPages - 2) {
                // Near the end
                startPage = totalPages - 4;
                endPage = totalPages;
                items.unshift(
                  <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              } else {
                // In the middle
                startPage = currentPage - 2;
                endPage = currentPage + 2;
                items.unshift(
                  <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
                items.push(
                  <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              // Add page number links
              for (let i = startPage; i <= endPage; i++) {
                const isActive = i === currentPage;
                items.splice(
                  i - startPage,
                  0,
                  <PaginationItem key={i}>
                    <PaginationLink href={createPageURL(i)} isActive={isActive}>
                      {i}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              return items;
            })()}

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? createPageURL(currentPage + 1)
                    : "#"
                }
                onClick={(e) => {
                  if (currentPage === totalPages) e.preventDefault();
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
