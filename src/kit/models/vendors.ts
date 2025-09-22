export interface VendorsData {
  address: string;
  businessName: string;
  createdAt: string;
  email: string;
  firstName: string;
  gstNumber: string;
  id: number;
  image: string;
  isActive: boolean;
  lastName: string;
  phone: string;
  phoneNumber: string;
  state: string;
  updatedAt: string;
}

export interface Data {
  currentPage: number;
  pageSize: number;
  vendors: VendorsData[];
  totalItems: number;
  totalPages: number;
}

export interface VendorsResponse {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data: Data;
  err: null;
}
