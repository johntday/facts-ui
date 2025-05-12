import fs from "fs";
import path from "path";
import { ClaimVerificationData } from "./types";

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

      return {
        ...jsonData,
        id,
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

    return {
      ...jsonData,
      id,
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
