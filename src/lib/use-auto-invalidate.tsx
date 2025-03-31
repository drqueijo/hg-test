import { api } from "@/utils/api";
import { useEffect } from "react";

export function useAutoInvalidate(intervalMs = 10000) {
  const utils = api.useUtils();

  useEffect(() => {
    // Set up the interval for automatic invalidation
    const intervalId = setInterval(() => {
      utils.invalidate();
    }, intervalMs);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [utils, intervalMs]);
}
