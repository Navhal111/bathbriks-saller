import BaseModel from "./BaseModel";

export interface PurchaseOrderItem {
  id: number;
  poNumber: string;
  itemId: number | null;
  itemName: string | null;
  vendorId: number;
  storeId: number;
  packSize: string | null;
  recommendedQuantity: number | null;
  finalPOQuantity: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  brandId: number | null;
  avgWeeklySale: number | null;
  wowTrend: number | null;
  wksOfStockReq: number | null;
  Adjustment: number | null;
}

export interface PurchaseOrderData {
  poNumber: string;
  itemsCount: number;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderResponse extends BaseModel {
  status: number;
  message: string;
  data: PurchaseOrderData;
}
