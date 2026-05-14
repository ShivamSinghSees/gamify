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
  type CommissionTier,
} from "@/store/reward-slice";

const COMMISSION_TIERS: { value: CommissionTier; label: string }[] = [
  { value: "silver", label: "Silver" },
  { value: "gold", label: "Gold" },
  { value: "platinum", label: "Platinum" },
  { value: "diamond", label: "Diamond" },
  { value: "elite", label: "Elite" },
];

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
            <Label htmlFor="commissionTier">Upgrade to</Label>
            <Select
              value={localTier}
              onValueChange={(val) => setLocalTier(val as CommissionTier)}
            >
              <SelectTrigger id="commissionTier">
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
