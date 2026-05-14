import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-lg border border-gray-border bg-white text-sm text-gray-800 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500",
          className,
        )}
      >
        {prefix && (
          <>
            <span className="pl-4 pr-1 text-base text-gray-600 shrink-0">
              {prefix}
            </span>
          </>
        )}
        <input
          type={type}
          className={cn(
            "h-full w-full bg-transparent py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
