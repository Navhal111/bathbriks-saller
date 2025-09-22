import BaseModel from "./BaseModel";

export interface TransferResponse extends BaseModel {
    itemId: string;
    itemName: string;
    price: string;
    storeId: string;
    storeName: string;
    currentStock: string;
    transferToStoreId: string;
    transferToStoreName: string;
    transferStoreStock: string;
    otherStockRequirement: string;
    transferQty: string;
}