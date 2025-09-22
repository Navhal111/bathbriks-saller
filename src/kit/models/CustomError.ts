export interface ApiResponseError {
  errors: CustomError[]
  error: CustomError
}

export interface CustomError {
  title: string
  detail: string
  code: number
}

export interface CustomErrorType {
  url: string
  message: string
  statusCode: number
}
