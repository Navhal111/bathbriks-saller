import BaseModel from "./BaseModel";

export interface OrderType extends BaseModel {
    date: string
    orderID: string;
    customerName: string;
    customerNumber: string
    productQty: number;
    totalMrp: number;
    totalPrice: number;
    status: string;
    deliveryPincode: string,
    deliveryCity: string,
    paymentMode: string,
    orderProducts: OrderProducts[]
}

export interface OrderProducts {
    id: string
    productName: string
    price: number
    mrp: number
    quantity: number
    finaPrice?: number
    sku: string
    productUrl: string[]
}

// New interfaces for the seller orders API response
export interface SellerOrderType extends BaseModel {
    userId: number;
    order_date: string;
    status: "PLACED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    total_price: number;
    paymentType: "cod" | "online";
    address_id: number;
    seller_id: number;
    user?: {
        id: number;
        name: string;
        email: string;
        mobile: string;
    };
    orderitems?: OrderItem[];
    statushistory?: StatusHistory[];
}

export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    qty: number;
    price: number;
    type: string | null;
    product: ProductDetails;
    sku: string
}

export interface ProductDetails {
    id: number;
    name: string;
    description: string;
    mrp: string;
    quantity: number;
    is_fragile: boolean;
    brand_id: number;
    category_id: number;
    subcategory_id: number;
    created_by: number | null;
    updated_by: number | null;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    seller_id: number;
    user_id: number | null;
    availableDate: string;
    dateFieldName: string;
    endDate: string;
    freeShipping: boolean;
    inventoryTracking: boolean;
    isLimitDate: boolean;
    isPurchaseSpecifyDate: boolean;
    lowStock: number;
    manufacturerNumber: string;
    metaDescription: string;
    metaKeywords: string;
    pageTitle: string;
    productAvailability: string;
    shippingPrice: string;
    tags: string[];
    tradeNumber: number;
    type: string | null;
    upcEan: string;
    customFields: CustomField[];
    locationBasedShipping: boolean;
    locationShipping: LocationShipping[];
    sku: string;
    costPrice: string | null;
    approvedAt: string | null;
    approvedById: number | null;
    deactivatedAt: string | null;
    deactivatedById: number | null;
    rejectedAt: string | null;
    rejectedById: number | null;
    remarks: string | null;
    removedAt: string | null;
    removedById: number | null;
    status: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";
    submittedAt: string | null;
    b2bSalePrice: string | null;
    b2cSalePrice: string | null;
    isQuantityPrice: boolean;
    maxDeliveryTime: string;
    maxOrder: number;
    minDeliveryTime: string;
    minOrder: number;
    quantityPrice: QuantityPrice[] | null;
    uom: string;
    product_group_id: number | null;
    isVariant: boolean;
    productUrl: string[]
}

export interface CustomField {
    label: string;
    value: string;
}

export interface LocationShipping {
    name: string;
    shippingCharge: number;
}

export interface QuantityPrice {
    price: string;
    quantity: number;
}

export interface StatusHistory {
    id: number;
    orderId: number;
    status: string;
    updatedAt: string;
}

export interface SellerOrdersResponse {
    success: boolean;
    message: string;
    data: SellerOrderType[];
    meta?: {
        currentPage: number;
        recordsPerPage: number;
        totalPages: number;
        totalRecords: number;
    };
}