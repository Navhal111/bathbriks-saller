'use client';

import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import cn from '@/utils/class-names';
import FormNav, { formParts } from '@/app/(dashboard)/shared/product/create-edit/form-nav';
import ProductSummary from '@/app/(dashboard)/shared/product/create-edit/product-summary';
import { defaultValues } from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import ProductMedia from '@/app/(dashboard)/shared/product/create-edit/product-media';
import PricingInventory from '@/app/(dashboard)/shared/product/create-edit/pricing-inventory';
import ProductIdentifiers from '@/app/(dashboard)/shared/product/create-edit/product-identifiers';
import ShippingInfo from '@/app/(dashboard)/shared/product/create-edit/shipping-info';
import ProductSeo from '@/app/(dashboard)/shared/product/create-edit/product-seo';
import DeliveryEvent from '@/app/(dashboard)/shared/product/create-edit/delivery-event';
import ProductVariants from '@/app/(dashboard)/shared/product/create-edit/product-variants';
import ProductTaxonomies from '@/app/(dashboard)/shared/product/create-edit/product-tags';
import FormFooter from '@/components/form-footer';
import { CreateProductInput, productFormSchema } from '@/validators/create-product.schema';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useGetAllCategoryList } from '@/kit/hooks/data/category';
import { CustomErrorType } from '@/kit/models/CustomError';
import { useCreateProduct, useUpdateProduct } from '@/kit/hooks/data/product';
import { CreateProductType } from '@/kit/models/Product';
import { useAuth } from '@/kit/hooks/useAuth';
import { useGetAllBrandList } from '@/kit/hooks/data/brand';
import { useGetAllSubCategoryList } from '@/kit/hooks/data/subCategory';
import KitShow from '@/kit/components/KitShow/KitShow';
import KitLoader from '@/kit/components/KitLoader/KitLoader';

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
  slug?: string;
  className?: string;
  product?: CreateProductType;
}

export default function CreateEditProduct({
  slug,
  product,
  className,
}: IndexProps) {
  const { user } = useAuth()
  const { layout } = useLayout();

  const { CategoryList, isCategoryListLoading } = useGetAllCategoryList({ page: 1, size: 10000 });
  const { SubCategoryList, isSubCategoryListLoading } = useGetAllSubCategoryList({ page: 1, size: 10000 });
  const { BrandList, isBrandListLoading } = useGetAllBrandList({ page: 1, size: 10000 });
  const { createProduct: onCreateProduct, isCreatingProduct } = useCreateProduct()
  const { update: onUpdateProduct, isUpdatingProduct } = useUpdateProduct(String(product?.id))

  const methods = useForm<CreateProductInput>({
    mode: 'onChange',
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });

  const isBtnLoading = isCreatingProduct || isUpdatingProduct

  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    const payload: Partial<CreateProductType> = {
      ...data,
      is_fragile: true,
      user_id: user?.id,
      seller_id: user?.id,
      // availableDate: data.availableDate?.toISOString() as unknown as Date,
      // endDate: data.endDate?.toISOString() as unknown as Date,
    };

    try {
      if (product) {
        await onUpdateProduct(payload)
        toast.success('Product updated successfully.')
      } else {
        await onCreateProduct(payload)
        toast.success('Product created successfully.')
      }
    } catch (error) {
      toast.error((error as CustomErrorType)?.message)
    }
  };

  return (
    <div className="@container">
      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      />
      <FormProvider {...methods}>
        <KitShow show={isCategoryListLoading || isBrandListLoading}>
          <div className='h-screen flex justify-center'>
            <KitLoader isLoading={true} />
          </div>
        </KitShow>
        <KitShow show={!isCategoryListLoading || !isBrandListLoading}>
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
              submitBtnText={slug ? 'Update Product' : 'Create Product'}
            />
          </form>
        </KitShow>
      </FormProvider>
    </div>
  );
}
