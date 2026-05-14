import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  RewardEvent,
  PostsPeriod,
  RewardWith,
  CommissionTier,
} from "@/types/reward";

interface RewardState {
  // Reward Event
  rewardEvent: RewardEvent | null;
  salesAmount: string;
  postsCount: string;
  postsPeriod: PostsPeriod | null;

  // Reward With
  rewardWith: RewardWith | null;
  flatBonusAmount: string;
  selectedCommissionTier: CommissionTier | null;

  // Modal states
  isCommissionTierModalOpen: boolean;
  isTimeBound: boolean;
  endDate: string | null;

  // Dropdown open states
  isRewardEventDropdownOpen: boolean;
  isRewardWithDropdownOpen: boolean;
}

const initialState: RewardState = {
  rewardEvent: null,
  salesAmount: "",
  postsCount: "",
  postsPeriod: null,

  rewardWith: null,
  flatBonusAmount: "",
  selectedCommissionTier: null,

  isCommissionTierModalOpen: false,
  isTimeBound: false,
  endDate: null,

  isRewardEventDropdownOpen: false,
  isRewardWithDropdownOpen: false,
};

export const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    setRewardEvent(state, action: PayloadAction<RewardEvent | null>) {
      state.rewardEvent = action.payload;
      if (action.payload !== "cross_x_sales") {
        state.salesAmount = "";
      }
      if (action.payload !== "posts_x_times") {
        state.postsCount = "";
        state.postsPeriod = null;
      }
      // Disable upgrade_commission_tier if event is not cross_x_sales
      if (action.payload !== "cross_x_sales" && state.rewardWith === "upgrade_commission_tier") {
        state.rewardWith = null;
        state.selectedCommissionTier = null;
      }
    },
    clearRewardEvent(state) {
      state.rewardEvent = null;
      state.salesAmount = "";
      state.postsCount = "";
      state.postsPeriod = null;
    },
    setSalesAmount(state, action: PayloadAction<string>) {
      state.salesAmount = action.payload;
    },
    setPostsCount(state, action: PayloadAction<string>) {
      state.postsCount = action.payload;
    },
    setPostsPeriod(state, action: PayloadAction<PostsPeriod | null>) {
      state.postsPeriod = action.payload;
    },
    setRewardWith(state, action: PayloadAction<RewardWith | null>) {
      state.rewardWith = action.payload;
      if (action.payload !== "flat_bonus") {
        state.flatBonusAmount = "";
      }
    },
    clearRewardWith(state) {
      state.rewardWith = null;
      state.flatBonusAmount = "";
      state.selectedCommissionTier = null;
    },
    setFlatBonusAmount(state, action: PayloadAction<string>) {
      state.flatBonusAmount = action.payload;
    },
    setSelectedCommissionTier(state, action: PayloadAction<CommissionTier>) {
      state.selectedCommissionTier = action.payload;
    },
    openCommissionTierModal(state) {
      state.isCommissionTierModalOpen = true;
    },
    closeCommissionTierModal(state) {
      state.isCommissionTierModalOpen = false;
    },
    setIsTimeBound(state, action: PayloadAction<boolean>) {
      state.isTimeBound = action.payload;
      if (!action.payload) {
        state.endDate = null;
      }
    },
    setEndDate(state, action: PayloadAction<string | null>) {
      state.endDate = action.payload;
    },
    setRewardEventDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isRewardEventDropdownOpen = action.payload;
    },
    setRewardWithDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isRewardWithDropdownOpen = action.payload;
    },
    resetRewardForm() {
      return initialState;
    },
  },
});

export const {
  setRewardEvent,
  clearRewardEvent,
  setSalesAmount,
  setPostsCount,
  setPostsPeriod,
  setRewardWith,
  clearRewardWith,
  setFlatBonusAmount,
  setSelectedCommissionTier,
  openCommissionTierModal,
  closeCommissionTierModal,
  setIsTimeBound,
  setEndDate,
  setRewardEventDropdownOpen,
  setRewardWithDropdownOpen,
  resetRewardForm,
} = rewardSlice.actions;
