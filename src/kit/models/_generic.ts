import type BaseModel from '@/kit/models/BaseModel'

interface ExtraData {
  [key: string]: any
}

export interface Meta {
  currentPage: number
  recordsPerPage: number
  totalPages: number
  extra?: ExtraData
  totalRecords: number
  [key: string]: any
}

export type GetAllResponse<T extends BaseModel> = {
  meta: Meta
  data: T[]
}
export type GetOneResponse<T extends BaseModel> = {
  data: T
}
export type CreateOneResponse<T> = T
export type UpdateOneResponse<T extends BaseModel> = {
  data: T
  statusCode: number
  message: string
}

export type DeleteOneResponse = {}

export interface PermissionsEntity {
  module: string
  accessLevel: 'full' | 'limited' | 'none'
  _id: string
}

export interface Role {
  _id: string
  code: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}
