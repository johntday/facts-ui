import { Link } from "wouter";
import { ClaimVerificationData } from "@/lib/types";

interface ClaimCardProps {
  claim: ClaimVerificationData;
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  // Calculate average factuality
  const averageFactuality = claim.claim_detail.reduce(
    (acc, detail) => acc + detail.factuality, 
    0
  ) / claim.claim_detail.length;

  // Format factuality percentage
  const factualityPercentage = Math.round(averageFactuality * 100);

  // Determine status based on factuality
  let statusClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  let statusText = "Verified";

  if (averageFactuality < 0.7) {
    statusClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    statusText = "Refuted";
  } else if (averageFactuality < 0.9) {
    statusClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    statusText = "Partially Verified";
  }

  return (
    <Link href={`/claims/${claim.id}`}>
      <div className="bg-card shadow-sm rounded-lg overflow-hidden mb-6 border border-border hover:shadow-md dark:hover:border-primary dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer">
        <div className="px-4 py-5 sm:px-6 bg-muted/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium leading-6 text-card-foreground truncate">
              {claim.claim_detail.length > 0 ? claim.claim_detail[0].claim : "Untitled Claim"}
            </h3>
            <div className="ml-2 flex-shrink-0 flex gap-2">
              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                Claims {claim.claim_detail.length}
              </p>
              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                Factuality {factualityPercentage}%
              </p>
            </div>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground line-clamp-2">
            {claim.raw_text}
          </p>
        </div>
      </div>
    </Link>
  );
}
