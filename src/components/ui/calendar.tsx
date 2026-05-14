import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 relative",
        month_caption: "flex justify-center pt-1 relative items-center h-9",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between pointer-events-none h-9",
        button_previous: cn(
          "h-7 w-7 bg-transparent p-0 absolute left-4 top-5 flex items-center justify-center rounded-md border border-gray-border text-gray-800 z-10 pointer-events-auto cursor-pointer",
        ),
        button_next: cn(
          "h-7 w-7 bg-transparent p-0 absolute right-0 top-5 flex items-center justify-center rounded-md border border-gray-border text-gray-800 z-10 pointer-events-auto cursor-pointer",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weeks: "flex flex-col ",
        weekdays: "flex",
        weekday: "text-gray-600 rounded-md w-9 font-medium text-sm",
        week: "flex w-full mt-2",
        day: "h-9 w-9 p-0 text-center text-sm relative group",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-medium transition-colors rounded-md",
          "text-gray-800 hover:bg-gray-100 hover:text-gray-800",
          "group-[.day-outside]:text-gray-600",
          "group-[.day-disabled]:!text-gray-300 group-[.day-disabled]:opacity-50 group-[.day-disabled]:cursor-not-allowed",
          "group-[.day-selected]:!bg-brand-500 group-[.day-selected]:!text-white group-[.day-selected]:opacity-100 group-[.day-selected]:hover:!bg-brand-500 group-[.day-selected]:hover:!text-white",
        ),
        range_end: "day-range-end",
        selected: "day-selected",
        today: "",
        outside: "day-outside",
        disabled: "day-disabled",
        range_middle: "aria-selected:bg-gray-100 aria-selected:text-gray-900",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ArrowLeft className="h-4 w-4" />;
          }
          return <ArrowRight className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
