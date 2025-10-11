'use client';

import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { useForm, FormProvider } from 'react-hook-form';
import cn from '@/utils/class-names';
import FormNav, { formParts } from '@/app/(dashboard)/shared/product/create-edit/form-nav';
import ProductSummary from '@/app/(dashboard)/shared/product/create-edit/product-summary';
import { customFields, locationShipping, PriceingType, productQuantity, productVariants } from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import ProductMedia from '@/app/(dashboard)/shared/product/create-edit/product-media';
import PricingInventory from '@/app/(dashboard)/shared/product/create-edit/pricing-inventory';
import ProductIdentifiers from '@/app/(dashboard)/shared/product/create-edit/product-identifiers';
import ShippingInfo from '@/app/(dashboard)/shared/product/create-edit/shipping-info';
import ProductSeo from '@/app/(dashboard)/shared/product/create-edit/product-seo';
import DeliveryEvent from '@/app/(dashboard)/shared/product/create-edit/delivery-event';
import ProductTaxonomies from '@/app/(dashboard)/shared/product/create-edit/product-tags';
import FormFooter from '@/components/form-footer';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useGetAllCategoryList } from '@/kit/hooks/data/category';
import { CustomErrorType } from '@/kit/models/CustomError';
import { useCreateProduct, useUpdateMedia, useUpdateProduct } from '@/kit/hooks/data/product';
import { CreateProductType, ProductCustomField, ProductLocationShipping, ProductQuantity, ProductVariant } from '@/kit/models/Product';
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
import OrderQuantity from './order-quantity';
import DeliveryTime from './delivery-time';
import { useState } from 'react';
import { MediaType } from '@/kit/models/media';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.media]: ProductMedia,
  [formParts.pricingInventory]: PricingInventory,
  [formParts.orderQuantity]: OrderQuantity,
  [formParts.productIdentifiers]: ProductIdentifiers,
  [formParts.shipping]: ShippingInfo,
  [formParts.deliveryTime]: DeliveryTime,
  [formParts.seo]: ProductSeo,
  [formParts.deliveryEvent]: DeliveryEvent,
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
  productUrl: any[];
  priceingType: string
  uom: string
  isQuantityPrice: boolean
  quantityPrice: ProductQuantity[];
  mrp: number;
  b2bSalePrice: number;
  b2cSalePrice: number;
  quantity: number;
  lowStock: number;
  minOrder: number;
  maxOrder: number;
  productAvailability: string;
  tradeNumber?: string;
  manufacturerNumber?: string;
  upcEan?: string
  customFields?: ProductCustomField[];
  freeShipping?: boolean;
  shippingPrice?: number;
  locationBasedShipping?: boolean;
  locationShipping?: ProductLocationShipping[];
  minDeliveryTime?: string
  maxDeliveryTime?: string
  pageTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
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
  productUrl: yup
    .array()
    .min(1, messages.productURLIsRequired)
    .required(messages.productURLIsRequired),
  priceingType: yup.string().required(messages.brandIsRequired),
  uom: yup.string().required(messages.uomIsRequired),

  isQuantityPrice: yup.boolean().optional(),
  quantityPrice: yup.array().when('priceingType', {
    is: PriceingType.PRODUCTBASEPRICING,
    then: (schema) =>
      schema
        .of(
          yup.object({
            quantity: yup
              .number()
              .transform((val, originalVal) =>
                originalVal === '' || originalVal === null ? undefined : val
              )
              .required('Quantity is required')
              .min(1, 'Quantity must be at least 1'),
            price: yup
              .number()
              .transform((val, originalVal) =>
                originalVal === '' || originalVal === null ? undefined : val
              )
              .required('Price is required')
              .min(1, 'Price must be at least 1'),
          })
        )
        .min(1, 'At least one quantity price must be added')
        .required('Quantity price is required'),
    otherwise: (schema) => schema.notRequired().nullable().optional(),
  }),

  mrp: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.retailPriceIsRequired)
    .required(messages.retailPriceIsRequired)
    .min(1, messages.retailPriceIsRequired),

  b2bSalePrice: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.costPriceIsRequired)
    .when('priceingType', {
      is: PriceingType.SALEBASEPRICEING,
      then: schema => schema
        .required(messages.costPriceIsRequired)
        .min(1, messages.costPriceIsRequired)
        .test(
          'b2bSalePrice-less-than-mrp',
          'B2B Sale Price must be less than mrp',
          function (b2bSalePrice) {
            const { mrp } = this.parent;
            return typeof mrp === 'number' && typeof b2bSalePrice === 'number'
              ? b2bSalePrice < mrp
              : true;
          }
        ),
      otherwise: schema => schema.notRequired()
    }),

  b2cSalePrice: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.retailPriceIsRequired)
    .when('priceingType', {
      is: PriceingType.SALEBASEPRICEING,
      then: schema => schema
        .required(messages.retailPriceIsRequired)
        .min(1, messages.retailPriceIsRequired)
        .test(
          'b2cSalePrice-less-than-mrp',
          'B2C Sale Price must be less than mrp',
          function (b2cSalePrice) {
            const { mrp } = this.parent;
            return typeof mrp === 'number' && typeof b2cSalePrice === 'number'
              ? b2cSalePrice < mrp
              : true;
          }
        ),
      otherwise: schema => schema.notRequired()
    }),

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

  minOrder: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.minOrderIsRequired)
    .required(messages.minOrderIsRequired)
    .min(1, messages.minOrderIsRequired),
  maxOrder: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(messages.maxOrderIsRequired)
    .required(messages.maxOrderIsRequired)
    .min(1, messages.maxOrderIsRequired)
    .test(
      'maxOrder-not-less-than-minOrder',
      'Max order cannot be less than Min order',
      function (maxOrder) {
        const { minOrder } = this.parent;
        return typeof maxOrder === 'number' && typeof minOrder === 'number'
          ? maxOrder >= minOrder
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
  locationShipping: yup.array().when('locationBasedShipping', {
    is: true,
    then: (schema) =>
      schema.of(
        yup.object({
          name: yup
            .string()
            .transform((val) => (val === '' ? undefined : val))
            .required('Location name is required'),
          shippingCharge: yup
            .number()
            .transform((val, originalVal) => {
              if (originalVal === '' || originalVal === null) return undefined;
              return val;
            })
            .typeError('Shipping charge must be a number')
            .required('Shipping charge is required')
            .min(1, 'Shipping charge must be at least 1'),
        })
      )
        .min(1, 'At least one location must be added')
        .required('Location shipping is required'),
    otherwise: (schema) => schema.notRequired().nullable().optional(),
  }),

  minDeliveryTime: yup.string().optional(),
  maxDeliveryTime: yup.string().optional(),

  pageTitle: yup.string().optional(),
  metaDescription: yup.string().optional(),
  metaKeywords: yup.string().optional(),

  isPurchaseSpecifyDate: yup.boolean().optional(),
  isLimitDate: yup.boolean().optional(),
  dateFieldName: yup.string().optional(),

  availableDate: yup.string().optional(),
  endDate: yup.string().optional(),

  productVariants: yup.array(
    yup.object({
      name: yup.string().nullable(),
      value: yup.string().nullable(),
    })
  ).nullable(),

  tags: yup.array(yup.string()).optional(),
  is_fragile: yup.boolean().optional(),
  user_id: yup.number().optional(),
  seller_id: yup.number().optional(),
})

export default function CreateEditProduct({ className, productDetails, productLoading }: IndexProps) {
  const { user } = useAuth()
  const { layout } = useLayout();
  const router = useRouter()

  const initialproductUrl = productDetails?.productUrl ?? []
  const [files, setFiles] = useState<any[]>(initialproductUrl);
  console.log("filessdasd", files)

  const { CategoryList, isCategoryListLoading } = useGetAllCategoryList({ page: 1, size: 10000 });
  const { SubCategoryList, isSubCategoryListLoading } = useGetAllSubCategoryList({ page: 1, size: 10000 });
  const { BrandList, isBrandListLoading } = useGetAllBrandList({ page: 1, size: 10000 });
  const { createProduct: onCreateProduct, isCreatingProduct } = useCreateProduct()
  const { update: onUpdateProduct, isUpdatingProduct } = useUpdateProduct()
  const { update: onUpdateMedia, isUpdatingMedia } = useUpdateMedia(String(productDetails?.id))

  const defaultValues: FormData = {
    name: productDetails?.name || '',
    sku: productDetails?.sku || '',
    category_id: String(productDetails?.category_id || ''),
    subcategory_id: String(productDetails?.subcategory_id || ''),
    brand_id: String(productDetails?.brand_id || ''),
    description: productDetails?.description || '',
    productUrl: productDetails?.productUrl || [],
    priceingType: productDetails?.isQuantityPrice ? PriceingType.PRODUCTBASEPRICING : PriceingType.SALEBASEPRICEING,
    uom: productDetails?.uom || '',
    isQuantityPrice: productDetails?.isQuantityPrice || false,
    quantityPrice: productDetails?.quantityPrice ? productDetails?.quantityPrice : productQuantity,
    mrp: productDetails?.mrp || '',
    b2bSalePrice: productDetails?.b2bSalePrice || '',
    b2cSalePrice: productDetails?.b2cSalePrice || '',
    quantity: productDetails?.quantity || '',
    lowStock: productDetails?.lowStock || '',
    minOrder: productDetails?.minOrder || '',
    maxOrder: productDetails?.maxOrder || '',
    productAvailability: productDetails?.productAvailability || '',
    tradeNumber: productDetails?.tradeNumber || '',
    manufacturerNumber: productDetails?.manufacturerNumber || '',
    upcEan: productDetails?.upcEan || '',
    customFields: productDetails?.customFields ? productDetails?.customFields : customFields,
    freeShipping: productDetails?.freeShipping || false,
    shippingPrice: productDetails?.shippingPrice ?? undefined,
    locationBasedShipping: productDetails?.locationBasedShipping || false,
    locationShipping: productDetails?.locationShipping ? productDetails?.locationShipping : locationShipping,
    minDeliveryTime: productDetails?.minDeliveryTime ? productDetails.minDeliveryTime : "",
    maxDeliveryTime: productDetails?.maxDeliveryTime ? productDetails.maxDeliveryTime : "",
    pageTitle: productDetails?.pageTitle || '',
    metaDescription: productDetails?.metaDescription || '',
    metaKeywords: productDetails?.metaKeywords || '',
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
    context: {
      priceingType: defaultValues?.priceingType
    }
  });

  const isBtnLoading = isCreatingProduct || isUpdatingProduct

  const handleSubmitWithMedia = async () => {

    const filePayloads = await Promise.all(
      files.map((file: File, index: number) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];

            const mediaCategory = file.type.startsWith('image/')
              ? 'image'
              : file.type.startsWith('video/')
                ? 'video'
                : 'other';

            resolve({
              order: index + 1,
              type: mediaCategory,
              base64,
              filename: file.name,
            });
          };

          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
    console.log("filePayloads", filePayloads)

    if (productDetails) {
      try {
        await onUpdateMedia(filePayloads as Partial<MediaType>);
      } catch (error) {
        toast.error((error as CustomErrorType)?.message);
        throw error;
      }
    } else {
      methods.setValue('productUrl', filePayloads);
    }
    console.log("filePayloads", filePayloads)

    methods.handleSubmit(handleValidSubmit)();
  };

  const handleValidSubmit = async (data: any) => {
    const payload: Partial<CreateProductType> = {
      ...(productDetails && { id: productDetails.id }),
      is_fragile: true,
      user_id: user?.id,
      seller_id: user?.id,
      name: data.name,
      sku: data.sku,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id,
      brand_id: data.brand_id,
      description: data?.description || '',
      productUrl: data.productUrl,
      uom: data.uom,
      isQuantityPrice: data?.isQuantityPrice,
      ...(data.priceingType === PriceingType.PRODUCTBASEPRICING && {
        quantityPrice: data.quantityPrice
      }),
      ...(data.priceingType === PriceingType.SALEBASEPRICEING && {
        b2bSalePrice: data.b2bSalePrice,
        b2cSalePrice: data.b2cSalePrice,
      }),
      mrp: data.mrp,
      quantity: data.quantity,
      lowStock: data.lowStock,
      productVariants:
        Array.isArray(data.productVariants) &&
          data.productVariants.some((v: any) => v.name && v.value)
          ? data.productVariants.filter((v: any) => v.name && v.value)
          : [],
      productAvailability: data.productAvailability,
      minOrder: data.minOrder,
      maxOrder: data.maxOrder,
      tradeNumber: data?.tradeNumber || '',
      manufacturerNumber: data?.manufacturerNumber || '',
      upcEan: data?.upcEan || '',
      customFields:
        Array.isArray(data.customFields) &&
          data.customFields.some((f: any) => f.label && f.value)
          ? data.customFields.filter((f: any) => f.label && f.value)
          : [],
      freeShipping: data?.freeShipping || false,
      shippingPrice: data?.shippingPrice ?? undefined,
      locationBasedShipping: data?.locationBasedShipping || false,
      locationShipping:
        Array.isArray(data.locationShipping) &&
          data.locationShipping.some((loc: any) => loc.name && loc.shippingCharge)
          ? data.locationShipping.filter((loc: any) => loc.name && loc.shippingCharge)
          : [],
      minDeliveryTime: data?.minDeliveryTime ? data.minDeliveryTime : "",
      maxDeliveryTime: data?.maxDeliveryTime ? data.maxDeliveryTime : "",
      pageTitle: data?.pageTitle || '',
      metaDescription: data?.metaDescription || '',
      metaKeywords: data?.metaKeywords || '',
      isPurchaseSpecifyDate: data?.isPurchaseSpecifyDate || false,
      isLimitDate: data?.isLimitDate || false,
      dateFieldName: data?.dateFieldName || '',
      availableDate: data?.availableDate ? data.availableDate : '',
      endDate: data?.endDate ? data.endDate : '',
      tags: data?.tags || [],
    };
    console.log("payload", payload)

    try {
      if (productDetails) {
        await onUpdateProduct(payload);
        toast.success('Product updated successfully.');
      } else {
        await onCreateProduct(payload);
        toast.success('Product created successfully.');
      }
      router.push('/products');
    } catch (error) {
      toast.error((error as CustomErrorType)?.message);
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
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitWithMedia();
            }}
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
                    files={files}
                    setFiles={setFiles}
                    isUpdatingMedia={isUpdatingMedia}
                    isSubCategoryListLoading={isSubCategoryListLoading}
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
