import BaseModel from "./BaseModel";

export interface VariantOptionType {
  variant_option_id: number;
  value: string;
  variantOption: {
    name: string;
  };
}

export interface ProductImageType {
  url: string;
  altText: string;
}

export interface ProductVariantType {
  id: number;
  sku: string;
  price: number;
  stock: number;
  images: ProductImageType[];
  values: VariantOptionType[];
}

export interface BrandType {
  id: number;
  name: string;
}

export interface CategoryType {
  id: number;
  name: string;
}

export interface ProductData extends BaseModel {
  name: string;
  description: string;
  price: number;
  mrp: number;
  quantity: number;
  is_fragile: boolean;
  brand_id: number;
  category_id: number;
  subcategory_id: number | null;
  brand: BrandType;
  category: CategoryType | null;
  images: ProductImageType[];
  variants: ProductVariantType[];
}

export interface ProductType extends BaseModel {
  items: ProductData[]
  total: number;
  page: number;
  pageSize: number;
}

// create product types
export interface ProductCustomField {
  label?: string;
  value?: string;
}

export interface ProductLocationShipping {
  name?: string;
  shippingCharge?: string | number;
}

export interface ProductVariant {
  name?: string;
  value?: string;
}

export interface CreateProductType extends BaseModel {
  name: string;
  sku: string;
  type: string;
  category_id: string;
  subcategory_id: string
  brand_id: string
  description: string;
  price: number;
  costPrice: number;
  mrp: number;
  salePrice: number;
  inventoryTracking: string;
  quantity: number;
  lowStock: number
  productAvailability: string;
  tradeNumber: string | number
  manufacturerNumber: string | number
  upcEan: string | number
  customFields: ProductCustomField[];
  freeShipping: boolean;
  shippingPrice?: number;
  locationBasedShipping: boolean;
  locationShipping: ProductLocationShipping[];
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string;
  productUrl: string;
  isPurchaseSpecifyDate: boolean;
  isLimitDate: boolean;
  dateFieldName: string;
  availableDate: Date; // ISO date string
  endDate: Date; // ISO date string
  productVariants: ProductVariant[];
  tags: string[];
  is_fragile?: boolean
  user_id?: number
  seller_id?: number
}
