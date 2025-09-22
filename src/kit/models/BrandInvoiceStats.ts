export interface BrandInvoiceStatsData {
    brand?: string
    invoiceCount: string
    month: string
    categories: string
    secondaryCategory: string
}

export interface BrandInvoiceStatsResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: BrandInvoiceStatsData[];
    err: null;
}
