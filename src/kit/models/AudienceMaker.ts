export interface AudienceItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  customerCategory: string;
  createdAt: string;
  updatedAt: string;
}

export interface AudienceResponse {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data: AudienceItem[];
  err: null;
}
