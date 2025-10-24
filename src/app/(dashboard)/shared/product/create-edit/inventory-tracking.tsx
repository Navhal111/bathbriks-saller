'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'rizzui';
import { useCallback } from 'react';
import { dimensionFields } from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import { DimensionType } from '@/kit/hooks/data/dimensions';
import { PiPlusBold } from 'react-icons/pi';
import VariantRow from './varient-row';

interface InventoryTracingProps {
  DimensionsList?: DimensionType[];
  isDimensionsListLoading?: boolean;
  setLinkedProductMap?: any
}

export default function InventoryTracing({ DimensionsList = [], isDimensionsListLoading, setLinkedProductMap }: InventoryTracingProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const watchedProductVariants = watch('dimensions');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dimensions',
  });

  const addVariant = useCallback(() => append([...dimensionFields]), [append]);

  // Convert dimensions to select options
  const dimensionOptions = (DimensionsList || []).map((dimension: DimensionType) => ({
    label: dimension.name,
    value: (dimension.id || 0).toString(),
  }));

  return (
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
        <VariantRow
          key={item.id}
          index={index}
          item={item}
          remove={remove}
          dimensionOptions={dimensionOptions}
          register={register}
          control={control}
          errors={errors}
          watchedProductVariants={watchedProductVariants}
          setLinkedProductMap={setLinkedProductMap}
          fieldsLength={fields.length}
        />
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
  );
}

