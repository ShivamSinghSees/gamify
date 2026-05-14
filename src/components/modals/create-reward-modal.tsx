import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RewardEventDropdown } from "@/components/reward/reward-event-dropdown";
import { RewardWithDropdown } from "@/components/reward/reward-with-dropdown";
import { TimeBoundToggle } from "@/components/reward/time-bound-toggle";
import { CommissionTierModal } from "./commission-tier-modal";
import { useRewardForm } from "@/hooks/use-reward-form";
import { VALIDATION_MESSAGES } from "@/constants/reward";

interface CreateRewardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRewardModal({
  open,
  onOpenChange,
}: CreateRewardModalProps) {
  const {
    isFormValid,
    isUpgradeDisabled,
    rewardEventDisplayLabel,
    rewardWithDisplayLabel,
    handleCancel,
    handleCreate,
  } = useRewardForm(onOpenChange);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <DialogHeader>
            <DialogTitle>Create your reward system</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label required>Reward event</Label>
              <RewardEventDropdown displayLabel={rewardEventDisplayLabel} />
            </div>

            <div className="space-y-2">
              <Label required>Reward with</Label>
              <RewardWithDropdown
                displayLabel={rewardWithDisplayLabel}
                isUpgradeDisabled={isUpgradeDisabled}
              />
            </div>

            <TimeBoundToggle />

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
                  !isFormValid ? VALIDATION_MESSAGES.FORM_INCOMPLETE : undefined
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
