export enum InvoiceOrderStatsCategory {
  FIRST_INVOICE = "First Invoice",
  TWO_TO_FOUR_INVOICE = "2-4 Invoices",
  FIVE_TO_TWELVE_INVOICE = "5-12 Invoices",
  ABOVE_THIRTEEN_INVOICE = "Above 13 Invoices",
}

export interface InvoiceInvoiceStatsData {
  invoice_no: string;
  invoice_date: string;
  customer_id: string;
  item_count: number;
  total_quantity: number;
  total_amount: number;
  invoice_category: string;
  invoice_order: number;
  invoice_order_type: InvoiceOrderStatsCategory;
}

export interface InvoiceInvoiceStatsResponse {
  status: number;
  responseCode: number;
  success: boolean;
  message: string;
  data: InvoiceInvoiceStatsData[];
  err: null;
}
