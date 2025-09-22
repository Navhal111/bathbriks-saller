import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setUserDetailsLoading,
  setUserDetails,
  setUserDetailsError,
  updateUserDetails,
  clearUserDetails,
} from "@/store/slices/userSlice";
import {
  selectUserDetails,
  selectUserLoading,
  selectUserError,
} from "@/store/selectors/userSelectors";
import {
  useGetUserDetails,
  useUpdateUserDetails,
} from "@/kit/hooks/data/users";
import {
  UserDetailsResponse,
  UpdateUserDetailsPayload,
} from "@/kit/models/User";

export const useUserDetailsRedux = () => {
  const dispatch = useAppDispatch();

  // Redux selectors
  const userDetails = useAppSelector(selectUserDetails);
  const isLoading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  // API hooks
  const { getUserDetails, isGettingUserDetails, getUserDetailsError } =
    useGetUserDetails();
  const {
    updateUserDetails: updateUserDetailsAPI,
    isUpdatingUserDetails,
    updateUserDetailsError,
  } = useUpdateUserDetails();

  // Fetch user details and store in Redux
  const fetchUserDetails = useCallback(async () => {
    dispatch(setUserDetailsLoading(true));
    try {
      const result = await getUserDetails({});
      dispatch(setUserDetails(result));
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch user details";
      dispatch(setUserDetailsError(errorMessage));
      throw err;
    }
  }, [dispatch, getUserDetails]);

  // Update user details and store in Redux
  const updateUser = useCallback(
    async (payload: UpdateUserDetailsPayload) => {
      dispatch(setUserDetailsLoading(true));
      try {
        const result = await updateUserDetailsAPI(payload);
        // Update Redux store with the new data
        dispatch(
          updateUserDetails({
            userName: payload.username,
            userEmail: payload.userEmail,
            userMobile: payload.userMobile,
            userType: payload.userType,
          })
        );
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update user details";
        dispatch(setUserDetailsError(errorMessage));
        throw err;
      }
    },
    [dispatch, updateUserDetailsAPI]
  );

  // Clear user details from Redux
  const clearUser = useCallback(() => {
    dispatch(clearUserDetails());
  }, [dispatch]);

  return {
    // Redux state
    userDetails,
    isLoading: isLoading || isGettingUserDetails || isUpdatingUserDetails,
    error: error || getUserDetailsError || updateUserDetailsError,

    // Actions
    fetchUserDetails,
    updateUser,
    clearUser,

    // Individual update actions
    updateUserDetailsInStore: (updates: Partial<UserDetailsResponse>) => {
      dispatch(updateUserDetails(updates));
    },
  };
};
