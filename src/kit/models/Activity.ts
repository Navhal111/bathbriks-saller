import type BaseModel from '@/kit/models/BaseModel'

export interface Activity extends BaseModel {
  userId: string
  companyId: string
  summary: string
}
