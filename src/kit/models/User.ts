import type BaseModel from "@/kit/models/BaseModel";
import type { Company } from "@/kit/models/Company";
import type { Role } from "@/kit/models/_generic";

export interface UserResponse extends BaseModel {
  statusCode: number;
  message: string;
  data: User;
}

// Address type
export interface SellerAddress extends BaseModel {
  sellerId: number;
  type: string; // e.g., "REGISTERED" | "WAREHOUSE"
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
}

// Contact type
export interface SellerContact extends BaseModel {
  sellerId: number;
  name: string;
  phone: string;
  email: string;
  designation: string;
  isPrimary: boolean;
}

// Bank Account type
export interface SellerBankAccount extends BaseModel {
  sellerId: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string; // e.g., "SAVINGS"
  isVerified: boolean;
}

export interface User extends BaseModel {
  companyName: string;
  email: string;
  gstNumber: string;
  panNumber: string;
  status: string;
  kycStatus: string;
  addresses: SellerAddress[];
  contacts: SellerContact[];
  bankAccounts: SellerBankAccount[];
  documents: any[]; 
}

// export interface User extends BaseModel {
//   name: string;
//   email: string;
//   providers: string[];
//   profilePicUrl: string;
//   isPhoneNumberVerified: boolean;
//   phoneNumber: string;
//   isEmailVerified: boolean;
//   timezone: string;
//   twoFactorAuth?: {
//     isEnabled: true;
//     type: string;
//   };
//   companies: Company[] | [];
//   updatedBy: string;
//   role: Role;
//   countryCode: string;
// }

export interface UsersListItem {
  id: number;
  userName: string;
  userType: "ADMIN" | "SUPER_ADMIN" | "MANAGER" | "STAFF";
  userEmail: string;
  userMobile: string;
}

export interface UsersListResponse {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data: UsersListItem[];
  err: null;
}

export interface AddUserPayload {
  username: string;
  password: string;
  userEmail: string;
  userMobile: string;
  userType: "ADMIN" | "SUPER_ADMIN" | "MANAGER" | "STAFF";
}

export interface AddUserResponse extends BaseModel {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data?: any;
  err: null;
}

export interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordResponse extends BaseModel {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data?: any;
  err: null;
}

export interface EditUserPayload {
  id: number;
  username: string;
  userEmail: string;
  userMobile: string;
  userType: "ADMIN" | "SUPER_ADMIN" | "MANAGER" | "STAFF";
}

export interface EditUserResponse extends BaseModel {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data?: any;
  err: null;
}

export interface UserDetailsPayload {
  username?: string;
  userId?: number;
}

export interface UserDetailsResponse extends BaseModel {
  id: number;
  userName: string;
  userType: "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "STAFF";
  userMobile: string;
  userEmail: string;
  userDesignation?: string;
  userCompanyName?: string
  userRegisteredAddress?: string
  userWarehouseAddress?: string
  userGstNo?: string
  userPanCard?: string
  userBankName?: string
  userAccountName?: string
  userAccountNo?: string
  userEmailId?: string
  userIfscCode?: string
  userAccountType?: string
  userDealershipDocuments?: string
  createdDate: string;
  updatedDate: string;
}

export interface UpdateUserDetailsPayload {
  username: string;
  userEmail: string;
  userMobile: string;
  userType: "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "STAFF";
}

export interface UpdateUserDetailsResponse extends BaseModel {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data?: any;
  err: null;
}
