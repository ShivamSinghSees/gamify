import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const buttonVariants = cva(
  "inline-flex items-center h-10 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-gray-border text-gray-800 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gamify:
          "bg-brand-500 text-white rounded-[10px] text-[16px] leading-[1.4] min-h-[40px] hover:bg-brand-500/90 disabled:bg-brand-600 disabled:opacity-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
  tooltipText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      fullWidth = false,
      tooltipText,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const buttonElement = (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && "w-full",
        )}
        ref={ref}
        {...props}
      />
    );

    if (tooltipText) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={cn("inline-block", fullWidth && "w-full")}>
              {buttonElement}
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={4} className="text-xs">
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      );
    }

    return buttonElement;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
