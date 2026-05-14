import React from "react";
import type { AsyncStatus } from "@/types/async";

interface AsyncBoundaryProps {
  /** Current status of the async operation */
  status: AsyncStatus;
  /** Error message to display when status is "error" */
  error?: string | null;
  /** Callback for the retry button in the error state */
  onRetry?: () => void;
  /** Component to render during the loading state */
  loadingFallback: React.ReactNode;
  /** Component to render when data is empty (status is "success" but no data) */
  emptyFallback?: React.ReactNode;
  /** Whether the loaded data is considered "empty" */
  isEmpty?: boolean;
  /** Content to render on success */
  children: React.ReactNode;
}

/**
 * A declarative wrapper that renders the correct UI based on async state.
 *
 * Keeps page components clean by abstracting loading/error/empty logic
 * into a single, reusable boundary.
 *
 * @example
 * <AsyncBoundary
 *   status={status}
 *   error={error}
 *   onRetry={retry}
 *   loadingFallback={<Skeleton />}
 *   emptyFallback={<EmptyState />}
 *   isEmpty={data.length === 0}
 * >
 *   <DataList items={data} />
 * </AsyncBoundary>
 */
export function AsyncBoundary({
  status,
  error,
  onRetry,
  loadingFallback,
  emptyFallback,
  isEmpty = false,
  children,
}: AsyncBoundaryProps) {
  if (status === "loading" || status === "idle") {
    return <>{loadingFallback}</>;
  }

  if (status === "error") {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (isEmpty && emptyFallback) {
    return <>{emptyFallback}</>;
  }

  return <>{children}</>;
}

/* ------------------------------------------------------------------ */
/*  Error State — internal to this module                              */
/* ------------------------------------------------------------------ */

interface ErrorStateProps {
  message?: string | null;
  onRetry?: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="size-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <svg
          className="size-7 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h3 className="text-base font-semibold text-gray-800 mb-1">
        Failed to load data
      </h3>
      <p className="text-sm text-gray-500 max-w-xs mb-6">
        {message ?? "An unexpected error occurred. Please try again."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-border bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
        >
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
            />
          </svg>
          Try again
        </button>
      )}
    </div>
  );
}
