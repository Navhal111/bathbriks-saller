export interface VendororStoreDataType {
  id: number;
  productType: string;
  productCode: string;
  productName: string;
  productDescription: string | null;
  packSize: string | null;
  brandID: string;
  brandName: string;
  categoryID: string | null;
  categoryName: string | null;
  itemCategoryID: string;
  itemCategoryName: string;
  subCategoryID: string;
  subCategoryName: string;
  price: number;
  bkdAmount: number;
  stockQty: number;
  recommended_qty: number;
  isReturnable: boolean;
  isRefridgerator: boolean;
  taxRate: number;
  vendorId: string;
  storeId: string;
  avgWeeklySales?: number;
}

export interface CreatePurchaseOrderPayload {
  vendorId: string;
  poValidTill: string;
  wksOfStockReq: string;
  storeId: string;
  items: VendororStoreDataType[];
}
