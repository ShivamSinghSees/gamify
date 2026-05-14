import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { DropdownActions } from "./dropdown-actions";

interface DropdownShellProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSave?: () => void;
  hasValue: boolean;
  displayLabel: string;
  placeholder: string;
  saveDisabled?: boolean;
  saveTooltip?: string;
  showActions?: boolean;
  children: React.ReactNode;
}

export function DropdownShell({
  isOpen,
  onToggle,
  onClose,
  onSave,
  hasValue,
  displayLabel,
  placeholder,
  saveDisabled,
  saveTooltip,
  showActions = true,
  children,
}: DropdownShellProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside([dropdownRef], [onClose]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        className="group flex h-fit w-full items-center justify-between rounded-lg border border-gray-border bg-white px-4 py-2 text-left text-sm text-gray-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 data-[state=open]:border-brand-500 data-[state=open]:ring-1 data-[state=open]:ring-brand-500"
        data-state={isOpen ? "open" : "closed"}
        onClick={onToggle}
      >
        <span className={hasValue ? "text-gray-800" : "text-gray-300"}>
          {hasValue ? displayLabel : placeholder}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md overflow-hidden p-1">
          {children}
          {showActions && (
            <DropdownActions
              onCancel={onClose}
              onSave={onSave || onClose}
              saveDisabled={saveDisabled}
              saveTooltip={saveTooltip}
            />
          )}
        </div>
      )}
    </div>
  );
}
