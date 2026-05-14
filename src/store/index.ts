import { configureStore } from "@reduxjs/toolkit";
import { rewardSlice } from "./reward-slice";

export const store = configureStore({
  reducer: {
    reward: rewardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
