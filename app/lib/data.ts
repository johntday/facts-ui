import fs from "fs";
import path from "path";
import { ClaimSummary, ClaimVerificationData } from "./types";

/**
 * Generates a summary of claim verification data
 * To be used internally by data fetching functions
 */
function generateClaimSummary(claimData: ClaimVerificationData): ClaimSummary {
  const claimDetails = claimData.claim_detail;

  // Count different types of claims
  const numClaims = claimDetails.length;
  const numCheckworthyClaims = claimDetails.filter(
    (claim) => claim.checkworthy
  ).length;

  // Count verified, supported, refuted claims
  const numVerifiedClaims = claimDetails.filter(
    (claim) => claim.factuality >= 0.8
  ).length;
  const numSupportedClaims = claimDetails.filter(
    (claim) =>
      claim.evidences.filter((evidence) => evidence.relationship === "SUPPORTS")
        .length >
      claim.evidences.filter((evidence) => evidence.relationship === "REFUTES")
        .length
  ).length;
  const numRefutedClaims = claimDetails.filter(
    (claim) =>
      claim.evidences.filter((evidence) => evidence.relationship === "REFUTES")
        .length >
      claim.evidences.filter((evidence) => evidence.relationship === "SUPPORTS")
        .length
  ).length;
  const numControversialClaims =
    numClaims - numSupportedClaims - numRefutedClaims;

  // Calculate overall factuality
  const factuality =
    numClaims > 0
      ? claimDetails.reduce((sum, claim) => sum + claim.factuality, 0) /
        numClaims
      : 0;

  return {
    num_claims: numClaims,
    num_checkworthy_claims: numCheckworthyClaims,
    num_verified_claims: numVerifiedClaims,
    num_supported_claims: numSupportedClaims,
    num_refuted_claims: numRefutedClaims,
    num_controversial_claims: numControversialClaims,
    factuality,
  };
}

/**
 * Gets all claim verifications from JSON files
 * To be used in Server Components
 */
export async function getAllClaimVerifications(): Promise<
  ClaimVerificationData[]
> {
  try {
    const dataPath = path.resolve(process.cwd(), "attached_assets");
    const files = fs
      .readdirSync(dataPath)
      .filter((file) => file.endsWith(".json"));

    const claims = files.map((file) => {
      const id = file.replace(".json", "");
      const filePath = path.join(dataPath, file);
      const rawData = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.parse(rawData) as ClaimVerificationData;

      // Add id and generate summary
      const claimWithId = {
        ...jsonData,
        id,
      };

      return {
        ...claimWithId,
        summary: generateClaimSummary(claimWithId),
      };
    });

    return claims;
  } catch (error) {
    console.error("Error loading claim verification data:", error);
    return [];
  }
}

/**
 * Gets a specific claim verification by ID
 * To be used in Server Components
 */
export async function getClaimVerificationById(
  id: string
): Promise<ClaimVerificationData | undefined> {
  try {
    const dataPath = path.resolve(process.cwd(), "attached_assets");
    const filePath = path.join(dataPath, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      return undefined;
    }

    const rawData = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(rawData) as ClaimVerificationData;

    // Add id and generate summary
    const claimWithId = {
      ...jsonData,
      id,
    };

    return {
      ...claimWithId,
      summary: generateClaimSummary(claimWithId),
    };
  } catch (error) {
    console.error("Error fetching claim by ID:", error);
    return undefined;
  }
}

/**
 * Gets paginated claim verifications
 * To be used in Server Components with search and pagination
 */
export async function getPaginatedClaimVerifications(
  page: number = 1,
  perPage: number = 6,
  searchTerm: string = ""
): Promise<{
  claims: ClaimVerificationData[];
  totalItems: number;
  totalPages: number;
}> {
  try {
    const allClaims = await getAllClaimVerifications();

    // Filter by search term if provided
    const filteredClaims = searchTerm
      ? allClaims.filter((claim) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            claim.raw_text.toLowerCase().includes(searchLower) ||
            claim.claim_detail.some((detail) =>
              detail.claim.toLowerCase().includes(searchLower)
            )
          );
        })
      : allClaims;

    // Calculate pagination
    const totalItems = filteredClaims.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalItems);
    const paginatedClaims = filteredClaims.slice(startIndex, endIndex);

    return {
      claims: paginatedClaims,
      totalItems,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching paginated claims:", error);
    return {
      claims: [],
      totalItems: 0,
      totalPages: 0,
    };
  }
}
