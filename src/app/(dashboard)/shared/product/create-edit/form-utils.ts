import { CreateProductInput } from '@/validators/create-product.schema';
import isEmpty from 'lodash/isEmpty';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productQuantity = [
  {
    quantity: '',
    price: '',
  },
];
export const productVariants = [
  {
    name: '',
    value: '',
  },
];

export function defaultValues(product?: CreateProductInput) {
  return {
    name: product?.name ?? '',
    sku: product?.sku ?? '',
    category_id: product?.category_id ?? '',
    subcategory_id: product?.subcategory_id ?? '',
    brand_id: product?.brand_id ?? '',
    description: product?.description ?? '',
    price: product?.price ?? undefined,
    costPrice: product?.costPrice ?? undefined,
    mrp: product?.mrp ?? undefined,
    salePrice: product?.salePrice ?? undefined,
    inventoryTracking: product?.inventoryTracking ?? '',
    // quantity: product?.quantity ?? '',
    // lowStock: product?.lowStock ?? '',
    quantity: product?.quantity !== undefined ? Number(product.quantity) : undefined,
    lowStock: product?.lowStock !== undefined ? Number(product.lowStock) : undefined,
    productAvailability: product?.productAvailability ?? '',
    productImages: product?.productImages ?? undefined,
    tradeNumber: product?.tradeNumber ?? '',
    manufacturerNumber: product?.manufacturerNumber ?? '',
    upcEan: product?.upcEan ?? '',
    customFields: isEmpty(product?.customFields)
      ? customFields
      : product?.customFields,

    freeShipping: product?.freeShipping ?? false,
    shippingPrice: product?.shippingPrice ?? undefined,
    locationBasedShipping: product?.locationBasedShipping ?? false,
    locationShipping: isEmpty(product?.locationShipping)
      ? locationShipping
      : product?.locationShipping,
    pageTitle: product?.pageTitle ?? '',
    metaDescription: product?.metaDescription ?? '',
    metaKeywords: product?.metaKeywords ?? '',
    productUrl: product?.productUrl ?? '',
    isPurchaseSpecifyDate: product?.isPurchaseSpecifyDate ?? false,
    isLimitDate: product?.isLimitDate ?? false,
    dateFieldName: product?.dateFieldName ?? '',
    availableDate: product?.availableDate ?? undefined,
    endDate: product?.endDate ?? undefined,
    productVariants: isEmpty(product?.productVariants)
      ? productVariants
      : product?.productVariants,
    tags: product?.tags ?? [],
  };
}

export const productData = {
  title: 'Apple',
  description: 'Fresh Express Iceberg Garden Salad Blend',
  sku: 'SKU-28935',
  type: 'Digital Product',
  categories: 'Grocery',
  price: 10,
  costPrice: 20,
  retailPrice: 15,
  salePrice: 25,
  productImages: undefined,
  inventoryTracking: 'no',
  currentStock: '150',
  lowStock: '20',
  productAvailability: 'online',
  tradeNumber: '12345',
  manufacturerNumber: '154',
  brand: 'Foska',
  upcEan: 'Ean',
  customFields: [
    {
      label: 'Color',
      value: 'Red',
    },
  ],
  freeShipping: false,
  shippingPrice: 45,
  locationBasedShipping: true,
  locationShipping: [
    {
      name: 'USA',
      shippingCharge: '150',
    },
  ],
  pageTitle: 'apple',
  metaDescription: 'apple',
  metaKeywords: 'grocery, foods',
  productUrl: 'http://localhost:3000/',
  isPurchaseSpecifyDate: true,
  isLimitDate: true,
  dateFieldName: 'Date Field',
  productVariants: [
    {
      name: 'Jhon',
      value: '150',
    },
  ],
  tags: ['iPhone', 'mobile'],
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// Category option
export const categoryOption = [
  {
    value: 'fruits',
    label: 'Fruits',
  },
  {
    value: 'grocery',
    label: 'Grocery',
  },
  {
    value: 'meat',
    label: 'Meat',
  },
  {
    value: 'cat food',
    label: 'Cat Food',
  },
];

// Variant option
export const variantOption = [
  {
    value: 'single',
    label: 'Single',
  },
  {
    value: 'multiple',
    label: 'Multiple',
  },
];

export const UOMOption = [
  {
    value: 'piece',
    label: 'Piece',
  },
  {
    value: 'kg',
    label: 'KG',
  },
  {
    value: 'dozen',
    label: 'Dozen',
  },
  {
    value: 'ton',
    label: 'Ton',
  },
];

export const PriceingTypeOption = [
  {
    value: 'saleBasePriceing',
    label: 'Sale base priceing',
  },
  {
    value: 'productBasePriceing',
    label: 'Product Base Priceing',
  },
];

export enum PriceingType {
  SALEBASEPRICEING = "saleBasePriceing",
  PRODUCTBASEPRICING = "productBasePriceing",
}
