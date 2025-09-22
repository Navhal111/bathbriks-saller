import BaseModel from "./BaseModel";

export enum InventoryAlertType {
  STOCK_OUT = "STOCK_OUT",
  NEGATIVE_STOCK = "NEGATIVE_STOCK",
  DEAD_STOCK = "DEAD_STOCK",
  OVER_STOCK = "OVER_STOCK",
  UNDER_STOCK = "UNDER_STOCK",
  LOW_STOCK = "LOW_STOCK",
  HIGH_STOCK = "HIGH_STOCK",
}

export interface InventoryAlert extends BaseModel {
  alertType: InventoryAlertType;
  avgWeeklySale: string;
  brand: string;
  firstVolume: string;
  isActive: boolean;
  itemId: string;
  itemName: string;
  lastSale: string;
  lastSixMonthVolume: string;
  location: string;
  pCategory: string;
  stockQty: number;
  price: number;
  storeId: string;
  vendorId: string;
  storeName?:string;
  newSalePrice?:number;
}

export interface InventoryAlertResponse {
  alerts: InventoryAlert[];
}
