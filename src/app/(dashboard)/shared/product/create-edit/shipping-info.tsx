'use client';

import { useCallback, useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input, Switch, Button, ActionIcon } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/(dashboard)/shared/form-group';
import { locationShipping } from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import TrashIcon from '@/components/icons/trash';
import { PiPlusBold } from 'react-icons/pi';
import KitShow from '@/kit/components/KitShow/KitShow';

export default function ShippingInfo({ className }: { className?: string }) {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'locationShipping',
  });

  const addCustomField = useCallback(
    () => append([...locationShipping]),
    [append]
  );

  const freeShippingSwitch = watch('freeShipping')
  const locationBasedSwitch = watch('locationBasedShipping')

  useEffect(() => {
    if (freeShippingSwitch) {
      setValue('shippingPrice', 0);
    } else {
      setValue('shippingPrice', undefined);
    }
  }, [freeShippingSwitch, setValue]);

  useEffect(() => {
    if (!locationBasedSwitch) {
      setValue('locationShipping', locationShipping);
    }
  }, [locationBasedSwitch, setValue]);

  return (
    <FormGroup
      title="Shipping"
      description="Add your shipping info here"
      className={cn(className)}
    >
      <Controller
        name="freeShipping"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Switch
            label="Free Shipping"
            className="col-span-full"
            value={value}
            checked={value}
            onChange={onChange}
          />
        )}
      />

      <KitShow show={!freeShippingSwitch}>
        <Input
          label="Shipping Price"
          placeholder="150.00"
          {...register('shippingPrice')}
          error={errors.shippingPrice?.message as string}
          prefix={'₹'}
          type="number"
        />
      </KitShow>

      <Controller
        name="locationBasedShipping"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Switch
            label="Location Based Shipping"
            className="col-span-full"
            value={value}
            checked={value}
            onChange={onChange}
          />
        )}
      />

      <KitShow show={locationBasedSwitch}>
        {fields.map((item, index) => (
          <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
            <Input
              label="Location Name"
              placeholder="location name"
              className="flex-grow"
              error={(errors.locationShipping as any)?.[index]?.name?.message}
              {...register(`locationShipping.${index}.name`)}
            />
            <Input
              label="Shipping Charge"
              placeholder="150.00"
              className="flex-grow"
              error={(errors.locationShipping as any)?.[index]?.shippingCharge?.message}
              {...register(`locationShipping.${index}.shippingCharge`)}
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
          onClick={addCustomField}
          variant="outline"
          className="col-span-full ml-auto w-auto"
        >
          <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> Add Item
        </Button>
      </KitShow>
    </FormGroup>
  );
}
