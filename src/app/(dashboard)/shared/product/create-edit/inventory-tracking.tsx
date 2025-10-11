'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input, Button, ActionIcon } from 'rizzui';
import { useCallback } from 'react';
import {
  productVariants,
} from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import TrashIcon from '@/components/icons/trash';
import { PiPlusBold } from 'react-icons/pi';

export default function InventoryTracing() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productVariants',
  });

  const addVariant = useCallback(() => append([...productVariants]), [append]);

  return (
    <>
      <Input
        type="number"
        label="Quantity"
        placeholder="150"
        {...register('quantity')}
        error={errors.quantity?.message as string}
      />
      <Input
        type="number"
        label="Low Stock Level"
        placeholder="20"
        {...register('lowStock')}
        error={errors.lowStock?.message as string}
      />
      <Input
        label="MRP"
        placeholder="10"
        {...register('mrp')}
        error={errors.mrp?.message as string}
        prefix={'₹'}
        type="number"
      />
      {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            label="Variant Name"
            placeholder="Variant name"
            {...register(`productVariants.${index}.name`)}
            error={(errors.productVariants as any)?.[index]?.name?.message}
          />
          <Input
            type="number"
            label="Variant Value"
            placeholder="150.00"
            className="flex-grow"
            prefix={'₹'}
            {...register(`productVariants.${index}.value`)}
            error={(errors.productVariants as any)?.[index]?.value?.message}
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
      >
        <PiPlusBold className="me-2 h-4 w-4" /> Add Variant
      </Button>
    </>
  );
}
