/**
 * Represents the possible states of an async operation.
 * Used throughout the app to provide a consistent interface
 * for loading, success, empty, and error states.
 */
export type AsyncStatus = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
}
