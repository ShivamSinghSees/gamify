import { Check, Pencil } from "lucide-react";

interface DropdownOptionProps {
  label: string;
  selected: boolean;
  disabled?: boolean;
  showEditIcon?: boolean;
  onSelect: () => void;
  onEdit?: () => void;
  children?: React.ReactNode;
}

export function DropdownOption({
  label,
  selected,
  disabled,
  showEditIcon,
  onSelect,
  onEdit,
  children,
}: DropdownOptionProps) {
  return (
    <div>
      <button
        type="button"
        className={`group/option flex w-full items-center justify-between px-2 py-2.5 text-sm cursor-pointer transition-colors rounded-md ${
          disabled
            ? "cursor-not-allowed text-gray-300"
            : selected
              ? "bg-brand-75 text-brand-500"
              : "text-gray-800 hover:bg-gray-100"
        }`}
        onClick={disabled ? undefined : onSelect}
        disabled={disabled}
      >
        <span>{label}</span>
        {selected && showEditIcon ? (
          <span className="relative h-5 w-5">
            <Check className="h-5 w-5 text-brand-500 transition-opacity group-hover/option:opacity-0" />
            <Pencil
              className="absolute inset-0 h-5 w-5 text-icon hover:text-brand-700 opacity-0 transition-opacity group-hover/option:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
            />
          </span>
        ) : selected ? (
          <Check className="h-5 w-5 text-brand-500" />
        ) : null}
      </button>
      {children}
    </div>
  );
}
