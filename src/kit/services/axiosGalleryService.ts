import authConfig from '@/config/auth'
import type { ApiResponseError } from '@/kit/models/CustomError'
import storage from '@/kit/services/storage'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

export type SortType = 'asc' | 'desc' | undefined | null
export type Params = Record<string, string | string[] | number | boolean | undefined | SortType>
export type Headers = Record<string, string>

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API}`
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = storage.getItem(authConfig.storageGalleryTokenKeyName)

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`

      config.params = {
        ...config.params
      }
    }

    return config
  },
  error => Promise.reject(error)
)

/** Add request/response interceptor */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const originalRequest = error.config
    const response = error.response

    if (response.data.statusCode === 10004) {
      handleLogout()
    }
    if (response && response.status === 401 && !originalRequest._retry) {
      handleLogout()
    }

    return Promise.reject(error)
  }
)

const get = async (path: string, params?: Params, headers?: Headers) => {
  try {
    const response = await axiosInstance.get(path, {
      params: params,
      headers: headers
    })

    return handleResponse(response)
  } catch (error) {
    return handleError(error as AxiosError)
  }
}

const post = async (path: string, payload?: object, params?: Params, headers?: Headers) => {
  try {
    const response = await axiosInstance.post(path, payload, {
      params: params,
      headers: headers
    })

    return handleResponse(response)
  } catch (error) {
    return handleError(error as AxiosError)
  }
}

const patch = async (path: string, payload?: object, params?: Params, headers?: Headers) => {
  try {
    const response = await axiosInstance.patch(path, payload, {
      params: params,
      headers: headers
    })

    return handleResponse(response)
  } catch (error) {
    return handleError(error as AxiosError)
  }
}

const remove = async (path: string, params?: Params, headers?: Headers) => {
  try {
    const response = await axiosInstance.delete(path, {
      params: params,
      headers: headers
    })

    return handleResponse(response)
  } catch (error) {
    return handleError(error as AxiosError)
  }
}

export const request = async ({
  path,
  method,
  payload,
  params,
  headers
}: {
  path: string
  method: 'POST' | 'PATCH' | 'GET' | 'DELETE'
  payload?: object
  params?: Params
  headers?: Headers
}) => {
  try {
    const response = await axiosInstance.request({
      method,
      url: path,
      data: payload,
      params: params,
      headers: headers
    })

    return handleResponse(response)
  } catch (error) {
    return handleError(error as AxiosError)
  }
}

const handleResponse = (response: AxiosResponse): any => {
  const data = response.data
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  } else if (typeof data === 'object' && data !== null) {
    return data
  }
}

const handleError = (error: AxiosError): never => {
  const responseData = error.response?.data as ApiResponseError
  const statusCode = error.response?.status

  if (statusCode === 500) {
    throw [
      {
        title: 'general_error',
        detail: 'An error occurred, Please retry again later',
        code: statusCode || 500
      }
    ]
  } else {
    if (responseData?.errors) {
      const errors = responseData as ApiResponseError
      throw errors
    } else {
      throw responseData
    }
  }
}

/** Handle logout logic */
function handleLogout() {
  storage.removeItem(authConfig.storageGalleryTokenKeyName)

  // window.location.href = `/gallery/${storage.getItem(authConfig.storageGalleryIdKeyName)}`
}

export default { get, post, patch, remove, request }
