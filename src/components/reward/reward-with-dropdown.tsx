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

interface RewardWithDropdownProps {
  displayLabel: string;
  isUpgradeDisabled: boolean;
}

export function RewardWithDropdown({
  displayLabel,
  isUpgradeDisabled,
}: RewardWithDropdownProps) {
  const dispatch = useAppDispatch();
  const {
    rewardWith,
    flatBonusAmount,
    selectedCommissionTier,
    isRewardWithDropdownOpen,
  } = useAppSelector((state) => state.reward);

  const closeDropdown = () => dispatch(setRewardWithDropdownOpen(false));

  const upgradeLabel = selectedCommissionTier
    ? `Upgrade to ${COMMISSION_TIER_LABELS[selectedCommissionTier]}`
    : "Upgrade Commission Tier";

  const { isSaveDisabled, saveTooltip } = (() => {
    if (rewardWith === "flat_bonus" && !flatBonusAmount) {
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
      onClose={closeDropdown}
      hasValue={!!rewardWith}
      displayLabel={displayLabel}
      placeholder="Select a reward"
      saveDisabled={isSaveDisabled}
      saveTooltip={saveTooltip}
    >
      <DropdownOption
        label="Flat $X bonus"
        selected={rewardWith === "flat_bonus"}
        onSelect={() => dispatch(setRewardWith("flat_bonus"))}
      >
        {rewardWith === "flat_bonus" && (
          <div className="py-1" onClick={(e) => e.stopPropagation()}>
            <Input
              prefix="$"
              type="number"
              placeholder="e.g. 100"
              value={flatBonusAmount}
              onChange={(e) => dispatch(setFlatBonusAmount(e.target.value))}
            />
          </div>
        )}
      </DropdownOption>

      <DropdownOption
        label={upgradeLabel}
        selected={rewardWith === "upgrade_commission_tier"}
        disabled={isUpgradeDisabled}
        showEditIcon={
          rewardWith === "upgrade_commission_tier" && !!selectedCommissionTier
        }
        onSelect={() => {
          if (isUpgradeDisabled) return;
          dispatch(setRewardWith("upgrade_commission_tier"));
          dispatch(openCommissionTierModal());
          closeDropdown();
        }}
        onEdit={() => {
          dispatch(openCommissionTierModal());
          closeDropdown();
        }}
      />
    </DropdownShell>
  );
}
