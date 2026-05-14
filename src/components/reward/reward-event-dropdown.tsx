import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownOption } from "./dropdown-option";
import { DropdownShell } from "./dropdown-shell";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setRewardEvent,
  setSalesAmount,
  setPostsCount,
  setPostsPeriod,
  setRewardEventDropdownOpen,
} from "@/store/reward-slice";
import { POSTS_PERIOD_OPTIONS, VALIDATION_MESSAGES } from "@/constants/reward";
import type { PostsPeriod, RewardEvent } from "@/types/reward";

interface RewardEventDropdownProps {
  displayLabel: string;
}

export function RewardEventDropdown({
  displayLabel,
}: RewardEventDropdownProps) {
  const dispatch = useAppDispatch();
  const reduxState = useAppSelector((state) => state.reward);
  const { isRewardEventDropdownOpen } = reduxState;

  // Local state for drafting
  const [localEvent, setLocalEvent] = useState<RewardEvent | null>(null);
  const [localSalesAmount, setLocalSalesAmount] = useState("");
  const [localPostsCount, setLocalPostsCount] = useState("");
  const [localPostsPeriod, setLocalPostsPeriod] = useState<PostsPeriod | null>(
    null,
  );

  // Initialize local state when dropdown opens
  useEffect(() => {
    if (isRewardEventDropdownOpen) {
      setLocalEvent(reduxState.rewardEvent);
      setLocalSalesAmount(reduxState.salesAmount);
      setLocalPostsCount(reduxState.postsCount);
      setLocalPostsPeriod(reduxState.postsPeriod);
    }
  }, [isRewardEventDropdownOpen, reduxState]);

  const handleSave = () => {
    dispatch(setRewardEvent(localEvent));
    dispatch(setSalesAmount(localSalesAmount));
    dispatch(setPostsCount(localPostsCount));
    dispatch(setPostsPeriod(localPostsPeriod));
    dispatch(setRewardEventDropdownOpen(false));
  };

  const handleCancel = () => {
    dispatch(setRewardEventDropdownOpen(false));
  };

  const { isSaveDisabled, saveTooltip } = (() => {
    if (localEvent === "cross_x_sales" && !localSalesAmount) {
      return {
        isSaveDisabled: true,
        saveTooltip: VALIDATION_MESSAGES.SALES_AMOUNT_REQUIRED,
      };
    }
    if (localEvent === "posts_x_times" && (!localPostsCount || !localPostsPeriod)) {
      return {
        isSaveDisabled: true,
        saveTooltip: VALIDATION_MESSAGES.POSTS_FIELDS_REQUIRED,
      };
    }
    return { isSaveDisabled: false, saveTooltip: undefined };
  })();

  return (
    <DropdownShell
      isOpen={isRewardEventDropdownOpen}
      onToggle={() =>
        dispatch(setRewardEventDropdownOpen(!isRewardEventDropdownOpen))
      }
      onClose={handleCancel}
      onSave={handleSave}
      hasValue={!!reduxState.rewardEvent}
      displayLabel={displayLabel}
      placeholder="Select an event"
      saveDisabled={isSaveDisabled}
      saveTooltip={saveTooltip}
      showActions={
        localEvent === "cross_x_sales" || localEvent === "posts_x_times"
      }
    >
      <DropdownOption
        label="Cross $X in sales"
        selected={localEvent === "cross_x_sales"}
        onSelect={() => setLocalEvent("cross_x_sales")}
      >
        {localEvent === "cross_x_sales" && (
          <div className="my-1 " onClick={(e) => e.stopPropagation()}>
            <Input
              prefix="$"
              type="number"
              placeholder="e.g. 100"
              value={localSalesAmount}
              onChange={(e) => setLocalSalesAmount(e.target.value)}
            />
          </div>
        )}
      </DropdownOption>

      <DropdownOption
        label="Posts X times every Y period"
        selected={localEvent === "posts_x_times"}
        onSelect={() => setLocalEvent("posts_x_times")}
      >
        {localEvent === "posts_x_times" && (
          <div
            className="my-1 grid grid-cols-2 gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              type="number"
              placeholder="eg: 4 "
              value={localPostsCount}
              className="px-2"
              onChange={(e) => setLocalPostsCount(e.target.value)}
            />
            <Select
              value={localPostsPeriod ?? ""}
              onValueChange={(val) => setLocalPostsPeriod(val as PostsPeriod)}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                {POSTS_PERIOD_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </DropdownOption>

      <DropdownOption
        label="Is Onboarded"
        selected={localEvent === "is_onboarded"}
        onSelect={() => {
          // Direct selection for simple options
          dispatch(setRewardEvent("is_onboarded"));
          dispatch(setRewardEventDropdownOpen(false));
        }}
      />
    </DropdownShell>
  );
}
