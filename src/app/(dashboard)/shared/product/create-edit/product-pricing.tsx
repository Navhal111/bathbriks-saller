'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';

export default function ProductPricing() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Input
        type="number"
        label="Quantity (Stock)"
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
    </>
  );
}
