'use client';

import FormGroup from '@/app/(dashboard)/shared/form-group';
import { Checkbox, Input } from 'rizzui';
import cn from '@/utils/class-names';
import { DatePicker } from '@/components/ui/datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect } from 'react';

export default function DeliveryEvent({ className }: { className?: string }) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const isPurchaseSpecifyDateCheckbox = watch('isPurchaseSpecifyDate')
  const isLimitDateCheckbox = watch('isLimitDate')

  useEffect(() => {
    if (!isPurchaseSpecifyDateCheckbox) {
      setValue('isLimitDate', false);
      setValue('dateFieldName', '');
      setValue('availableDate', undefined);
      setValue('endDate', undefined);
    }
  }, [isPurchaseSpecifyDateCheckbox, setValue]);

  useEffect(() => {
    if (!isLimitDateCheckbox) {
      setValue('availableDate', undefined);
      setValue('endDate', undefined);
    }
  }, [isLimitDateCheckbox, setValue]);

  return (
    <FormGroup
      title="Delivery / Event Date"
      description="Add delivery or vent Date here"
      className={cn(className)}
    >
      <Controller
        name="isPurchaseSpecifyDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, customers must specify a date to purchase this product"
            className="col-span-full"
          />
        )}
      />
      <KitShow show={isPurchaseSpecifyDateCheckbox}>
        <Input
          label="Date Field Name"
          placeholder="Date Field Name"
          className="col-span-full"
          {...register('dateFieldName')}
          error={errors.dateFieldName?.message as string}
        />
        <Controller
          name="isLimitDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              value={value}
              checked={value}
              onChange={onChange}
              label="I want to limit the date range"
              className="col-span-full"
            />
          )}
        />

        <KitShow show={isLimitDateCheckbox}>
          <Controller
            name="availableDate"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <DatePicker
                inputProps={{ label: 'Available date' }}
                placeholderText="Select Date"
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                minDate={new Date()}
                maxDate={watch("endDate") ? new Date(watch("endDate")!) : new Date(new Date().setMonth(new Date().getMonth() + 6))}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <DatePicker
                inputProps={{ label: 'End date' }}
                placeholderText="Select Date"
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                minDate={watch("availableDate") ? new Date(watch("availableDate")!) : new Date()}
              />
            )}
          />
        </KitShow>
      </KitShow>
    </FormGroup>
  );
}
