import {
  House,
  Brain,
  BriefcaseBusiness,
  FileChartColumnIncreasing,
  Wallet,
} from "lucide-react";

export const NAV_ITEMS = [
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
