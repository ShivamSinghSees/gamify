export type RewardEventType =
  | "cross_x_sales"
  | "posts_x_times"
  | "is_onboarded";

export type PostsPeriod =
  | "14_days"
  | "1_month"
  | "2_months"
  | "3_months"
  | "1_year";

export type RewardWithType = "flat_bonus" | "upgrade_commission_tier";

export type CommissionTier =
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "elite";
