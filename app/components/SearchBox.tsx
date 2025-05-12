"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "../../client/src/components/ui/input";

export default function SearchBox({
  placeholder = "Search claims...",
  initialValue = "",
}: {
  placeholder?: string;
  initialValue?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // Handle search
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    // Reset to page 1 when searching
    params.set("page", "1");

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative max-w-md w-full mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-20"
          defaultValue={initialValue}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search claims"
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="h-4 w-4 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
