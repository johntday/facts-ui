import { ClaimSummary, ClaimVerificationData } from "@/lib/types";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { z } from "zod";

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

// Get a specific claim verification by ID
async function getClaimVerificationById(
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const idSchema = z.string().min(1);

    try {
      idSchema.parse(id);
    } catch (validationError) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const claim = await getClaimVerificationById(id);

    if (!claim) {
      return NextResponse.json(
        { error: "Claim verification not found" },
        { status: 404 }
      );
    }

    // Add deprecation warning header
    return NextResponse.json(claim, {
      headers: {
        "X-Deprecation-Warning":
          "This API route is deprecated in favor of direct server-side rendering",
      },
    });
  } catch (error) {
    console.error("Error fetching claim by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch claim verification" },
      { status: 500 }
    );
  }
}
