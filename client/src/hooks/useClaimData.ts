import { useQuery } from "@tanstack/react-query";
import { ClaimVerificationData } from "@/lib/types";

export function useClaimsList() {
  return useQuery<ClaimVerificationData[]>({
    queryKey: ['/api/claims'],
  });
}

export function useClaimDetail(id: string) {
  return useQuery<ClaimVerificationData>({
    queryKey: [`/api/claims/${id}`],
    enabled: !!id,
  });
}
