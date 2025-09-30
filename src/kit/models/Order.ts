import BaseModel from "./BaseModel";

export interface OrderType extends BaseModel {
    orderID: string;
    customerName: string;
    productQty: number;
    totalMrp: number;
    totalPrice: number;
    status: string;
    orderProducts: OrderProducts[]
}

export interface OrderProducts {
    id: string
    productName: string
    price: number
    mrp: number
    quantity: number
    finaPrice?: number
}