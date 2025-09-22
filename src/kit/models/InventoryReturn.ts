import BaseModel from "./BaseModel";

export interface InventoryReturnResponse extends BaseModel {
    productCode: string;
    productName: string;
    price: number;
    storeName: string;
    currentStock: number;
    salesLastTwoMonths: number;
    daysSinceLastSale: number;
    vendorName: string;
    stockValue: number
}