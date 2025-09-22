import type BaseModel from '@/kit/models/BaseModel'

export interface ClientDetail extends BaseModel {
  name: string
  relation: string
  phoneNumber: string
  countryCode: string
  email: string
}
