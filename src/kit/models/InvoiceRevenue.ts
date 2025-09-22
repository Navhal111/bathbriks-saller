export interface InvoiceRevenueArrayData {
    category: string;
    categoryRevenue: string;
    category_qty: string;
    classifiedCategory: string;
    revenuePercentage: string;
}

export interface InvoiceRevenueData {
    data: InvoiceRevenueArrayData[]
    totalRevenue: string
}

export interface InvoiceRevenueResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: InvoiceRevenueData;
    err: null;
}
