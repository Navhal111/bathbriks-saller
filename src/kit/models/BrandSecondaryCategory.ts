export interface BrandSecondaryCategoryData {
    brand: string
    secondary_category: string
    brand_revenue: string
}

export interface BrandSecondaryCategoryResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: BrandSecondaryCategoryData[];
    err: null;
}
