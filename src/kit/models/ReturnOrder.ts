import BaseModel from "./BaseModel";
import { OrderProducts } from "./Order";

export interface ReturnOrderType extends BaseModel {
    orderID: string;
    customerName: string;
    productQty: number;
    totalMrp: number;
    totalPrice: number;
    status: string;
    orderProducts: OrderProducts[]
}