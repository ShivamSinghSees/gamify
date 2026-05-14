import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsTimeBound, setEndDate } from "@/store/reward-slice";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function TimeBoundToggle() {
  const dispatch = useAppDispatch();
  const { isTimeBound, endDate } = useAppSelector((state) => state.reward);

  const date = endDate ? new Date(endDate) : undefined;
  const [month, setMonth] = React.useState<Date | undefined>(date);

  // Sync month with date when date is first loaded or changed externally
  React.useEffect(() => {
    if (date) {
      setMonth(date);
    }
  }, [endDate]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-1 w-full">
          <div className="flex items-center gap-2 justify-between py-1">
            <Label
              htmlFor="isTimeBound"
              className="text-sm font-medium text-gray-800 cursor-pointer"
            >
              Make the reward time bound
            </Label>
            <Switch
              id="isTimeBound"
              checked={isTimeBound}
              onCheckedChange={(checked) => dispatch(setIsTimeBound(checked))}
            />
          </div>
          <p className="text-xxs text-gray-600">
            Choose an end date to stop this reward automatically.
          </p>
        </div>
      </div>

      {isTimeBound && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex h-11 w-full items-center gap-2 rounded-lg border border-gray-border text-base bg-white px-3 leading-[1.4] transition-all focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 data-[state=open]:border-brand-500 data-[state=open]:ring-1 data-[state=open]:ring-brand-500",
                !date && "text-gray-400",
              )}
            >
              <CalendarIcon className="h-5 w-5 text-gray-800" />
              <span className="text-gray-800 font-medium">
                {date ? format(date, "d MMM, yyyy") : "Select an end date"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={(newDate) => {
                dispatch(setEndDate(newDate ? newDate.toISOString() : null));
                if (newDate) {
                  setMonth(newDate);
                }
              }}
              disabled={(date) =>
                date <= new Date(new Date().setHours(0, 0, 0, 0))
              }
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
