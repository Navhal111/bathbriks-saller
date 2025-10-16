import BaseModel from "./BaseModel";

export interface SupoortType extends BaseModel {
    title: string;
    description?: string;
    date: string
    status: string;
}