export interface CategoryPopularData {
    categories:string
    last_purchase_date:string
    no_of_products:string
    total_qty:string
    total_revenue:string
}

export interface CategoryPopularResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: CategoryPopularData[];
    err: null;
}
