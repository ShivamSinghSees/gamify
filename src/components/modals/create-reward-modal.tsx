import { useRef, useEffect } from "react";
import { Check, ChevronDown, Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommissionTierModal } from "./commission-tier-modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setRewardEvent,
  setSalesAmount,
  setPostsCount,
  setPostsPeriod,
  setRewardWith,
  setFlatBonusAmount,
  openCommissionTierModal,
  setIsTimeBound,
  setRewardEventDropdownOpen,
  setRewardWithDropdownOpen,
  resetRewardForm,
  type RewardEventType,
  type PostsPeriod,
  type RewardWithType,
  type CommissionTier,
} from "@/store/reward-slice";

const POSTS_PERIOD_OPTIONS: { value: PostsPeriod; label: string }[] = [
  { value: "14_days", label: "14 days" },
  { value: "1_month", label: "1 month" },
  { value: "2_months", label: "2 months" },
  { value: "3_months", label: "3 months" },
  { value: "1_year", label: "1 year" },
];

const COMMISSION_TIER_LABELS: Record<CommissionTier, string> = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
  elite: "Elite",
};

interface CreateRewardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRewardModal({
  open,
  onOpenChange,
}: CreateRewardModalProps) {
  const dispatch = useAppDispatch();
  const {
    rewardEvent,
    salesAmount,
    postsCount,
    postsPeriod,
    rewardWith,
    flatBonusAmount,
    selectedCommissionTier,
    isTimeBound,
    isRewardEventDropdownOpen,
    isRewardWithDropdownOpen,
  } = useAppSelector((state) => state.reward);

  const eventDropdownRef = useRef<HTMLDivElement>(null);
  const rewardDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        eventDropdownRef.current &&
        !eventDropdownRef.current.contains(e.target as Node)
      ) {
        dispatch(setRewardEventDropdownOpen(false));
      }
      if (
        rewardDropdownRef.current &&
        !rewardDropdownRef.current.contains(e.target as Node)
      ) {
        dispatch(setRewardWithDropdownOpen(false));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const handleCancel = () => {
    onOpenChange(false);
    dispatch(resetRewardForm());
  };

  const handleCreate = () => {
    console.log("Reward created:", {
      rewardEvent,
      salesAmount,
      postsCount,
      postsPeriod,
      rewardWith,
      flatBonusAmount,
      selectedCommissionTier,
      isTimeBound,
    });
    onOpenChange(false);
    dispatch(resetRewardForm());
  };

  const isFormValid = (() => {
    if (!rewardEvent || !rewardWith) return false;
    if (rewardEvent === "cross_x_sales" && !salesAmount) return false;
    if (rewardEvent === "posts_x_times" && (!postsCount || !postsPeriod))
      return false;
    if (rewardWith === "flat_bonus" && !flatBonusAmount) return false;
    if (rewardWith === "upgrade_commission_tier" && !selectedCommissionTier)
      return false;
    return true;
  })();

  const getRewardEventDisplayLabel = (): string => {
    if (!rewardEvent) return "";
    if (rewardEvent === "cross_x_sales") {
      return salesAmount
        ? `Cross $${salesAmount} in sales`
        : "Cross $X in sales";
    }
    if (rewardEvent === "posts_x_times") {
      const periodLabel = postsPeriod
        ? POSTS_PERIOD_OPTIONS.find((p) => p.value === postsPeriod)?.label
        : "Y period";
      return `Posts ${postsCount || "X"} times every ${periodLabel}`;
    }
    return "Is Onboarded";
  };

  const getRewardWithDisplayLabel = (): string => {
    if (!rewardWith) return "";
    if (rewardWith === "flat_bonus") {
      return flatBonusAmount
        ? `Flat $${flatBonusAmount} bonus`
        : "Flat $X bonus";
    }
    if (rewardWith === "upgrade_commission_tier" && selectedCommissionTier) {
      return `Upgrade to ${COMMISSION_TIER_LABELS[selectedCommissionTier]}`;
    }
    return "Upgrade Commission Tier";
  };

  const isUpgradeDisabled = rewardEvent !== "cross_x_sales";

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <DialogHeader>
            <DialogTitle>Create your reward system</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Reward Event Dropdown */}
            <div className="space-y-2">
              <Label required>Reward event</Label>
              <div ref={eventDropdownRef} className="relative">
                <button
                  type="button"
                  className="group flex h-fit w-full items-center justify-between rounded-lg border border-gray-border bg-white px-4 py-2 text-left text-sm text-gray-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 data-[state=open]:border-brand-500 data-[state=open]:ring-1 data-[state=open]:ring-brand-500"
                  data-state={isRewardEventDropdownOpen ? "open" : "closed"}
                  onClick={() =>
                    dispatch(
                      setRewardEventDropdownOpen(!isRewardEventDropdownOpen),
                    )
                  }
                >
                  <span
                    className={rewardEvent ? "text-gray-800" : "text-gray-300"}
                  >
                    {rewardEvent
                      ? getRewardEventDisplayLabel()
                      : "Select an event"}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isRewardEventDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isRewardEventDropdownOpen && (
                  <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md overflow-hidden">
                    <RewardEventOption
                      label="Cross $X in sales"
                      value="cross_x_sales"
                      selected={rewardEvent === "cross_x_sales"}
                      onSelect={() => dispatch(setRewardEvent("cross_x_sales"))}
                    >
                      {rewardEvent === "cross_x_sales" && (
                        <div
                          className="px-3 pb-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Input
                            prefix="$"
                            type="number"
                            placeholder="e.g. 100"
                            value={salesAmount}
                            onChange={(e) =>
                              dispatch(setSalesAmount(e.target.value))
                            }
                          />
                        </div>
                      )}
                    </RewardEventOption>

                    <RewardEventOption
                      label="Posts X times every Y period"
                      value="posts_x_times"
                      selected={rewardEvent === "posts_x_times"}
                      onSelect={() => dispatch(setRewardEvent("posts_x_times"))}
                    >
                      {rewardEvent === "posts_x_times" && (
                        <div
                          className="px-3 pb-2 flex gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Input
                            type="number"
                            placeholder="X times"
                            value={postsCount}
                            className="w-1/2"
                            onChange={(e) =>
                              dispatch(setPostsCount(e.target.value))
                            }
                          />
                          <select
                            className="w-1/2 h-9 rounded-lg border border-gray-border bg-white px-3 text-sm text-gray-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                            value={postsPeriod ?? ""}
                            onChange={(e) =>
                              dispatch(
                                setPostsPeriod(e.target.value as PostsPeriod),
                              )
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
                    </RewardEventOption>

                    <RewardEventOption
                      label="Is Onboarded"
                      value="is_onboarded"
                      selected={rewardEvent === "is_onboarded"}
                      onSelect={() => {
                        dispatch(setRewardEvent("is_onboarded"));
                        dispatch(setRewardEventDropdownOpen(false));
                      }}
                    />

                    <div className="flex gap-2 px-3 py-2 border-t border-gray-100">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-9"
                        onClick={() =>
                          dispatch(setRewardEventDropdownOpen(false))
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="gamify"
                        className="flex-1 h-9"
                        onClick={() =>
                          dispatch(setRewardEventDropdownOpen(false))
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reward With Dropdown */}
            <div className="space-y-2">
              <Label required>Reward with</Label>
              <div ref={rewardDropdownRef} className="relative">
                <button
                  type="button"
                  className="group flex h-fit w-full items-center justify-between rounded-lg border border-gray-border bg-white px-4 py-2 text-left text-sm text-gray-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 data-[state=open]:border-brand-500 data-[state=open]:ring-1 data-[state=open]:ring-brand-500"
                  data-state={isRewardWithDropdownOpen ? "open" : "closed"}
                  onClick={() =>
                    dispatch(
                      setRewardWithDropdownOpen(!isRewardWithDropdownOpen),
                    )
                  }
                >
                  <span
                    className={rewardWith ? "text-gray-800" : "text-gray-300"}
                  >
                    {rewardWith
                      ? getRewardWithDisplayLabel()
                      : "Select a reward"}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isRewardWithDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isRewardWithDropdownOpen && (
                  <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md overflow-hidden">
                    <RewardWithOption
                      label="Flat $X bonus"
                      value="flat_bonus"
                      selected={rewardWith === "flat_bonus"}
                      onSelect={() => dispatch(setRewardWith("flat_bonus"))}
                    >
                      {rewardWith === "flat_bonus" && (
                        <div
                          className="px-3 pb-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Input
                            prefix="$"
                            type="number"
                            placeholder="e.g. 100"
                            value={flatBonusAmount}
                            onChange={(e) =>
                              dispatch(setFlatBonusAmount(e.target.value))
                            }
                          />
                        </div>
                      )}
                    </RewardWithOption>

                    <RewardWithOption
                      label={
                        selectedCommissionTier
                          ? `Upgrade to ${COMMISSION_TIER_LABELS[selectedCommissionTier]}`
                          : "Upgrade Commission Tier"
                      }
                      value="upgrade_commission_tier"
                      selected={rewardWith === "upgrade_commission_tier"}
                      disabled={isUpgradeDisabled}
                      showEditIcon={
                        rewardWith === "upgrade_commission_tier" &&
                        !!selectedCommissionTier
                      }
                      onSelect={() => {
                        if (isUpgradeDisabled) return;
                        dispatch(setRewardWith("upgrade_commission_tier"));
                        dispatch(openCommissionTierModal());
                        dispatch(setRewardWithDropdownOpen(false));
                      }}
                      onEdit={() => {
                        dispatch(openCommissionTierModal());
                        dispatch(setRewardWithDropdownOpen(false));
                      }}
                    />

                    <div className="flex gap-2 px-3 py-2 border-t border-gray-100">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-9"
                        onClick={() =>
                          dispatch(setRewardWithDropdownOpen(false))
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="gamify"
                        className="flex-1 h-9"
                        onClick={() =>
                          dispatch(setRewardWithDropdownOpen(false))
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Time Bound Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-1 w-full">
                <div className="flex items-center gap-2 justify-between py-1">
                  <Label
                    htmlFor="isTimeBound"
                    className="text-sm font-medium text-gray-800"
                  >
                    Make the reward time bound
                  </Label>
                  <Switch
                    id="isTimeBound"
                    checked={isTimeBound}
                    onCheckedChange={(checked) =>
                      dispatch(setIsTimeBound(checked))
                    }
                  />
                </div>
                <p className="text-xxs text-gray-600">
                  Choose an end date to stop this reward automatically.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="gamify"
                className="flex-1"
                disabled={!isFormValid}
                onClick={handleCreate}
                tooltipText={
                  !isFormValid
                    ? "Choose a reward trigger and a reward to continue"
                    : undefined
                }
              >
                Create Reward
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CommissionTierModal />
    </>
  );
}

/* ─── Dropdown Option Components ─────────────────────────────────────────── */

interface RewardEventOptionProps {
  label: string;
  value: RewardEventType;
  selected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}

function RewardEventOption({
  label,
  selected,
  onSelect,
  children,
}: RewardEventOptionProps) {
  return (
    <div>
      <button
        type="button"
        className={`flex w-full items-center justify-between px-3 py-2.5 text-sm cursor-pointer transition-colors ${selected ? "bg-brand-75 text-brand-500" : "text-gray-800 hover:bg-gray-100"}`}
        onClick={onSelect}
      >
        <span>{label}</span>
        {selected && <Check className="h-4 w-4 text-brand-500" />}
      </button>
      {children}
    </div>
  );
}

interface RewardWithOptionProps {
  label: string;
  value: RewardWithType;
  selected: boolean;
  disabled?: boolean;
  showEditIcon?: boolean;
  onSelect: () => void;
  onEdit?: () => void;
  children?: React.ReactNode;
}

function RewardWithOption({
  label,
  selected,
  disabled,
  showEditIcon,
  onSelect,
  onEdit,
  children,
}: RewardWithOptionProps) {
  return (
    <div>
      <button
        type="button"
        className={`flex w-full items-center justify-between px-3 py-2.5 text-sm cursor-pointer transition-colors ${disabled ? "opacity-50 cursor-not-allowed text-gray-400" : selected ? "bg-brand-75 text-brand-500" : "text-gray-800 hover:bg-gray-100"}`}
        onClick={disabled ? undefined : onSelect}
        disabled={disabled}
      >
        <span>{label}</span>
        {selected && showEditIcon ? (
          <Pencil
            className="h-4 w-4 text-brand-500 hover:text-brand-700"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
          />
        ) : selected ? (
          <Check className="h-4 w-4 text-brand-500" />
        ) : null}
      </button>
      {children}
    </div>
  );
}
