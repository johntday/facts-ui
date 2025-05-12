"use client";

import { useEffect, useState } from "react";
import { formatDate } from "../../client/src/lib/utils";

interface ClientDateProps {
  initialDate?: string;
  showCurrent?: boolean;
}

export default function ClientDate({
  initialDate,
  showCurrent = false,
}: ClientDateProps) {
  const [dateStr, setDateStr] = useState(initialDate);

  useEffect(() => {
    if (showCurrent) {
      setDateStr(formatDate(new Date()));
    }
  }, [showCurrent]);

  return <>{dateStr}</>;
}
