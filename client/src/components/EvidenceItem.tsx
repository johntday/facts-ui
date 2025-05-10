import { ExternalLink } from "lucide-react";
import { ClaimEvidence } from "@/lib/types";

interface EvidenceItemProps {
  evidence: ClaimEvidence;
}

export default function EvidenceItem({ evidence }: EvidenceItemProps) {
  // Get tag class based on relationship
  let relationshipTagClass = "";
  switch (evidence.relationship) {
    case "SUPPORTS":
      relationshipTagClass = "bg-green-100 text-green-800";
      break;
    case "REFUTES":
      relationshipTagClass = "bg-red-100 text-red-800";
      break;
    case "IRRELEVANT":
      relationshipTagClass = "bg-gray-100 text-gray-800";
      break;
  }

  // Format URL for display
  let displayUrl = evidence.url;
  try {
    // Try to parse the URL and extract hostname
    displayUrl = new URL(evidence.url).hostname;
  } catch (error) {
    // If URL parsing fails, just use the URL as is or extract domain another way
    displayUrl = evidence.url.replace(/^https?:\/\//, '').split('/')[0] || evidence.url;
  }

  return (
    <div className="mb-4 bg-muted/50 rounded-lg border border-border overflow-hidden hover:shadow-md dark:hover:border-primary dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
      <div className="px-4 py-3 bg-muted border-b border-border flex justify-between items-center">
        <div className="flex items-center">
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${relationshipTagClass}`}>
            {evidence.relationship.charAt(0) + evidence.relationship.slice(1).toLowerCase()}
          </span>
          <a 
            href={evidence.url} 
            className="ml-3 text-sm text-primary hover:text-primary/80 truncate flex items-center" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {displayUrl}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="text-sm text-card-foreground mb-3">
          <p>{evidence.text}</p>
        </div>
        <div className="text-xs text-muted-foreground">
          <h5 className="font-medium mb-1">Analysis:</h5>
          <p>{evidence.reasoning}</p>
        </div>
      </div>
    </div>
  );
}
