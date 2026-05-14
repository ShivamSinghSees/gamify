import { useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetRewardForm } from "@/store/reward-slice";
import { POSTS_PERIOD_OPTIONS, COMMISSION_TIER_LABELS } from "@/constants/reward";
import { toast } from "@/hooks/use-toast";

export function useRewardForm(onOpenChange: (open: boolean) => void) {
  const dispatch = useAppDispatch();
  const reward = useAppSelector((state) => state.reward);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    rewardEvent,
    salesAmount,
    postsCount,
    postsPeriod,
    rewardWith,
    flatBonusAmount,
    selectedCommissionTier,
    isTimeBound,
    endDate,
  } = reward;

  const isFormValid = useMemo(() => {
    if (!rewardEvent || !rewardWith) return false;
    if (rewardEvent === "cross_x_sales" && !salesAmount) return false;
    if (rewardEvent === "posts_x_times" && (!postsCount || !postsPeriod))
      return false;
    if (rewardWith === "flat_bonus" && !flatBonusAmount) return false;
    if (rewardWith === "upgrade_commission_tier" && !selectedCommissionTier)
      return false;
    if (isTimeBound && !endDate) return false;
    return true;
  }, [
    rewardEvent,
    salesAmount,
    postsCount,
    postsPeriod,
    rewardWith,
    flatBonusAmount,
    selectedCommissionTier,
    isTimeBound,
    endDate,
  ]);

  const rewardEventDisplayLabel = useMemo((): string => {
    if (!rewardEvent) return "";
    if (rewardEvent === "cross_x_sales") {
      return salesAmount
        ? `Cross $${salesAmount} in sales`
        : "Cross $X in sales";
    }
    if (rewardEvent === "posts_x_times") {
      const periodLabel = postsPeriod
        ? POSTS_PERIOD_OPTIONS.find((p) => p.value === postsPeriod)?.label
        : "Y period";
      return `Posts ${postsCount || "X"} times every ${periodLabel}`;
    }
    return "Is Onboarded";
  }, [rewardEvent, salesAmount, postsCount, postsPeriod]);

  const rewardWithDisplayLabel = useMemo((): string => {
    if (!rewardWith) return "";
    if (rewardWith === "flat_bonus") {
      return flatBonusAmount
        ? `Flat $${flatBonusAmount} bonus`
        : "Flat $X bonus";
    }
    if (rewardWith === "upgrade_commission_tier" && selectedCommissionTier) {
      return `Upgrade to ${COMMISSION_TIER_LABELS[selectedCommissionTier]}`;
    }
    return "Upgrade Commission Tier";
  }, [rewardWith, flatBonusAmount, selectedCommissionTier]);

  const isUpgradeDisabled = rewardEvent !== "cross_x_sales";

  const handleCancel = useCallback(() => {
    onOpenChange(false);
    dispatch(resetRewardForm());
  }, [dispatch, onOpenChange]);

  const handleCreate = useCallback(async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call — replace with real endpoint in production
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("Reward created:", {
        rewardEvent,
        salesAmount,
        postsCount,
        postsPeriod,
        rewardWith,
        flatBonusAmount,
        selectedCommissionTier,
        isTimeBound,
        endDate,
      });

      onOpenChange(false);
      dispatch(resetRewardForm());
      toast({
        title: "Reward Created!",
      });
    } catch {
      toast({
        title: "Failed to create reward",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [
    dispatch,
    onOpenChange,
    rewardEvent,
    salesAmount,
    postsCount,
    postsPeriod,
    rewardWith,
    flatBonusAmount,
    selectedCommissionTier,
    isTimeBound,
    endDate,
  ]);

  return {
    reward,
    isFormValid,
    isSubmitting,
    isUpgradeDisabled,
    rewardEventDisplayLabel,
    rewardWithDisplayLabel,
    handleCancel,
    handleCreate,
  };
}
