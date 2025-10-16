import BaseModel from "./BaseModel";

export interface MediaType extends BaseModel {
    type: string;
    base64: string
    name: string
}