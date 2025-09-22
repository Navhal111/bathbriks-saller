export interface VendororStoreItem {
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
    createdAt: string;
    updatedAt: string;
  }
  
  // Inner result object
  export interface VendororStoreResult {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: VendororStoreItem[];
    err: null;
  }
  
  // Final response
  export interface VendororStoreResponse {
    result: VendororStoreResult;
    success: boolean;
  }
  
  