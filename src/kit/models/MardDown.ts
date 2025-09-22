import BaseModel from "./BaseModel";


export interface AddMarddownResponse extends BaseModel {
    itemId: string;
    itemName: string;
    mrp: string;
    salePrice: string;
    purchasePrice: string;
    storeId: string;
    storeName: string;
    currentStock: string;
    newSalePrice: string;
    saleOfLast2Months: string | null;
    daySinceLastSale: string | null;
}

export interface UpdateMarddownResponse extends BaseModel {
    itemId: string;
    itemName: string;
    mrp: string;
    salePrice: string;
    purchasePrice: string;
    storeId: number[];
    storeName: string;
    currentStock: string;
    newSalePrice: string;
}