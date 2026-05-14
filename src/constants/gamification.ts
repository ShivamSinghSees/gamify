import { GiftIcon, CrownIcon, MoneyIcon } from "@/components/icons";

export const CARDS_DATA = [
  {
    title: "Reward Your Ambassadors",
    description:
      "Boost campaign performance by setting up rewards for ambassadors",
    icon: GiftIcon,
  },
  {
    title: "Set Milestones",
    description:
      "Set up custom goals for sales, posts, or time-based achievements",
    icon: CrownIcon,
  },
  {
    title: "Customise Incentives",
    description:
      "Create custom incentives like flat fees, free products, or special commissions",
    icon: MoneyIcon,
  },
] as const;
