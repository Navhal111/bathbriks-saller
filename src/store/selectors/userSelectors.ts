import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

// Basic selectors
export const selectUserState = (state: RootState) => state.user;

// Memoized selectors
export const selectUserDetails = createSelector(
  [selectUserState],
  (userState) => userState.userDetails
);

export const selectUserLoading = createSelector(
  [selectUserState],
  (userState) => userState.isLoading
);

export const selectUserError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

export const selectUserName = createSelector(
  [selectUserDetails],
  (userDetails) => userDetails?.userName || ""
);

export const selectUserEmail = createSelector(
  [selectUserDetails],
  (userDetails) => userDetails?.userEmail || ""
);

export const selectUserMobile = createSelector(
  [selectUserDetails],
  (userDetails) => userDetails?.userMobile || ""
);

export const selectUserType = createSelector(
  [selectUserDetails],
  (userDetails) => userDetails?.userType
);

export const selectUserId = createSelector(
  [selectUserDetails],
  (userDetails) => userDetails?.id
);
