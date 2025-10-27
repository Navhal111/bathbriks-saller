import { API_VERSION, customRequest } from '@/kit/hooks/data/fetchers'
import useSWRCreateOne from '@/kit/hooks/data/swr/useSWRCreateOne'
import useSWRDeleteOneAndRefreshAll from '@/kit/hooks/data/swr/useSWRDeleteOneAndRefreshAll'
import type { CreateOneResponse } from '@/kit/models/_generic'
import type {
  Login,
  SignUp,
  Otp,
  OtpVerify,
  RestPassword,
  VerifyPassword,
  Enable2FA,
  Verify2FASecurity
} from '@/kit/models/Auth'
import type { User } from '@/kit/models/User'
import type { Params } from '@/kit/services/axiosService'
import useSWRMutation from 'swr/mutation'

const LOGIN_PATH_NAME = 'seller/login'
const LOGIN_ENABLE_2FA = 'auth/enable-2fa'
const LOGIN_VERIFY_2FA = 'auth/verify-2fa-setup'
const LOGIN_SECURITY_VERIFY_2FA = 'auth/verify-2fa'
const LOGIN_DISABLE_2FA = 'auth/disable-2fa'
const OTP_GENERATE_2FA_DISABLE = 'otp/generate/2fa-recorvery/disable'
const OTP_VERIFY_GENERATE_2FA_DISABLE = 'otp/generate/2fa-recorvery/verification'
const SIGNUP_PATH_NAME = 'seller/register-seller'
const RESET_PASSWORD_PATH_NAME = 'auth/reset-password'
const OTP_PATH_NAME = 'otp/generate'
const OTP_VERIFY_PATH_NAME = 'otp/verify'
const LOGOUT_PATH_NAME = 'auth/logout'
const LOGOUT_ALL_PATH_NAME = 'auth/logout-all'
const CHANGE_PASSWORD_PATH_NAME = 'auth/change-password'
const VERIFY_PASSWORD_PATH_NAME = 'auth/verify-password'

const useSWRLogin = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<Login>>({
    path: LOGIN_PATH_NAME,
    apiVersion: API_VERSION
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useSWRSignUp = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<SignUp>>({
    path: SIGNUP_PATH_NAME
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useSWROtp = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<Otp>>({ path: OTP_PATH_NAME })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useSWROtpVerify = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<OtpVerify>>({
    path: OTP_VERIFY_PATH_NAME
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useSWRRestPassword = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<RestPassword>>({
    path: RESET_PASSWORD_PATH_NAME
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useSWRLogout = (id?: string, params?: Params) => {
  const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<User>({
    path: LOGOUT_PATH_NAME,
    id,
    key: params,
    apiVersion: API_VERSION
  })

  return {
    data,
    error,
    isDeleting,
    reset,
    deleteRecord
  }
}

const useSWRLogoutAll = (id?: string, params?: Params) => {
  const { data, error, trigger, reset, isMutating } = useSWRMutation([LOGOUT_ALL_PATH_NAME], ([name]: string[]) =>
    customRequest<User, User>({
      name,
      method: 'DELETE'
    })
  )

  return {
    data,
    error,
    isLogoutAll: isMutating,
    reset,
    deleteRecord: () => {
      return trigger()
    }
  }
}

const useSWRChangePassword = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<RestPassword>>({
    path: CHANGE_PASSWORD_PATH_NAME
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useSWRVerifyPassword = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<VerifyPassword>>({
    path: VERIFY_PASSWORD_PATH_NAME
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useEnable2FASecurity = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<Enable2FA>>({
    path: LOGIN_ENABLE_2FA
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useVerify2FASecurity = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<Verify2FASecurity>>({
    path: LOGIN_VERIFY_2FA
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useVerify2FALogin = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<Verify2FASecurity>>({
    path: LOGIN_SECURITY_VERIFY_2FA
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useDisable2FASecurity = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<Verify2FASecurity>>({
    path: LOGIN_DISABLE_2FA
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useGenerateOTP2FADisable = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<Enable2FA>>({
    path: OTP_GENERATE_2FA_DISABLE
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

const useEmailOTP2FADisableVerify = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<Enable2FA>>({
    path: OTP_VERIFY_GENERATE_2FA_DISABLE
  })

  return {
    data,
    error,
    isMutating,
    reset,
    create
  }
}

export {
  useSWRLogin,
  useSWRSignUp,
  useSWROtp,
  useSWROtpVerify,
  useSWRRestPassword,
  useSWRLogout,
  useSWRLogoutAll,
  useSWRChangePassword,
  useSWRVerifyPassword,
  useEnable2FASecurity,
  useVerify2FASecurity,
  useDisable2FASecurity,
  useGenerateOTP2FADisable,
  useEmailOTP2FADisableVerify,
  useVerify2FALogin
}
