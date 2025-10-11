import BaseModel from "./BaseModel";

export interface BrandType extends BaseModel {
    name: string;
    slug: string
    image:string
    description?: string;
    status?: string;
}