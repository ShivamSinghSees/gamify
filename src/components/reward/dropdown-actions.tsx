import { Button } from "@/components/ui/button";

interface DropdownActionsProps {
  onCancel: () => void;
  onSave: () => void;
  saveDisabled?: boolean;
  saveTooltip?: string;
}

export function DropdownActions({
  onCancel,
  onSave,
  saveDisabled,
  saveTooltip,
}: DropdownActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-1">
      <Button type="button" variant="outline" fullWidth onClick={onCancel}>
        Cancel
      </Button>
      <Button
        type="button"
        variant="gamify"
        fullWidth
        onClick={onSave}
        disabled={saveDisabled}
        tooltipText={saveDisabled ? saveTooltip : undefined}
      >
        Save
      </Button>
    </div>
  );
}
