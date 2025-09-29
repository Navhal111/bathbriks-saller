'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select, SelectOption } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/(dashboard)/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import QuillLoader from '@/components/loader/quill-loader';
import { useGetAllCategoryList } from '@/kit/hooks/data/category';
import { useMemo, useState } from 'react';
import { CategoryType } from '@/kit/models/Category';
import { BrandType } from '@/kit/models/Brand';
import { SubCategoryData } from '@/kit/models/SubCategory';
import KitWindowedSelect from '@/kit/components/KitWindowedSelect/KitWindowedSelect';
// const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
//   ssr: false,
//   loading: () => <SelectLoader />,
// });
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

interface ProductSummaryprops {
  className?: string
  categoryList: CategoryType[]
  BrandList: BrandType[]
  SubCategoryList: SubCategoryData[]
}

export default function ProductSummary({ className, categoryList, BrandList, SubCategoryList }: ProductSummaryprops) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | null>(null);

  const mainCategoryOptions = useMemo(() =>
    Array.isArray(categoryList)
      ? categoryList.map(cat => ({
        label: cat.name,
        value: String(cat.id),
      }))
      : [],
    [categoryList]
  );

  const filteredSubCategoryOptions = useMemo(() => {
    if (!selectedMainCategoryId) return [];
    return SubCategoryList.filter(sub => String(sub.category_id) === selectedMainCategoryId)
      .map(sub => ({
        label: sub.name,
        value: String(sub.id),
      }));
  }, [SubCategoryList, selectedMainCategoryId]);


  const brandListOptions = useMemo(() =>
    Array.isArray(BrandList)
      ? BrandList.map(brand => ({
        label: brand.name,
        value: String(brand.id),
      }))
      : [],
    [BrandList]
  );

  return (
    <FormGroup
      title="Summary"
      description="Edit your product description and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="Name"
        placeholder="Product name"
        {...register('name')}
        error={errors.name?.message as string}
      />
      <Input
        label="SKU"
        placeholder="Product sku"
        {...register('sku')}
        error={errors.sku?.message as string}
      />

      <Controller
        name="type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={typeOption}
            value={value}
            onChange={onChange}
            label="Product Type"
            error={errors?.type?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      />

      <Controller
        name="category_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={mainCategoryOptions}
            value={mainCategoryOptions.find(opt => String(opt.value) === value) || null}
            onChange={(selected: any) => {
              onChange(selected ?? null);
              setSelectedMainCategoryId(selected ?? null);
              setValue('subcategory_id', '');
            }}
            displayValue={(selected: SelectOption | null) => selected?.label || ''}
            label="Categories"
            error={errors?.category_id?.message as string}
            getOptionValue={(option) => option.value}
            dropdownClassName="h-auto"
          />
        )}
      />

      <Controller
        name="subcategory_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <KitWindowedSelect
            label="Sub categories"
            width="w-full"
            options={filteredSubCategoryOptions}
            value={value || null}
            onChange={(selected: any) => {
              onChange(selected?.value || "");
            }}
            error={errors?.subcategory_id && errors.subcategory_id.message as string}
            noOptionsMessage={() =>
              selectedMainCategoryId
                ? "No subcategories available"
                : "Please select main categories first"
            }
          />
        )}
      />

      <Controller
        name="brand_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label="Brand"
            options={brandListOptions}
            value={brandListOptions.find((opt) => String(opt.value) === value) || null}
            onChange={onChange}
            displayValue={(selected: SelectOption | null) => selected?.label || ''}
            error={errors?.brand_id?.message as string}
            getOptionValue={(option) => option.value}
            dropdownClassName="h-auto"
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Description"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
    </FormGroup>
  );
}
