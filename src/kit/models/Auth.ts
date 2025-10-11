import type BaseModel from "@/kit/models/BaseModel";
import type { User } from "@/kit/models/User";
import type { Tokens } from "@/kit/models/_generic";
import { Seller } from "./Seller";

export interface Login extends BaseModel {
  statusCode: number;
  message: string;
  data: LoginData;
}

export interface Enable2FA extends BaseModel {
  type: string;
  data?: {
    qrCode?: string;
    secret?: string;
  };
}

export interface Verify2FASecurity extends BaseModel {
  code: string;
  data: LoginData;
}

export interface LoginData {
  accessToken?: string;
  refreshToken?: string
  tokens: Tokens;
  seller: Seller
}

export interface SignUp extends BaseModel {
  success: boolean;
  message: string;
  data: SignUpData;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  countryCode: string;
  user: User;
  tokens: Tokens;
}

export interface Otp extends BaseModel {
  user: string;
  phoneNumber?: string;
  email?: string;
  countryCode?: string;
  type: string;
}

export interface OtpVerify extends BaseModel {
  phoneNumber?: string;
  email?: string;
  otp?: string;
}

export interface RestPassword extends BaseModel {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ChangePassword extends BaseModel {
  otp: string;
  newPassword: string;
}

export interface VerifyPassword extends BaseModel {
  currentPassword: string;
}
