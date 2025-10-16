'use client';

import FormGroup from '@/app/(dashboard)/shared/form-group';
import cn from '@/utils/class-names';
import { DatePicker } from '@/components/ui/datepicker';
import { Controller, useFormContext } from 'react-hook-form';

export default function DeliveryTime({ className }: { className?: string }) {
    const {
        control,
        watch,
        formState: { errors },
    } = useFormContext();

    return (
        <FormGroup
            title="Delivery Time"
            description="Add delivery time here"
            className={cn(className)}
        >
            <Controller
                name="minDeliveryTime"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <DatePicker
                        inputProps={{ label: 'Min Delivery Time' }}
                        placeholderText="Select Date"
                        dateFormat="dd/MM/yyyy"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        minDate={new Date()}
                        maxDate={watch("maxDeliveryTime") ? new Date(watch("maxDeliveryTime")!) : new Date(new Date().setMonth(new Date().getMonth() + 6))}
                    />
                )}
            />
            <Controller
                name="maxDeliveryTime"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <DatePicker
                        inputProps={{ label: 'Max Delivery Time' }}
                        placeholderText="Select Date"
                        dateFormat="dd/MM/yyyy"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        minDate={watch("minDeliveryTime") ? new Date(watch("minDeliveryTime")!) : new Date()}
                    />
                )}
            />
        </FormGroup>
    );
}
