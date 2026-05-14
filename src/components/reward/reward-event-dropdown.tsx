import { Input } from "@/components/ui/input";
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
import type { PostsPeriod } from "@/types/reward";

interface RewardEventDropdownProps {
  displayLabel: string;
}

export function RewardEventDropdown({
  displayLabel,
}: RewardEventDropdownProps) {
  const dispatch = useAppDispatch();
  const {
    rewardEvent,
    salesAmount,
    postsCount,
    postsPeriod,
    isRewardEventDropdownOpen,
  } = useAppSelector((state) => state.reward);

  const closeDropdown = () => dispatch(setRewardEventDropdownOpen(false));

  const { isSaveDisabled, saveTooltip } = (() => {
    if (rewardEvent === "cross_x_sales" && !salesAmount) {
      return {
        isSaveDisabled: true,
        saveTooltip: VALIDATION_MESSAGES.SALES_AMOUNT_REQUIRED,
      };
    }
    if (rewardEvent === "posts_x_times" && (!postsCount || !postsPeriod)) {
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
      onClose={closeDropdown}
      hasValue={!!rewardEvent}
      displayLabel={displayLabel}
      placeholder="Select an event"
      saveDisabled={isSaveDisabled}
      saveTooltip={saveTooltip}
    >
      <DropdownOption
        label="Cross $X in sales"
        selected={rewardEvent === "cross_x_sales"}
        onSelect={() => dispatch(setRewardEvent("cross_x_sales"))}
      >
        {rewardEvent === "cross_x_sales" && (
          <div className="my-1 " onClick={(e) => e.stopPropagation()}>
            <Input
              prefix="$"
              type="number"
              placeholder="e.g. 100"
              value={salesAmount}
              onChange={(e) => dispatch(setSalesAmount(e.target.value))}
            />
          </div>
        )}
      </DropdownOption>

      <DropdownOption
        label="Posts X times every Y period"
        selected={rewardEvent === "posts_x_times"}
        onSelect={() => dispatch(setRewardEvent("posts_x_times"))}
      >
        {rewardEvent === "posts_x_times" && (
          <div
            className="px- pb-2 flex gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              type="number"
              placeholder="X times"
              value={postsCount}
              className="w-1/2"
              onChange={(e) => dispatch(setPostsCount(e.target.value))}
            />
            <select
              className="w-1/2 h-9 rounded-lg border border-gray-border bg-white px-3 text-sm text-gray-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              value={postsPeriod ?? ""}
              onChange={(e) =>
                dispatch(setPostsPeriod(e.target.value as PostsPeriod))
              }
            >
              <option value="" disabled>
                Period
              </option>
              {POSTS_PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </DropdownOption>

      <DropdownOption
        label="Is Onboarded"
        selected={rewardEvent === "is_onboarded"}
        onSelect={() => {
          dispatch(setRewardEvent("is_onboarded"));
          closeDropdown();
        }}
      />
    </DropdownShell>
  );
}
