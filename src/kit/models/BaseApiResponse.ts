export type BaseApiResponse<T> = {
    status: number
    responseCode: number
    success: boolean
    message: string
    data: T
    err: null
  }
  