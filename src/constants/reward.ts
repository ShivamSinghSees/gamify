import type { PostsPeriod, CommissionTier } from "@/types/reward";

export const POSTS_PERIOD_OPTIONS: { value: PostsPeriod; label: string }[] = [
  { value: "14_days", label: "14 days" },
  { value: "1_month", label: "1 month" },
  { value: "2_months", label: "2 months" },
  { value: "3_months", label: "3 months" },
  { value: "1_year", label: "1 year" },
];

export const COMMISSION_TIERS: { value: CommissionTier; label: string }[] = [
  { value: "silver", label: "Silver" },
  { value: "gold", label: "Gold" },
  { value: "platinum", label: "Platinum" },
  { value: "diamond", label: "Diamond" },
  { value: "elite", label: "Elite" },
];

export const COMMISSION_TIER_LABELS: Record<CommissionTier, string> = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
  elite: "Elite",
};

export const VALIDATION_MESSAGES = {
  SALES_AMOUNT_REQUIRED: "Enter the sales target amount to continue",
  POSTS_FIELDS_REQUIRED:
    "Enter the post count and select a time period to continue",
  BONUS_AMOUNT_REQUIRED: "Enter the bonus amount to continue",
  END_DATE_REQUIRED: "Choose reward end date to continue",
  COMMISSION_TIER_REQUIRED: "Select a commission tier to continue",
  FORM_INCOMPLETE: "Choose a reward trigger and a reward to continue",
} as const;
