import type { PermissionsEntity } from '@/kit/models/_generic'
import type BaseModel from '@/kit/models/BaseModel'
import type { User } from '@/kit/models/User'

export interface Company extends BaseModel {
  companyId: CompanyId
  role: string
  designation: string
  isOwner: boolean
  permissions: PermissionsEntity[]
  documentUrl: string
  name: string
  email?: string
  fullTimeAmount?: number
  partTimeAmount?: number
  phoneNumber?: string
  countryCode?: string
  address?: string
  websiteUrl?: string
  gstNo?: string
  logo?: string
  socialMedia: {
    facebookId?: string
    instagramId?: string
    pinterestId?: string
  }
  invitedBy: User
  joiningDate: string
}

export interface CompanyId {
  _id: string
  name: string
  logo: string
}
