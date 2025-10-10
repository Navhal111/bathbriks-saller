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
        label="MRP"
        placeholder="10"
        {...register('mrp')}
        error={errors.mrp?.message as string}
        prefix={'₹'}
        type="number"
      />
      <Input
        label="B2C Sale Price"
        placeholder="15"
        {...register('b2bSalePrice')}
        error={errors.b2bSalePrice?.message as string}
        prefix={'₹'}
        type="number"
      />
      <Input
        label="B2B Sale Price"
        placeholder="10"
        {...register('b2cSalePrice')}
        error={errors.b2cSalePrice?.message as string}
        prefix={'₹'}
        type="number"
      />
    </>
  );
}
