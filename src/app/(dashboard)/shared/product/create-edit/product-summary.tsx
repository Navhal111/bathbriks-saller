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
// const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
//   ssr: false,
//   loading: () => <SelectLoader />,
// });
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className, categoryList, BrandList, SubCategoryList }: { className?: string, categoryList: CategoryType[], BrandList: BrandType[], SubCategoryList: SubCategoryData[]; }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  // const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | null>(null);
  // console.log("selectedMainCategoryId", selectedMainCategoryId)

  const mainCategoryOptions = useMemo(() =>
    Array.isArray(categoryList)
      ? categoryList.map(cat => ({
        label: cat.name,
        value: String(cat.id),
      }))
      : [],
    [categoryList]
  );

  const subCategoryOptions = useMemo(() =>
    Array.isArray(SubCategoryList)
      ? SubCategoryList.map(cat => ({
        label: cat.name,
        value: String(cat.id),
      }))
      : [],
    [SubCategoryList]
  );

  // const filteredSubCategoryOptions = useMemo(() => {
  //   if (!selectedMainCategoryId) return [];
  //   return SubCategoryList.filter(sub => String(sub.category_id) === selectedMainCategoryId)
  //     .map(sub => ({
  //       label: sub.name,
  //       value: String(sub.id),
  //     }));
  // }, [SubCategoryList, selectedMainCategoryId]);


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
            // value={value}
            value={mainCategoryOptions.find((opt) => String(opt.value) === value) || null}
            onChange={onChange}
            displayValue={(selected: SelectOption | null) => selected?.label || ''}
            // onChange={(selected: any) => field.onChange(selected?.value ?? null)}
            label="Categories"
            error={errors?.category_id?.message as string}
            getOptionValue={(option) => option.value}
            dropdownClassName="h-auto"
          />
        )}
      />
      {/* <Controller
        name="category_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={mainCategoryOptions}
            value={mainCategoryOptions.find(opt => String(opt.value) === value) || null}
            onChange={(selected: any) => {
               console.log("selected raw:", selected);
              onChange(selected?.value ?? null);
              setSelectedMainCategoryId(selected?.value ?? null); // ✅ update state
            }}
            displayValue={(selected: SelectOption | null) => selected?.label || ''}
            label="Categories"
            error={errors?.category_id?.message as string}
            getOptionValue={(option) => option.value}
            dropdownClassName="h-auto"
          />
        )}
      /> */}

      <Controller
        name="subcategory_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label="Sub categories"
            options={subCategoryOptions}
            value={subCategoryOptions.find((opt) => String(opt.value) === value) || null}
            onChange={onChange}
            displayValue={(selected: SelectOption | null) => selected?.label || ''}
            error={errors?.subcategory_id?.message as string}
            getOptionValue={(option) => option.value}
            dropdownClassName="h-auto"
          />
        )}
      />

      {/* <Controller
        name="subcategory_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label="Sub categories"
            options={filteredSubCategoryOptions}
            value={filteredSubCategoryOptions.find(opt => String(opt.value) === value) || null}
            onChange={onChange}
            displayValue={(selected: SelectOption | null) => selected?.label || ''}
            error={errors?.subcategory_id?.message as string}
            getOptionValue={(option) => option.value}
            dropdownClassName="h-auto"
          />
        )}
      />
      {filteredSubCategoryOptions.length === 0 && (
        <div className="text-xs text-gray-500 mt-1">
          {selectedMainCategoryId
            ? "No subcategories available"
            : "Please select a main category first"}
        </div>
      )} */}


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
