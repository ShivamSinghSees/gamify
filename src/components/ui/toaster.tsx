import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={3000}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="px-3 py-2 rounded-[16px] border-0 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#10B981] shrink-0">
                <Check className="w-5 h-5 text-[#303030] stroke-3" />
              </div>
              <div className="grid gap-1">
                {title && (
                  <ToastTitle className="text-base font-medium leading-none">
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>

  );
}
