export interface InvoiceMonthlyRevenue {
    month: string
    monthlyRevenue: string
}

export interface InvoiceCategoryStatsData {
    averageInvoiceValue: string
    categories: string
    category: string
    id: number
    monthlyRevenueData: InvoiceMonthlyRevenue[]
    noOfCustomers: string
    noOfInvoices: string
    totalRevenue: string
}

export interface InvoiceCategoryStatsResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: InvoiceCategoryStatsData[];
    err: null;
}
