import BaseModel from "./BaseModel";

export interface LinkProduct extends BaseModel {
    product_id: number;
    linked_product_ids: number[];
    replace: boolean;
}