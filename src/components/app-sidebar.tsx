import {
  Settings,
  House,
  Brain,
  BriefcaseBusiness,
  FileChartColumnIncreasing,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
const NAV_ITEMS = [
  { title: "Home", icon: House, href: "/", isActive: false },
  { title: "Insights", icon: Brain, href: "/insights", isActive: false },
  {
    title: "Gamification",
    icon: BriefcaseBusiness,
    href: "/gamification",
    isActive: true,
  },
  {
    title: "Applications",
    icon: FileChartColumnIncreasing,
    href: "/applications",
    isActive: false,
  },
  { title: "Payments", icon: Wallet, href: "/payments", isActive: false },
] as const;

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  return (
    <Sidebar className={cn("border-r-0", className)} collapsible="none">
      <div className="flex min-h-[calc(100svh)] flex-col  bg-brand-50">
        <SidebarHeader className="sticky top-0 z-10 p-4 backdrop-blur-[14px] bg-brand-50/50">
          <div className="flex items-center gap-2 blur-[6px]">
            <div className="size-8 rounded-full bg-linear-to-br from-fuchsia-500 to-purple-600" />
            <span className="text-lg font-semibold text-foreground/80 ">
              Gamify
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-9 pr-[33px] font-medium leading-[1.3] text-gray-600 hover:bg-sidebar-accent",
                        item.isActive &&
                          "bg-sidebar-accent text-brand-500 hover:bg-sidebar-accent",
                      )}
                    >
                      <a href={item.href}>
                        <div className="h-5 w-5 flex items-center justify-center">
                          <item.icon size={16} />
                        </div>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mt-auto">
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Settings"
                className=" p-2 font-medium leading-[1.3] text-gray-600 hover:bg-sidebar-accent"
              >
                <a href="/settings">
                  <Settings />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
