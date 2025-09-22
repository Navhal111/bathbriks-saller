export interface InvoiceRevenueMonthData {
    categories: string;
    classified_category: string;
    month: string;
    monthly_margin: string;
    monthly_qty: string;
}

export interface InvoiceRevenueMonthResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: InvoiceRevenueMonthData[];
    err: null;
}
