export interface BrandRevenueArrayData {
    brand: string;
    categoryRevenue: string;
    category_qty: string;
    revenuePercentage: string;
}

export interface BrandRevenueData {
    data:BrandRevenueArrayData[]
    totalRevenue:string
}

export interface BrandRevenueResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: BrandRevenueData;
    err: null;
}
