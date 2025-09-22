import BaseModel from "./BaseModel";

export interface DisplayCheckResponse extends BaseModel {
    daysSinceLastSale: null | string;
    lastPurchaseDate: string;
    price: number;
    productCode: string;
    productName: string;
    salesLastTwoMonths: number;
    stockQty: number;
    storeName: string;
}