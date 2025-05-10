interface FactualityBadgeProps {
  factuality: number;
}

export default function FactualityBadge({ factuality }: FactualityBadgeProps) {
  let badgeClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  let label = "Factual";

  if (factuality < 0.5) {
    badgeClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    label = "Not Factual";
  } else if (factuality < 0.8) {
    badgeClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    label = "Partially Factual";
  }

  return (
    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}>
      {label}
    </p>
  );
}
