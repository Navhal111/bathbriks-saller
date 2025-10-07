'use client';

import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { useForm, FormProvider } from 'react-hook-form';
import cn from '@/utils/class-names';
import FormNav, { formParts } from '@/app/(dashboard)/shared/product/create-edit/form-nav';
import ProductSummary from '@/app/(dashboard)/shared/product/create-edit/product-summary';
import { customFields, defaultValues, locationShipping, productVariants } from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import ProductMedia from '@/app/(dashboard)/shared/product/create-edit/product-media';
import PricingInventory from '@/app/(dashboard)/shared/product/create-edit/pricing-inventory';
import ProductIdentifiers from '@/app/(dashboard)/shared/product/create-edit/product-identifiers';
import ShippingInfo from '@/app/(dashboard)/shared/product/create-edit/shipping-info';
import ProductSeo from '@/app/(dashboard)/shared/product/create-edit/product-seo';
import DeliveryEvent from '@/app/(dashboard)/shared/product/create-edit/delivery-event';
import ProductVariants from '@/app/(dashboard)/shared/product/create-edit/product-variants';
import ProductTaxonomies from '@/app/(dashboard)/shared/product/create-edit/product-tags';
import FormFooter from '@/components/form-footer';
// import { CreateProductInput, productFormSchema } from '@/validators/create-product.schema';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useGetAllCategoryList } from '@/kit/hooks/data/category';
import { CustomErrorType } from '@/kit/models/CustomError';
import { useCreateProduct, useUpdateProduct } from '@/kit/hooks/data/product';
import { CreateProductType, ProductCustomField, ProductLocationShipping, ProductVariant } from '@/kit/models/Product';
import { useAuth } from '@/kit/hooks/useAuth';
import { useGetAllBrandList } from '@/kit/hooks/data/brand';
import { useGetAllSubCategoryList } from '@/kit/hooks/data/subCategory';
import KitShow from '@/kit/components/KitShow/KitShow';
import KitLoader from '@/kit/components/KitLoader/KitLoader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as yup from 'yup';
import { messages } from '@/config/messages';
import { yupResolver } from '@hookform/resolvers/yup';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.media]: ProductMedia,
  [formParts.pricingInventory]: PricingInventory,
  [formParts.productIdentifiers]: ProductIdentifiers,
  [formParts.shipping]: ShippingInfo,
  [formParts.seo]: ProductSeo,
  [formParts.deliveryEvent]: DeliveryEvent,
  [formParts.variantOptions]: ProductVariants,
  [formParts.tagsAndCategory]: ProductTaxonomies,
};

interface IndexProps {
  className?: string;
  productDetails?: CreateProductType;
  productLoading?: boolean
}

interface FormData {
  name: string;
  sku: string;
  category_id: string;
  subcategory_id: string
  brand_id: string
  description?: string;
  productImages?: any[];
  price: number;
  costPrice: number;
  mrp: number;
  salePrice: number;
  inventoryTracking?: string;
  quantity: number;
  lowStock: number
  productAvailability: string;
  tradeNumber?: string;
  manufacturerNumber?: string;
  upcEan?: string
  customFields?: ProductCustomField[];
  freeShipping?: boolean;
  shippingPrice?: number;
  locationBasedShipping?: boolean;
  locationShipping?: ProductLocationShipping[];
  pageTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  productUrl?: string;
  isPurchaseSpecifyDate?: boolean;
  isLimitDate?: boolean;
  dateFieldName?: string;
  availableDate?: string;
  endDate?: string;
  productVariants?: ProductVariant[];
  tags?: string[];
  is_fragile?: boolean
  user_id?: number
  seller_id?: number
}

// type FormData = InferType<typeof productFormSchema>;

const productFormSchema = yup.object({
  name: yup.string().required(messages.productNameIsRequired),
  sku: yup.string().required(messages.skuIsRequired),
  category_id: yup.string().required(messages.categoryIsRequired),
  subcategory_id: yup.string().required(messages.subCategoryIsRequired),
  brand_id: yup.string().required(messages.brandIsRequired),
  description: yup.string().optional(),
  productImages: yup.array().optional(),

  price: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.priceIsRequired)
    .required(messages.priceIsRequired)
    .min(1, messages.priceIsRequired),

  costPrice: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.costPriceIsRequired)
    .required(messages.costPriceIsRequired)
    .min(1, messages.costPriceIsRequired)
    .test(
      'costPrice-less-than-price',
      'Cost price must be less than price',
      function (costPrice) {
        const { price } = this.parent;
        if (typeof price !== 'number' || typeof costPrice !== "number") return true;
        return costPrice < price;
      }
    ),

  mrp: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.retailPriceIsRequired)
    .required(messages.retailPriceIsRequired)
    .min(1, messages.retailPriceIsRequired)
    .test(
      'mrp-less-than-price',
      'Retail price must be less than price',
      function (mrp) {
        const { price } = this.parent;
        if (typeof price !== 'number' || typeof mrp !== "number") return true;
        return mrp < price;
      }
    ),

  salePrice: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.salePriceIsRequired)
    .required(messages.salePriceIsRequired)
    .min(1, messages.salePriceIsRequired)
    .test(
      'salePrice-less-than-price',
      'Sale price must be less than price',
      function (salePrice) {
        const { price } = this.parent;
        if (typeof price !== 'number' || typeof salePrice !== "number") return true;
        return salePrice < price;
      }
    )
    .test(
      'salePrice-less-than-mrp',
      'Sale price must be less than retail price',
      function (salePrice) {
        const { mrp } = this.parent;
        if (typeof mrp !== 'number' || typeof salePrice !== "number") return true;
        return salePrice < mrp;
      }
    ),

  inventoryTracking: yup.string().optional(),

  quantity: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.currentStockIsRequired)
    .required(messages.currentStockIsRequired)
    .min(1, messages.currentStockIsRequired),
  lowStock: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.lowStockIsRequired)
    .required(messages.lowStockIsRequired)
    .min(1, messages.lowStockIsRequired)
    .test(
      'lowStock-not-greater',
      'Low stock cannot be greater than quantity',
      function (lowStock) {
        const { quantity } = this.parent;
        return typeof lowStock === 'number' && typeof quantity === 'number'
          ? lowStock <= quantity
          : true;
      }
    ),

  productAvailability: yup.string().required(messages.productAvailabilityIsRequired),

  tradeNumber: yup.mixed().optional(),
  manufacturerNumber: yup.mixed().optional(),
  upcEan: yup.mixed().optional(),

  customFields: yup.array(
    yup.object({
      label: yup.string().optional(),
      value: yup.string().optional(),
    })
  ).optional(),

  freeShipping: yup.boolean().optional(),
  shippingPrice: yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .optional()
    .when('freeShipping', {
      is: (val: boolean | null | undefined) => val === false,
      then: schema =>
        schema
          .required('Shipping price is required'),
      otherwise: schema => schema.notRequired(),
    }),

  locationBasedShipping: yup.boolean().optional(),
  locationShipping: yup.array()
    .of(
      yup.object({
        name: yup
          .string()
          .transform(val => (val === '' ? undefined : val))
          .required('Location name is required'),
        shippingCharge: yup
          .number()
          .transform((val, originalVal) => (originalVal === '' ? undefined : val))
          .typeError('Shipping charge must be a number')
          .required('Shipping charge is required')
          .min(1, 'Shipping charge must be at least 1'),
      })
    )
    .when('locationBasedShipping', {
      is: true,
      then: schema =>
        schema.min(1, 'At least one location must be added').required('Location shipping is required'),
      otherwise: schema => schema.notRequired().optional(),
    }),

  pageTitle: yup.string().optional(),
  metaDescription: yup.string().optional(),
  metaKeywords: yup.string().optional(),
  productUrl: yup.string().optional(),

  isPurchaseSpecifyDate: yup.boolean().optional(),
  isLimitDate: yup.boolean().optional(),
  dateFieldName: yup.string().optional(),

  availableDate: yup.string().optional(),
  endDate: yup.string().optional(),

  productVariants: yup.array(
    yup.object({
      name: yup.string().optional(),
      value: yup.string().optional(),
    })
  ).optional(),

  tags: yup.array(yup.string()).optional(),
  is_fragile: yup.boolean().optional(),
  user_id: yup.number().optional(),
  seller_id: yup.number().optional(),
})

export default function CreateEditProduct({ className, productDetails, productLoading }: IndexProps) {
  console.log("productDetails", productDetails)
  const { user } = useAuth()
  const { layout } = useLayout();
  const router = useRouter()

  const { CategoryList, isCategoryListLoading } = useGetAllCategoryList({ page: 1, size: 10000 });
  const { SubCategoryList, isSubCategoryListLoading } = useGetAllSubCategoryList({ page: 1, size: 10000 });
  const { BrandList, isBrandListLoading } = useGetAllBrandList({ page: 1, size: 10000 });
  const { createProduct: onCreateProduct, isCreatingProduct } = useCreateProduct()
  const { update: onUpdateProduct, isUpdatingProduct } = useUpdateProduct()

  const defaultValues: FormData = {
    name: productDetails?.name || '',
    sku: productDetails?.sku || '',
    category_id: String(productDetails?.category_id || ''),
    subcategory_id: String(productDetails?.subcategory_id || ''),
    brand_id: String(productDetails?.brand_id || ''),
    description: productDetails?.description || '',
    productImages: [],
    price: productDetails?.price || '',
    costPrice: productDetails?.costPrice || '',
    mrp: productDetails?.mrp || '',
    salePrice: productDetails?.salePrice || '',
    inventoryTracking: productDetails?.inventoryTracking || '',
    quantity: productDetails?.quantity || '',
    lowStock: productDetails?.lowStock || '',
    productAvailability: productDetails?.productAvailability || '',
    tradeNumber: productDetails?.tradeNumber || '',
    manufacturerNumber: productDetails?.manufacturerNumber || '',
    upcEan: productDetails?.upcEan || '',
    customFields: productDetails?.customFields ? productDetails?.customFields : customFields,
    freeShipping: productDetails?.freeShipping || false,
    shippingPrice: productDetails?.shippingPrice ?? undefined,
    locationBasedShipping: productDetails?.locationBasedShipping || false,
    locationShipping: productDetails?.locationShipping ? productDetails?.locationShipping : locationShipping,
    pageTitle: productDetails?.pageTitle || '',
    metaDescription: productDetails?.metaDescription || '',
    metaKeywords: productDetails?.metaKeywords || '',
    productUrl: productDetails?.productUrl || '',
    isPurchaseSpecifyDate: productDetails?.isPurchaseSpecifyDate || false,
    isLimitDate: productDetails?.isLimitDate || false,
    dateFieldName: productDetails?.dateFieldName || '',
    availableDate: productDetails?.availableDate ? productDetails.availableDate : '',
    endDate: productDetails?.endDate ? productDetails.endDate : '',
    productVariants: Array.isArray(productDetails?.productVariants)
      ? productDetails.productVariants
        .filter(item => typeof item?.sku === 'string' && item.sku.includes('-'))
        .map(item => ({
          name: item.sku.split('-')[1],
          value: item.stock ?? '',
        }))
      : productVariants,
    tags: productDetails?.tags || [],
  } as unknown as FormData;;

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(productFormSchema),
    defaultValues,
  });

  const isBtnLoading = isCreatingProduct || isUpdatingProduct

  const onSubmit = async (data: any) => {
    const { productImages, ...rest } = data;
    const payload: Partial<CreateProductType> = {
      ...rest,
      is_fragile: true,
      user_id: user?.id,
      seller_id: user?.id,
      productUrl: [],
      ...(productDetails && { id: productDetails.id })
    };

    try {
      if (productDetails) {
        await onUpdateProduct(payload)
        toast.success('Product updated successfully.')
      } else {
        await onCreateProduct(payload)
        toast.success('Product created successfully.')
      }
      router.push('/products')
    } catch (error) {
      toast.error((error as CustomErrorType)?.message)
    }
  };

  useEffect(() => {
    if (!productDetails) return;
    methods.reset(defaultValues)
  }, [productDetails]);

  return (
    <div className="@container">
      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      />
      <FormProvider {...methods}>
        <KitShow show={isCategoryListLoading || isBrandListLoading || !!productLoading}>
          <div className='h-screen flex justify-center'>
            <KitLoader isLoading={true} />
          </div>
        </KitShow>
        <KitShow show={!isCategoryListLoading || !isBrandListLoading || !productLoading}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={cn(
              'relative z-[19] [&_label.block>span]:font-medium',
              className
            )}
          >
            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
                <Element
                  key={key}
                  name={formParts[key as keyof typeof formParts]}
                >
                  {<Component
                    className="pt-7 @2xl:pt-9 @3xl:pt-11"
                    categoryList={CategoryList?.data ?? []}
                    SubCategoryList={SubCategoryList?.data?.items ?? []}
                    BrandList={BrandList?.data ?? []}
                  />}
                </Element>
              ))}
            </div>

            <FormFooter
              isLoading={isBtnLoading}
              submitBtnText={productDetails ? 'Update Product' : 'Create Product'}
            />
          </form>
        </KitShow>
      </FormProvider>
    </div>
  );
}
