interface OriginalTextProps {
  rawText: string;
  tokenCount: number;
  analysisDate: string;
}

export default function OriginalText({ 
  rawText, 
  tokenCount, 
  analysisDate 
}: OriginalTextProps) {
  return (
    <div className="bg-card shadow-sm rounded-lg overflow-hidden mb-6 border border-border hover:shadow-md dark:hover:border-primary dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
      <div className="px-4 py-5 sm:px-6 bg-muted/50 border-b border-border">
        <h3 className="text-lg font-medium leading-6 text-card-foreground">CLAIM TEXT</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          The raw text that was analyzed for factual claims.
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="text-sm text-card-foreground bg-muted/50 p-4 rounded-md border border-border">
          <p>{rawText}</p>
        </div>
      </div>
      {/*<div className="px-4 py-4 sm:px-6 bg-muted/50 border-t border-border flex justify-between">*/}
      {/*  <div>*/}
      {/*    <span className="text-xs font-medium text-muted-foreground">TOKEN COUNT:</span>*/}
      {/*    <span className="ml-1 text-sm font-medium text-card-foreground">{tokenCount}</span>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <span className="text-xs font-medium text-muted-foreground">ANALYSIS DATE:</span>*/}
      {/*    <span className="ml-1 text-sm font-medium text-card-foreground">{analysisDate}</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
