export interface CategoryRevenueArrayData {
    category: string;
    categoryRevenue: string;
    revenuePercentage: string;
}

export interface CategoryRevenueData {
    data:CategoryRevenueArrayData[]
    totalRevenue:string
}

export interface CategoryRevenueResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: CategoryRevenueData;
    err: null;
}
