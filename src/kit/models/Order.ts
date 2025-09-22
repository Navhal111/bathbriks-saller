import BaseModel from "./BaseModel";

export interface OrderType extends BaseModel {
    orderID: string;
    customerName: string;
    productQty: number;
    price: number;
    finalPrice: number;
    status: string;
}