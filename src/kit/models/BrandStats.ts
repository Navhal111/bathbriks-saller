export interface BrandStatsData {
    averageInvoiceValue: string
    brand: string
    categories: string
    id: number
    item_name: string
    monthlyRevenueData: []
    noOfCustomers: string
    noOfInvoices: string
    qty: string
    totalRevenue: string
    reorderingScore:string
}

export interface BrandStatsResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: BrandStatsData[];
    err: null;
}
