import BaseModel from "./BaseModel";
import { CategoryType } from "./Category";

export interface SubCategoryType extends BaseModel {
    // name: string;
    // description: string;
    // status: string;
    // category: string;
    items: SubCategoryData[]
    total: number;
    page: number;
    pageSize: number;
}

export interface SubCategoryData extends BaseModel {
    category_id: number
    name: string
    slug: string
    category: CategoryType
}