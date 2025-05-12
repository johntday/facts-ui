import { ClaimSummary, ClaimVerificationData } from "@/lib/types";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

/**
 * @deprecated This API route is deprecated in favor of direct server-side rendering.
 * Use the data fetching utilities in app/lib/data.ts instead.
 */

/**
 * Generates a summary of claim verification data
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

// Load claim verification data from JSON files
async function getAllClaimVerifications(): Promise<ClaimVerificationData[]> {
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

export async function GET() {
  try {
    const claims = await getAllClaimVerifications();

    // Add deprecation warning header
    return NextResponse.json(claims, {
      headers: {
        "X-Deprecation-Warning":
          "This API route is deprecated in favor of direct server-side rendering",
      },
    });
  } catch (error) {
    console.error("Error fetching claims:", error);
    return NextResponse.json(
      { error: "Failed to fetch claims" },
      { status: 500 }
    );
  }
}
