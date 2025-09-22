export interface SecondaryCategoryMonthlyRevenueData {
    month: string
    monthly_customers: string
    monthly_invoices: string
    monthly_revenue: string
}

export interface BrandsData {
    id: number;
    brand: string;
    monthly_revenue_data: SecondaryCategoryMonthlyRevenueData[]
    no_of_customers: string;
    no_of_invoices: string;
    no_of_products: string;
    revenue_percentage: string;
    total_qty: string;
    total_revenue: string;

}

export interface CategoryRevenueData {
    allMonthlyRevenueData:SecondaryCategoryMonthlyRevenueData[]
    brands: BrandsData[]
    totalRevenue: number
    category: string
}

export interface SecondaryCategoryRevenueResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: CategoryRevenueData;
    err: null;
}
