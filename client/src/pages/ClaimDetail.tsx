import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Edit, Share, Clock, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OriginalText from "@/components/OriginalText";
import UsageMetrics from "@/components/UsageMetrics";
import ClaimAnalysis from "@/components/ClaimAnalysis";
import { ClaimVerificationData } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function ClaimDetail() {
  const { id } = useParams();

  const { data: claim, isLoading, error } = useQuery({
    queryKey: [`/api/claims/${id}`],
  });

  if (isLoading) {
    return (
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <Skeleton className="h-36 w-full mb-6" />
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-96 w-full" />
      </main>
    );
  }

  if (error || !claim) {
    return (
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Claim Not Found</h1>
            </div>
            <p className="mb-4 text-gray-600">
              The claim you're looking for couldn't be found. It may have been removed or you may have entered an incorrect URL.
            </p>
            <Link href="/">
              <Button>
                Return to Claims List
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  const verificationData = claim as ClaimVerificationData;
  const claimDate = formatDate(new Date());

  return (
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
            <Button variant="outline" className="mr-2">
              <Edit className="h-5 w-5 mr-2" />
              Edit
            </Button>
            <Button>
              <Share className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="details" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Claim Details</TabsTrigger>
          <TabsTrigger value="list">Claims List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Link href="/">
            <Button className="mb-4">
              Return to Claims List
            </Button>
          </Link>
        </TabsContent>
        
        <TabsContent value="details">
          {/* Original Text */}
          <OriginalText 
            rawText={verificationData.raw_text} 
            tokenCount={verificationData.token_count} 
            analysisDate={claimDate} 
          />

          {/* Usage Metrics */}
          {/*<UsageMetrics usage={verificationData.usage} />*/}

          {/* Claim Analysis */}
          {verificationData.claim_detail.map((claim, index) => (
            <ClaimAnalysis key={index} claim={claim} claimNumber={index + 1} />
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
        </TabsContent>
      </Tabs>
    </main>
  );
}
