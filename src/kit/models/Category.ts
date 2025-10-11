import BaseModel from "./BaseModel";

export interface CategoryType extends BaseModel {
    name: string;
    slug: string
    description?: string;
    status?: string;
}