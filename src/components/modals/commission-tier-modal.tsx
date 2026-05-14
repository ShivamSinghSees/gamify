import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedCommissionTier,
  closeCommissionTierModal,
} from "@/store/reward-slice";
import { COMMISSION_TIERS } from "@/constants/reward";
import type { CommissionTier } from "@/types/reward";

export function CommissionTierModal() {
  const dispatch = useAppDispatch();
  const { isCommissionTierModalOpen, selectedCommissionTier } = useAppSelector(
    (state) => state.reward,
  );

  const [localTier, setLocalTier] = useState<CommissionTier | "">(
    selectedCommissionTier ?? "",
  );

  const handleSave = () => {
    if (localTier) {
      dispatch(setSelectedCommissionTier(localTier));
    }
    dispatch(closeCommissionTierModal());
  };

  const handleGoBack = () => {
    dispatch(closeCommissionTierModal());
  };

  return (
    <Dialog
      open={isCommissionTierModalOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeCommissionTierModal());
      }}
    >
      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader>
          <DialogTitle>Select a commission tier</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label required htmlFor="commissionTier">
              Upgrade to
            </Label>
            <Select
              value={localTier}
              onValueChange={(val) => setLocalTier(val as CommissionTier)}
            >
              <SelectTrigger id="commissionTier" className="mt-2">
                <SelectValue placeholder="Select a tier" />
              </SelectTrigger>
              <SelectContent>
                {COMMISSION_TIERS.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value}>
                    {tier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleGoBack}
            >
              Go back
            </Button>
            <Button
              type="button"
              variant="gamify"
              className="flex-1"
              onClick={handleSave}
              disabled={!localTier}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
