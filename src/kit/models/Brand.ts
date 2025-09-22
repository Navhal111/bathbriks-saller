export interface BrandsDataData {
  brands: string[];
  totalItems: number;
}

export interface BrandsResponse {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data: BrandsDataData;
  err: null;
}
