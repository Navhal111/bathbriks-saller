import { API_VERSION, fetchAll } from "@/kit/hooks/data/fetchers";
import useSWR from "swr";
import type { CustomError } from "@/kit/models/CustomError";
import type { Params } from "@/kit/services/axiosService";
import {
  UsersListResponse,
  AddUserResponse,
  AddUserPayload,
  UsersListItem,
  UpdatePasswordPayload,
  UpdatePasswordResponse,
  EditUserPayload,
  EditUserResponse,
  UserDetailsPayload,
  UserDetailsResponse,
  UpdateUserDetailsPayload,
  UpdateUserDetailsResponse,
} from "@/kit/models/User";
import useSWRCreateOne from "./swr/useSWRCreateOne";

const USERS_LIST_PATH = "businessUser/users/get";
const ADD_USER_PATH = "businessUser/add";
const UPDATE_PASSWORD_PATH = "businessUser/update/password";
const EDIT_USER_PATH = "businessUser/update";
const USER_DETAILS_PATH = "businessUser/userDetails";
const UPDATE_USER_DETAILS_PATH = "businessUser/update/userDetails";

const useGetUsersList = (params?: Params) => {
  const { data, error, isValidating, isLoading, mutate } = useSWR<
    UsersListItem[],
    CustomError[]
  >(
    [`${API_VERSION}/${USERS_LIST_PATH}`, params],
    (): Promise<UsersListItem[]> => fetchAll(`${USERS_LIST_PATH}`, params),
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
    }
  );

  return {
    usersList: data ?? [],
    usersListError: error,
    isUsersListLoading: isLoading,
    isValidatingUsersList: isValidating,
    refreshUsersList: mutate,
  };
};

const useAddUser = (params?: Params) => {
  const { data, error, isMutating, reset, create } =
    useSWRCreateOne<AddUserResponse>({
      path: ADD_USER_PATH,
      key: params,
    });

  const typedCreate = create as (
    data: AddUserPayload
  ) => Promise<AddUserResponse>;

  return {
    onAddUser: data,
    addUserError: error,
    isAddingUser: isMutating,
    addUserReset: reset,
    addUser: typedCreate,
  };
};

const useUpdatePassword = (params?: Params) => {
  const { data, error, isMutating, reset, create } =
    useSWRCreateOne<UpdatePasswordResponse>({
      path: UPDATE_PASSWORD_PATH,
      key: params,
    });

  const typedCreate = create as (
    data: UpdatePasswordPayload
  ) => Promise<UpdatePasswordResponse>;

  return {
    onUpdatePassword: data,
    updatePasswordError: error,
    isUpdatingPassword: isMutating,
    updatePasswordReset: reset,
    updatePassword: typedCreate,
  };
};

const useEditUser = (params?: Params) => {
  const { data, error, isMutating, reset, create } =
    useSWRCreateOne<EditUserResponse>({
      path: EDIT_USER_PATH,
      key: params,
    });

  const typedCreate = create as (
    data: EditUserPayload
  ) => Promise<EditUserResponse>;

  return {
    onEditUser: data,
    editUserError: error,
    isEditingUser: isMutating,
    editUserReset: reset,
    editUser: typedCreate,
  };
};

const useGetUserDetails = (params?: Params) => {
  const { data, error, isMutating, reset, create } =
    useSWRCreateOne<UserDetailsResponse>({
      path: USER_DETAILS_PATH,
      key: params,
    });

  const typedCreate = create as (
    data?: UserDetailsPayload
  ) => Promise<UserDetailsResponse>;

  return {
    onGetUserDetails: data,
    getUserDetailsError: error,
    isGettingUserDetails: isMutating,
    getUserDetailsReset: reset,
    getUserDetails: typedCreate,
  };
};

const useUpdateUserDetails = (params?: Params) => {
  const { data, error, isMutating, reset, create } =
    useSWRCreateOne<UpdateUserDetailsResponse>({
      path: UPDATE_USER_DETAILS_PATH,
      key: params,
    });

  const typedCreate = create as (
    data: UpdateUserDetailsPayload
  ) => Promise<UpdateUserDetailsResponse>;

  return {
    onUpdateUserDetails: data,
    updateUserDetailsError: error,
    isUpdatingUserDetails: isMutating,
    updateUserDetailsReset: reset,
    updateUserDetails: typedCreate,
  };
};

export {
  useGetUsersList,
  useAddUser,
  useUpdatePassword,
  useEditUser,
  useGetUserDetails,
  useUpdateUserDetails,
};
