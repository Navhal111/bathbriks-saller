'use client';

import { Input, Select, Textarea } from 'rizzui';
import { UseFormReturn } from 'react-hook-form';
import { AddressDetailsSchema } from '@/validators/sign-up.schema';
import { useMemo } from 'react';
import { Country, locationData, State } from '@/app/(dashboard)/profile-settings/address-details/page';

interface AddressDetailsFormProps {
    methods: UseFormReturn<AddressDetailsSchema>;
}

export default function AddressDetailsForm({ methods }: AddressDetailsFormProps) {
    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = methods;

    // Watch registered address fields
    const registeredCountry = watch('registeredAddress.country') as Country;
    const registeredState = watch('registeredAddress.state') as State;
    const registeredCity = watch('registeredAddress.city');

    // Watch warehouse address fields
    const warehouseCountry = watch('warehouseAddress.country') as Country;
    const warehouseState = watch('warehouseAddress.state') as State;
    const warehouseCity = watch('warehouseAddress.city');

    const countryTypeOptions = Object.keys(locationData).map(country => ({
        label: country,
        value: country,
    }));

    const stateOptions = useMemo(() => {
        if (!registeredCountry) return [];
        return Object.keys(locationData[registeredCountry]).map(state => ({
            label: state,
            value: state,
        }));
    }, [registeredCountry]);

    const cityOptions = useMemo(() => {
        if (!registeredCountry || !registeredState) return [];
        const cities = locationData[registeredCountry][registeredState] as string[];

        return cities.map((city: string) => ({
            label: city,
            value: city,
        }));
    }, [registeredCountry, registeredState]);

    const warehouseStateOptions = useMemo(() => {
        if (!warehouseCountry || !locationData[warehouseCountry]) return [];
        return Object.keys(locationData[warehouseCountry]).map(state => ({
            label: state,
            value: state,
        }));
    }, [warehouseCountry]);

    const warehouseCityOptions = useMemo(() => {
        if (!warehouseCountry || !warehouseState) return [];
        const cities = locationData[warehouseCountry][warehouseState] as string[];

        return cities.map((city: string) => ({
            label: city,
            value: city,
        }));
    }, [warehouseCountry, warehouseState]);

    const isStateDisabled = !registeredCountry;
    const isCityDisabled = !registeredState;
    const isWarehouseStateDisabled = !warehouseCountry;
    const isWarehouseCityDisabled = !warehouseState;


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
                    onChange={(option) => {
                        const value = (option as { value: string }).value;
                        setValue('registeredAddress.country', value, { shouldValidate: true });
                        setValue('registeredAddress.state', '');
                        setValue('registeredAddress.city', '');
                    }}
                    error={errors.registeredAddress?.country?.message}
                />
                <Select
                    label="State *"
                    options={stateOptions}
                    value={stateOptions.find(opt => opt.value === registeredState) ?? null}
                    onChange={(option) => {
                        const value = (option as { value: string }).value;
                        setValue('registeredAddress.state', value, { shouldValidate: true });
                        setValue('registeredAddress.city', '');
                    }}
                    error={errors.registeredAddress?.state?.message}
                    disabled={isStateDisabled}
                />
                <Select
                    label="City *"
                    options={cityOptions}
                    value={cityOptions.find(opt => opt.value === registeredCity) ?? null}
                    onChange={(option) => {
                        const value = (option as { value: string }).value;
                        setValue('registeredAddress.city', value, { shouldValidate: true });
                    }}
                    error={errors.registeredAddress?.city?.message}
                    disabled={isCityDisabled}
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
                    onChange={(option) => {
                        const value = (option as { value: string }).value;
                        setValue('warehouseAddress.country', value, { shouldValidate: true });
                        setValue('warehouseAddress.state', '');
                        setValue('warehouseAddress.city', '');
                    }}
                    error={errors.warehouseAddress?.country?.message}
                />
                <Select
                    label="State *"
                    options={warehouseStateOptions}
                    value={warehouseStateOptions.find(opt => opt.value === warehouseState) ?? null}
                    onChange={(option) => {
                        const value = (option as { value: string }).value;
                        setValue('warehouseAddress.state', value, { shouldValidate: true });
                        setValue('warehouseAddress.city', '');
                    }}
                    error={errors.warehouseAddress?.state?.message}
                    disabled={isWarehouseStateDisabled}
                />
                <Select
                    label="City *"
                    options={warehouseCityOptions}
                    value={warehouseCityOptions.find(opt => opt.value === warehouseCity) ?? null}
                    onChange={(option) => {
                        const value = (option as { value: string }).value;
                        setValue('warehouseAddress.city', value, { shouldValidate: true });
                    }}
                    error={errors.warehouseAddress?.city?.message}
                    disabled={isWarehouseCityDisabled}
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
