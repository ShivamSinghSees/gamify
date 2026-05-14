import { useEffect, type RefObject } from "react";

export function useClickOutside(
  refs: RefObject<HTMLElement | null>[],
  handlers: (() => void)[],
) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // Ignore clicks on Radix UI portals (like Select dropdowns, Tooltips, etc.)
      const isPortal = !!target.closest("[data-radix-portal], [data-radix-popper-content-wrapper], [data-radix-select-viewport]");
      if (isPortal) return;

      refs.forEach((ref, i) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handlers[i]();
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, handlers]);
}
