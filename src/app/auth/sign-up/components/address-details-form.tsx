'use client';

import { Input, Select, Textarea } from 'rizzui';
import { UseFormReturn } from 'react-hook-form';
import { AddressDetailsSchema } from '@/validators/sign-up.schema';

interface AddressDetailsFormProps {
    methods: UseFormReturn<AddressDetailsSchema>;
}

const countryTypeOptions = [
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
];

const stateTypeOptions = [
    { label: 'Gujarat', value: 'Gujarat' },
    { label: 'Maharashtra', value: 'Maharashtra' },
];

const cityTypeOptions = [
    { label: 'Ahmedabad', value: 'Ahmedabad' },
    { label: 'Mumbai', value: 'Mumbai' },
];

export default function AddressDetailsForm({ methods }: AddressDetailsFormProps) {
    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = methods;

    // Watch registered address fields
    const registeredCountry = watch('registeredAddress.country') ?? "";
    const registeredState = watch('registeredAddress.state') ?? "";
    const registeredCity = watch('registeredAddress.city') ?? "";

    // Watch warehouse address fields
    const warehouseCountry = watch('warehouseAddress.country') ?? "";
    const warehouseState = watch('warehouseAddress.state') ?? "";
    const warehouseCity = watch('warehouseAddress.city') ?? "";

    return (
        <div className="space-y-10">
            <div className="space-y-5">
                <h3 className="text-lg font-semibold">Registered Address</h3>
                <Textarea
                    size="lg"
                    label="Address Line 1 *"
                    placeholder="Enter registered address"
                    {...register('registeredAddress.addressLine1')}
                    error={errors.registeredAddress?.addressLine1?.message}
                    rows={3}
                />
                <Select
                    label="Country *"
                    options={countryTypeOptions}
                    value={countryTypeOptions.find(opt => opt.value === registeredCountry) ?? null}
                    // value={registeredCountry || ""}
                    onChange={(option) => setValue('registeredAddress.country', (option as { value: string })?.value ?? '', { shouldValidate: true })}
                    error={errors.registeredAddress?.country?.message}
                />
                <Select
                    label="State *"
                    options={stateTypeOptions}
                    value={stateTypeOptions.find(opt => opt.value === registeredState) ?? null}
                    // value={registeredState || ""}
                    onChange={(option) => setValue('registeredAddress.state', (option as { value: string }).value ?? '', { shouldValidate: true })}
                    error={errors.registeredAddress?.state?.message}
                />
                <Select
                    label="City *"
                    options={cityTypeOptions}
                    value={cityTypeOptions.find(opt => opt.value === registeredCity) ?? null}
                    // value={registeredCity || ""}
                    onChange={(option) => setValue('registeredAddress.city', (option as { value: string }).value ?? '', { shouldValidate: true })}
                    error={errors.registeredAddress?.city?.message}
                />
                <Input
                    type="text"
                    label="Postal Code *"
                    placeholder="Enter postal code"
                    {...register('registeredAddress.postalCode')}
                    error={errors.registeredAddress?.postalCode?.message}
                />
            </div>

            <div className="space-y-5">
                <h3 className="text-lg font-semibold">Warehouse Address</h3>
                <Textarea
                    size="lg"
                    label="Address Line 1 *"
                    placeholder="Enter warehouse address"
                    {...register('warehouseAddress.addressLine1')}
                    error={errors.warehouseAddress?.addressLine1?.message}
                    rows={3}
                />
                <Select
                    label="Country *"
                    options={countryTypeOptions}
                    value={countryTypeOptions.find(opt => opt.value === warehouseCountry) ?? null}
                    onChange={(option) => setValue('warehouseAddress.country', (option as { value: string }).value ?? '', { shouldValidate: true })}
                    error={errors.warehouseAddress?.country?.message}
                />
                <Select
                    label="State *"
                    options={stateTypeOptions}
                    value={stateTypeOptions.find(opt => opt.value === warehouseState) ?? null}
                    onChange={(option) => setValue('warehouseAddress.state', (option as { value: string }).value ?? '', { shouldValidate: true })}
                    error={errors.warehouseAddress?.state?.message}
                />
                <Select
                    label="City *"
                    options={cityTypeOptions}
                    value={cityTypeOptions.find(opt => opt.value === warehouseCity) ?? null}
                    onChange={(option) => setValue('warehouseAddress.city', (option as { value: string }).value ?? '', { shouldValidate: true })}
                    error={errors.warehouseAddress?.city?.message}
                />
                <Input
                    type="text"
                    label="Postal Code *"
                    placeholder="Enter postal code"
                    {...register('warehouseAddress.postalCode')}
                    error={errors.warehouseAddress?.postalCode?.message}
                />
            </div>
        </div>
    );
}
