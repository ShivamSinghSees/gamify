import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-[-6.2px] left-[14px] flex h-4 w-4 items-center justify-center rounded-full bg-danger text-xs font-medium text-white ring-2 ring-white">
            5
          </span>
        </button>

        <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-gray-200">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3270&auto=format&fit=crop"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
