'use client';

import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { Input, Button, ActionIcon, Switch } from 'rizzui';
import { useCallback, useState, useEffect } from 'react';
import { Select, SelectOption } from 'rizzui/select';
import { productVariants } from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import { useSearchProductGroups, ProductGroupType } from '@/kit/hooks/data/productGroups';
import { DimensionType } from '@/kit/hooks/data/dimensions';
import TrashIcon from '@/components/icons/trash';
import { PiPlusBold } from 'react-icons/pi';

interface InventoryTracingProps {
  DimensionsList?: DimensionType[];
  isDimensionsListLoading?: boolean;
  productDetails?: any;
}

export default function InventoryTracing({ DimensionsList = [], isDimensionsListLoading, productDetails }: InventoryTracingProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  const isVariant = watch('isVariant');
  const groupName = watch('group_name');
  const watchedProductVariants = watch('productVariants');

  const { ProductGroupsList, isProductGroupsListLoading } = useSearchProductGroups(
    searchQuery,
    isSearchEnabled && searchQuery.length > 0
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productVariants',
  });

  const addVariant = useCallback(() => append([...productVariants]), [append]);

  // Function to check if dimension is already selected
  const isDimensionAlreadySelected = (currentIndex: number, dimensionId: string) => {
    if (!dimensionId || !watchedProductVariants) return false;

    return watchedProductVariants.some((variant: any, index: number) =>
      index !== currentIndex && variant.dimension_id === dimensionId
    );
  };

  // Function to get error message for duplicate dimension
  const getDimensionErrorMessage = (currentIndex: number, dimensionId: string) => {
    if (isDimensionAlreadySelected(currentIndex, dimensionId)) {
      const dimensionName = dimensionOptions.find(opt => opt.value === dimensionId)?.label || 'Dimension';
      return `${dimensionName} is already selected. Please choose a different dimension.`;
    }
    return (errors.productVariants as any)?.[currentIndex]?.dimension_id?.message;
  };

  // Convert dimensions to select options
  const dimensionOptions = (DimensionsList || []).map((dimension: DimensionType) => ({
    label: dimension.name,
    value: (dimension.id || 0).toString(),
    dimension_name: dimension.name
  }));

  // Get filtered options for each variant (exclude already selected dimensions)
  const getFilteredDimensionOptions = (currentIndex: number) => {
    const selectedDimensionIds = (watchedProductVariants || [])
      .map((variant: any, index: number) =>
        index !== currentIndex ? variant?.dimension_id : null
      )
      .filter(Boolean);

    return dimensionOptions.filter(option =>
      !selectedDimensionIds.includes(option.value)
    );
  };

  // Convert product groups to select options
  const productGroupOptions = (ProductGroupsList?.data || []).map((group: ProductGroupType) => ({
    label: group.name,
    value: group.name,
    id: group.id,
  }));

  useEffect(() => {
    if (!isVariant) {
      setValue('productVariants', productVariants);
      setValue('group_name', '');
    }
  }, [isVariant, setValue]);

  // Initialize group_name and product_group_id from productVariantsGroup in edit mode
  useEffect(() => {
    if (productDetails?.productVariantsGroup?.product_group_name && !groupName) {
      setValue('group_name', productDetails.productVariantsGroup.product_group_name);
      if (productDetails.productVariantsGroup.product_group_id) {
        setValue('product_group_id', productDetails.productVariantsGroup.product_group_id);
      }
    }
  }, [productDetails, groupName, setValue]);

  return (
    <>
      {/* Variant Options Toggle Switch */}
      <Controller
        name="isVariant"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Switch
            label="Is Variant?"
            className="col-span-full"
            value={value}
            checked={value}
            onChange={onChange}
          />
        )}
      />

      {/* Product Group Search - Only show when isVariant is true */}
      {isVariant && (
        <div className="col-span-full">
          <Controller
            name="group_name"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Product Group Name
                </label>
                <Input
                  placeholder="Search or enter product group name"
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);
                    setSearchQuery(value);
                    setIsSearchEnabled(true);
                  }}
                  className="w-full"
                  error={errors?.group_name?.message as string}
                />
                {/* Show dropdown suggestions if there are any */}
                {isSearchEnabled && searchQuery && productGroupOptions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                    {productGroupOptions.map((option: { label: string; value: string; id?: number }, index: number) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          field.onChange(option.value);
                          // Also set the product_group_id if available
                          if (option.id) {
                            setValue('product_group_id', option.id);
                          }
                          setSearchQuery('');
                          setIsSearchEnabled(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          />
        </div>
      )}

      {/* Variant Fields - Only show when isVariant is true */}
      {isVariant && (
        <>
          {fields.length > 1 && (
            <div className="col-span-full text-sm text-gray-600 mb-2">
              <span className="font-medium">Note:</span> Each variant must have a different dimension.
              {dimensionOptions.length > 0 && (
                <span> Available dimensions: {dimensionOptions.length}, Selected: {(watchedProductVariants || []).filter((v: any) => v?.dimension_id).length}</span>
              )}
            </div>
          )}
          {fields.map((item, index) => (
            <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
              <div className="flex-1">
                <Controller
                  name={`productVariants.${index}.dimension_id`}
                  control={control}
                  render={({ field }) => {
                    const selectedOption = dimensionOptions.find((opt) => opt.value === field.value?.toString()) || null;
                    const isDuplicate = isDimensionAlreadySelected(index, field.value);
                    const errorMessage = getDimensionErrorMessage(index, field.value);

                    const filteredOptions = getFilteredDimensionOptions(index);

                    return (
                      <Select
                        label="Dimension"
                        options={filteredOptions}
                        value={selectedOption}
                        onChange={(selected: SelectOption | null) => {
                          const newValue = selected?.value || '';
                          field.onChange(newValue);
                          // Also set the dimension name
                          setValue(`productVariants.${index}.dimension`, (selected as any)?.dimension_name || '');
                        }}
                        displayValue={(selected: SelectOption | null) => selected?.label || ''}
                        placeholder="Select dimension"
                        className="w-full"
                        error={errorMessage}
                      />
                    );
                  }}
                />
              </div>

              <Input
                label="Value"
                placeholder="Enter value"
                className="flex-grow"
                {...register(`productVariants.${index}.value`)}
                error={(errors.productVariants as any)?.[index]?.value?.message}
              />

              {/* Hidden field for dimension name */}
              <input
                type="hidden"
                {...register(`productVariants.${index}.dimension`)}
              />

              {/* Hidden field for product group name */}
              <input
                type="hidden"
                {...register(`productVariants.${index}.product_group_name`)}
                value={groupName}
              />

              {fields.length > 1 && (
                <ActionIcon
                  onClick={() => remove(index)}
                  variant="flat"
                  className="mt-7 shrink-0"
                >
                  <TrashIcon className="h-4 w-4" />
                </ActionIcon>
              )}
            </div>
          ))}

          <Button
            onClick={addVariant}
            variant="outline"
            className="col-span-full ml-auto w-auto"
            disabled={fields.length >= dimensionOptions.length}
            title={
              fields.length >= dimensionOptions.length
                ? "All available dimensions are already used"
                : "Add new variant"
            }
          >
            <PiPlusBold className="me-2 h-4 w-4" /> Add Variant
            {fields.length >= dimensionOptions.length && (
              <span className="ml-2 text-sm text-gray-500">
                (Max {dimensionOptions.length} variants)
              </span>
            )}
          </Button>
        </>
      )}
    </>
  );
}
