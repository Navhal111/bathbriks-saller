import BaseModel from "./BaseModel"

export interface GSTData {
    createdAt?: string
    id?: number
    label: string
    updatedAt?: string
    value: number
}

export interface GSTListResponse extends BaseModel {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: GSTData[];
    err: null;
}