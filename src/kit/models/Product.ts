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
  status?: string;
}

export interface ProductType extends BaseModel {
  items: ProductData[]
  total: number;
  page: number;
  pageSize: number;
}

// create product types
export interface ProductCustomField {
  label: string;
  value: string;
}

export interface ProductLocationShipping {
  name: string;
  shippingCharge: number;
}

export interface ProductQuantity {
  quantity: number;
  price: number;
}

export interface ProductVariant {
  dimension?: string;
  dimension_id?: string | number;
  value?: string;
  product_group_name?: string;
  // Legacy fields for backward compatibility
  name?: string;
  id?: string;
  price?: number;
  sku?: string;
  stock?: number;
}

export interface MediaPayload {
  order: number;
  type: string;
  base64: string;
  name: string;
}

export interface CreateProductType extends BaseModel {
  name: string;
  sku: string;
  category_id: string;
  subcategory_id: string
  brand_id: string
  description: string;
  productUrl: MediaPayload[]
  priceingType: string
  uom: string
  mrp: number | undefined;
  b2bSalePrice: number | undefined;
  b2cSalePrice: number | undefined;
  isQuantityPrice: boolean
  quantityPrice: ProductQuantity[];
  quantity: number | undefined;
  lowStock: number | undefined
  minOrder: number | undefined
  maxOrder: number | undefined
  productAvailability: string;
  tradeNumber: string
  manufacturerNumber: string
  upcEan: string
  customFields: ProductCustomField[];
  freeShipping: boolean;
  shippingPrice?: number | undefined;
  locationBasedShipping: boolean;
  locationShipping: ProductLocationShipping[];
  minDeliveryTime?: string
  maxDeliveryTime?: string
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string;
  isPurchaseSpecifyDate: boolean;
  isLimitDate: boolean;
  dateFieldName: string;
  availableDate: string;
  endDate: string;
  productVariants: ProductVariant[];
  tags: string[];
  is_fragile?: boolean
  user_id?: number
  seller_id?: number
  isVariant?: boolean
  group_name?: string
  product_group_id?: number
  productVariantsGroup?: {
    product_group_id: number;
    product_group_name: string;
  }
}
