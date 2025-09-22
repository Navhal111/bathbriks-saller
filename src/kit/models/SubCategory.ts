import BaseModel from "./BaseModel";

export interface SubCategoryType extends BaseModel {
    name: string;
    description: string;
    status: string;
    category: string;
}