export interface MonthlyRevenueData {
    month: string
    monthly_revenue: string
}

export interface CategoryStatsData {
    categories: string
    id: number
    monthly_revenue_data: MonthlyRevenueData[]
    no_of_customers: string
    noOfCustomers: string
    no_of_invoices: string
    no_of_products: string
    total_qty: string
    total_revenue: string
}

export interface CategoryStatsResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: CategoryStatsData[];
    err: null;
}
