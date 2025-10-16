import type BaseModel from "@/kit/models/BaseModel";

export interface Seller extends BaseModel {
    companyName: string;
    email: string;
    gstNumber: string;
    panNumber: string;
    status: string;
    kycStatus: string;
    totalOrders: number;
    totalSales: string;
}