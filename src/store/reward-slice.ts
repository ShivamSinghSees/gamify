import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  RewardEventType,
  PostsPeriod,
  RewardWithType,
  CommissionTier,
} from "@/types/reward";

interface RewardState {
  // Reward Event
  rewardEvent: RewardEventType | null;
  salesAmount: string;
  postsCount: string;
  postsPeriod: PostsPeriod | null;

  // Reward With
  rewardWith: RewardWithType | null;
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
    setRewardEvent(state, action: PayloadAction<RewardEventType>) {
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
    setSalesAmount(state, action: PayloadAction<string>) {
      state.salesAmount = action.payload;
    },
    setPostsCount(state, action: PayloadAction<string>) {
      state.postsCount = action.payload;
    },
    setPostsPeriod(state, action: PayloadAction<PostsPeriod>) {
      state.postsPeriod = action.payload;
    },
    setRewardWith(state, action: PayloadAction<RewardWithType>) {
      state.rewardWith = action.payload;
      if (action.payload !== "flat_bonus") {
        state.flatBonusAmount = "";
      }
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
  setSalesAmount,
  setPostsCount,
  setPostsPeriod,
  setRewardWith,
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
