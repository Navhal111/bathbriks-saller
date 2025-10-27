import BaseModel from "./BaseModel";

export interface DimensionData extends BaseModel {
    name: string;
    sku: string
    mrp: string
    b2bSalePrice: string;
    b2cSalePrice: string;
    value_for_dimension: string;
    image: null;
}

export interface Dimension extends BaseModel {
    data: {
        items: DimensionData[]
    }
    message: string;
    success: boolean;
}