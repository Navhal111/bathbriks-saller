export interface BrandRevenueMonthData {
    brand: string;
    month: string;
    monthly_margin: string;
    monthly_qty: string;
    item_name?:string
}

export interface BrandRevenueMonthResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: BrandRevenueMonthData[];
    err: null;
}
