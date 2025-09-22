import BaseModel, { MetaModel } from "./BaseModel";

export interface ProductListData {
  brandName: string;
  casePackSize: string;
  createdAt?: string;
  edibility: string;
  gst: string;
  hsnCode: string;
  id?: number;
  isApproved: boolean;
  itemCode: string;
  itemName: string;
  lastPurchaseDate: string;
  lastPurchaseVendor: string;
  lastSaleDate: string;
  latestMRP: string;
  latestPurchasePrice: string;
  latestSalePrice: string;
  mainCategory: string;
  maxStock: number;
  maxWeeksStockNeeded: number;
  minWeeksStockNeeded: number;
  multiEANCode: string;
  packSizeType:string
  packSize: string;
  primaryEANCode: string;
  printName: string;
  reOrderLevel: number;
  returnPostExp: boolean;
  returnPreExp: boolean;
  shelfLifeInDays: string;
  stopBuy: boolean;
  subCategory: string;
  tags: string;
  updatedAt?: string;
}


export interface ProductListResponse extends BaseModel {
  data: ProductListData[];
  message: string;
  meta: MetaModel
  success: boolean;
}