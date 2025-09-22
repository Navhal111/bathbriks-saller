import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetailsResponse } from "@/kit/models/User";

interface UserState {
  userDetails: UserDetailsResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userDetails: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setUserDetails: (state, action: PayloadAction<UserDetailsResponse>) => {
      state.userDetails = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setUserDetailsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateUserDetails: (
      state,
      action: PayloadAction<Partial<UserDetailsResponse>>
    ) => {
      if (state.userDetails) {
        state.userDetails = { ...state.userDetails, ...action.payload };
      }
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setUserDetailsLoading,
  setUserDetails,
  setUserDetailsError,
  updateUserDetails,
  clearUserDetails,
} = userSlice.actions;

export default userSlice.reducer;
