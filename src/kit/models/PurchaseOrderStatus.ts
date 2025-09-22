import BaseModel from "./BaseModel";
import { StoreData } from "./Store";
import { VendorsData } from "./vendors";

export interface PurchaseOrderItem extends BaseModel {
  poNumber: string;
  vendorId: string;
  vendorName: string;
  itemId: string;
  itemName: string;
  storeId: string;
  store: StoreData;
  vendor: VendorsData;
  storeName: string;
  status: "pending" | "fulfilled" | "cancelled";
  finalPOQuantity: string;
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  price: string;
  totalAmount: number;
  poValidTillDate: string;
  isLate: boolean;
}

export interface PoOrderResponse {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data: PurchaseOrderItem[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  err: null;
}

export enum PurchaseOrderStatus {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  CANCELLED = "cancelled",
}
