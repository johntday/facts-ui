interface ClaimMetricsProps {
  claimCount: number;
  model: string;
  tokenCount: number;
  averageFactuality: number;
}

export default function ClaimMetrics({ 
  claimCount, 
  model, 
  tokenCount, 
  averageFactuality 
}: ClaimMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="col-span-1">
        <dt className="text-sm font-medium text-neutral-500">Claims</dt>
        <dd className="mt-1 text-sm text-neutral-900">{claimCount}</dd>
      </div>
      <div className="col-span-1">
        <dt className="text-sm font-medium text-neutral-500">Model</dt>
        <dd className="mt-1 text-sm text-neutral-900">{model}</dd>
      </div>
      <div className="col-span-1">
        <dt className="text-sm font-medium text-neutral-500">Tokens</dt>
        <dd className="mt-1 text-sm text-neutral-900">{tokenCount}</dd>
      </div>
      <div className="col-span-1">
        <dt className="text-sm font-medium text-neutral-500">Average Factuality</dt>
        <dd className="mt-1 text-sm text-neutral-900">{averageFactuality}%</dd>
      </div>
    </div>
  );
}
