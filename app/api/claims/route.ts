import { ClaimVerificationData } from "@/lib/types";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

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
    return NextResponse.json(claims);
  } catch (error) {
    console.error("Error fetching claims:", error);
    return NextResponse.json(
      { error: "Failed to fetch claims" },
      { status: 500 }
    );
  }
}
