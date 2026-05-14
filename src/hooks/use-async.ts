import { useState, useEffect, useCallback } from "react";
import type { AsyncState, AsyncStatus } from "@/types/async";

interface UseAsyncOptions {
  /** Delay in ms to simulate network latency. Defaults to 1200. */
  delay?: number;
  /** Probability (0–1) that the fetch will fail. Defaults to 0 (no failure). */
  failRate?: number;
}

/**
 * A generic hook to simulate async data fetching.
 *
 * Wraps any synchronous data source with realistic loading/error behavior,
 * enabling components to demonstrate proper state handling without a real API.
 *
 * @example
 * const { data, status, error, retry } = useAsync(() => fetchCards(), { delay: 800 });
 */
export function useAsync<T>(
  fetcher: () => T | Promise<T>,
  options: UseAsyncOptions = {},
): AsyncState<T> & { retry: () => void } {
  const { delay = 1200, failRate = 0 } = options;

  const [status, setStatus] = useState<AsyncStatus>("loading");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(() => {
    setStatus("loading");
    setData(null);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        // Simulate random failure based on failRate
        if (Math.random() < failRate) {
          throw new Error("Something went wrong. Please try again.");
        }

        const result = await fetcher();
        setData(result);
        setStatus("success");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred.",
        );
        setStatus("error");
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [fetcher, delay, failRate]);

  useEffect(() => {
    const cleanup = execute();
    return cleanup;
  }, [execute]);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  return { status, data, error, retry };
}
