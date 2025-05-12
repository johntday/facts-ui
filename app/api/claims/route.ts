import { ClaimVerificationData } from "@/lib/types";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

/**
 * @deprecated This API route is deprecated in favor of direct server-side rendering.
 * Use the data fetching utilities in app/lib/data.ts instead.
 */

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
