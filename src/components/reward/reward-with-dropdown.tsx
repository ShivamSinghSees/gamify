import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DropdownOption } from "./dropdown-option";
import { DropdownShell } from "./dropdown-shell";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setRewardWith,
  setFlatBonusAmount,
  openCommissionTierModal,
  setRewardWithDropdownOpen,
} from "@/store/reward-slice";
import {
  COMMISSION_TIER_LABELS,
  VALIDATION_MESSAGES,
} from "@/constants/reward";
import type { RewardWith } from "@/types/reward";

interface RewardWithDropdownProps {
  displayLabel: string;
  isUpgradeDisabled: boolean;
}

export function RewardWithDropdown({
  displayLabel,
  isUpgradeDisabled,
}: RewardWithDropdownProps) {
  const dispatch = useAppDispatch();
  const reduxState = useAppSelector((state) => state.reward);
  const {
    rewardWith,
    flatBonusAmount,
    selectedCommissionTier,
    isRewardWithDropdownOpen,
  } = reduxState;

  // Local state for drafting
  const [localRewardWith, setLocalRewardWith] = useState<RewardWith | null>(
    null,
  );
  const [localFlatBonusAmount, setLocalFlatBonusAmount] = useState("");

  // Sync with redux when dropdown opens
  useEffect(() => {
    if (isRewardWithDropdownOpen) {
      setLocalRewardWith(rewardWith);
      setLocalFlatBonusAmount(flatBonusAmount);
    }
  }, [isRewardWithDropdownOpen, rewardWith, flatBonusAmount]);

  const handleSave = () => {
    dispatch(setRewardWith(localRewardWith));
    dispatch(setFlatBonusAmount(localFlatBonusAmount));
    dispatch(setRewardWithDropdownOpen(false));
  };

  const handleCancel = () => {
    dispatch(setRewardWithDropdownOpen(false));
  };

  const upgradeLabel = selectedCommissionTier
    ? `Upgrade to ${COMMISSION_TIER_LABELS[selectedCommissionTier]}`
    : "Upgrade Commission Tier";

  const { isSaveDisabled, saveTooltip } = (() => {
    if (localRewardWith === "flat_bonus" && !localFlatBonusAmount) {
      return {
        isSaveDisabled: true,
        saveTooltip: VALIDATION_MESSAGES.BONUS_AMOUNT_REQUIRED,
      };
    }
    return { isSaveDisabled: false, saveTooltip: undefined };
  })();

  return (
    <DropdownShell
      isOpen={isRewardWithDropdownOpen}
      onToggle={() =>
        dispatch(setRewardWithDropdownOpen(!isRewardWithDropdownOpen))
      }
      onClose={handleCancel}
      onSave={handleSave}
      hasValue={!!rewardWith}
      displayLabel={displayLabel}
      placeholder="Select a reward"
      saveDisabled={isSaveDisabled}
      saveTooltip={saveTooltip}
      showActions={localRewardWith === "flat_bonus"}
    >
      <DropdownOption
        label="Flat $X bonus"
        selected={localRewardWith === "flat_bonus"}
        onSelect={() => setLocalRewardWith("flat_bonus")}
      >
        {localRewardWith === "flat_bonus" && (
          <div className="py-1" onClick={(e) => e.stopPropagation()}>
            <Input
              prefix="$"
              type="number"
              placeholder="e.g. 100"
              value={localFlatBonusAmount}
              onChange={(e) => setLocalFlatBonusAmount(e.target.value)}
            />
          </div>
        )}
      </DropdownOption>

      <DropdownOption
        label={upgradeLabel}
        selected={localRewardWith === "upgrade_commission_tier"}
        disabled={isUpgradeDisabled}
        showEditIcon={
          localRewardWith === "upgrade_commission_tier" &&
          !!selectedCommissionTier
        }
        onSelect={() => {
          if (isUpgradeDisabled) return;
          // For commission tier, we still need to open the modal which handles its own state
          dispatch(setRewardWith("upgrade_commission_tier"));
          dispatch(openCommissionTierModal());
          dispatch(setRewardWithDropdownOpen(false));
        }}
        onEdit={() => {
          dispatch(openCommissionTierModal());
          dispatch(setRewardWithDropdownOpen(false));
        }}
      />
    </DropdownShell>
  );
}
