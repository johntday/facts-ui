import { ClaimUsage } from "@/lib/types";
import { 
  FileText, 
  CheckCircle, 
  Calendar, 
  Search, 
  Shield 
} from "lucide-react";

interface UsageMetricsProps {
  usage: ClaimUsage;
}

export default function UsageMetrics({ usage }: UsageMetricsProps) {
  const models = [
    {
      name: "Decomposer",
      icon: <FileText className="h-6 w-6 text-white" />,
      bgColor: "bg-primary-500",
      model: usage.decomposer.model,
      prompt: usage.decomposer.prompt_tokens,
      completion: usage.decomposer.completion_tokens
    },
    {
      name: "Checkworthy",
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      bgColor: "bg-secondary-500",
      model: usage.checkworthy.model,
      prompt: usage.checkworthy.prompt_tokens,
      completion: usage.checkworthy.completion_tokens
    },
    {
      name: "Query Generator",
      icon: <Calendar className="h-6 w-6 text-white" />,
      bgColor: "bg-success",
      model: usage.query_generator.model,
      prompt: usage.query_generator.prompt_tokens,
      completion: usage.query_generator.completion_tokens
    },
    {
      name: "Evidence Crawler",
      icon: <Search className="h-6 w-6 text-white" />,
      bgColor: "bg-warning",
      model: usage.evidence_crawler.model,
      prompt: usage.evidence_crawler.prompt_tokens,
      completion: usage.evidence_crawler.completion_tokens
    },
    {
      name: "Claim Verification",
      icon: <Shield className="h-6 w-6 text-white" />,
      bgColor: "bg-primary-700",
      model: usage.claimverify.model,
      prompt: usage.claimverify.prompt_tokens,
      completion: usage.claimverify.completion_tokens
    }
  ];

  return (
    <div className="bg-card shadow-sm rounded-lg overflow-hidden mb-6 border border-border hover:shadow-md dark:hover:border-primary dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
      <div className="px-4 py-5 sm:px-6 bg-muted/50 border-b border-border">
        <h3 className="text-lg font-medium leading-6 text-card-foreground">Usage Metrics</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Token usage information for the various AI models used in the analysis.
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model, index) => (
            <div key={index} className="bg-muted/50 overflow-hidden shadow rounded-lg border border-border">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${model.bgColor} rounded-md p-3`}>
                    {model.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground truncate">{model.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-card-foreground">{model.model}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-muted px-4 py-4 sm:px-6 border-t border-border">
                <div className="text-sm flex justify-between">
                  <div>
                    <span className="font-medium text-muted-foreground">Prompt:</span>
                    <span className="ml-1 font-semibold text-card-foreground">
                      {model.prompt.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Completion:</span>
                    <span className="ml-1 font-semibold text-card-foreground">
                      {model.completion.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
