import BaseModel from "./BaseModel";
import { PurchaseOrderItem } from "./PurchaseOrder";

export interface PurchaseOrderListResponse extends BaseModel {
  status: number;
  message: string;
  totalItems: number;
  items: PurchaseOrderItem[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
