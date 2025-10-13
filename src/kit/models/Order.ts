import BaseModel from "./BaseModel";

export interface OrderType extends BaseModel {
    date: string
    orderID: string;
    customerName: string;
    customerNumber: string
    productQty: number;
    totalMrp: number;
    totalPrice: number;
    status: string;
    deliveryPincode: string,
    deliveryCity: string,
    paymentMode: string,
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