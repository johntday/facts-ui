import { ClaimVerificationData } from "@/lib/types";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { z } from "zod";

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

    return {
      ...jsonData,
      id,
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

    return NextResponse.json(claim);
  } catch (error) {
    console.error("Error fetching claim by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch claim verification" },
      { status: 500 }
    );
  }
}
