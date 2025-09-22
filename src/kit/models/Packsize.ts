import BaseModel from "./BaseModel"

export interface PacksizeData {
    createdAt: string
    id: number
    description: null
    name: string
    updatedAt: string
}

export interface PacksizeListResponse extends BaseModel{
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: PacksizeData[];
    err: null;
}