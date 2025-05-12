import { ArrowLeft, ArrowRight, Clock, FileText } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClaimAnalysis from "../../../client/src/components/ClaimAnalysis";
import OriginalText from "../../../client/src/components/OriginalText";
import { Button } from "../../../client/src/components/ui/button";
import Navbar from "../../components/Navbar";
import {
  getAllClaimVerifications,
  getClaimVerificationById,
} from "../../lib/data";
import { formatDate, getServerTimeString } from "../../lib/utils";

// Define generateStaticParams to pre-generate pages for all claims
export async function generateStaticParams() {
  const claims = await getAllClaimVerifications();

  return claims.map((claim) => ({
    id: claim.id,
  }));
}

// Dynamic metadata for the claim detail page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const claim = await getClaimVerificationById(resolvedParams.id);

  if (!claim) {
    return {
      title: "Claim Not Found",
    };
  }

  return {
    title: `Claim Verification | ${claim.raw_text.substring(0, 50)}...`,
    description: `Verification details for claim: ${claim.raw_text.substring(
      0,
      160
    )}`,
  };
}

export default async function ClaimDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const claim = await getClaimVerificationById(id);

  if (!claim) {
    notFound();
  }

  // Use a stable date string to prevent hydration mismatch
  const claimDate = formatDate(getServerTimeString());

  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
                Claim Verification Report
              </h1>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
                  <span>Verified on {claimDate}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <FileText className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
                  <span>ID: {id}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link href="/">
                <Button className="mb-4">Return to Claims List</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        {/* Original Text */}
        <OriginalText
          rawText={claim.raw_text}
          tokenCount={claim.token_count}
          analysisDate={claimDate}
        />

        {/* Claim Analysis */}
        {claim.claim_detail.map((claimDetail, index) => (
          <ClaimAnalysis
            key={index}
            claim={claimDetail}
            claimNumber={index + 1}
          />
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between mb-8">
          <Button variant="outline" disabled={true}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous Claim
          </Button>
          <Button variant="outline" disabled={true}>
            Next Claim
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>
    </>
  );
}
