import BaseModel from "./BaseModel";

export interface CategoryListData {
    categories: string
}

export interface CategoryListResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: CategoryListData;
    err: null;
}

export interface mainCategoryListData {
    createdAt: string
    id: number
    productCategoryId: string
    productCategoryName: string
    updatedAt: string
}

export interface MainCategoryListResponse extends BaseModel {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: mainCategoryListData[];
    err: null;
}

export interface SubCategoryListData {
    createdAt: string
    id: number
    productCategoryId: number
    productSubCategoryId:string
    productSubCategoryName: string
    updatedAt: string
}

export interface SubCategoryListResponse extends BaseModel {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: SubCategoryListData[];
    err: null;
}
