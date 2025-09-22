export interface StoreData {
  address: string;
  createdAt: string;
  id: number;
  isActive: boolean;
  storeCode: string;
  storeName: string;
  updatedAt: string;
}

export interface Data {
  currentPage: number;
  pageSize: number;
  stores: StoreData[];
  totalItems: number;
  totalPages: number;
}

export interface StoreResponse {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data: Data;
  err: null;
}
