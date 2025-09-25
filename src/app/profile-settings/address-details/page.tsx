"use client";

import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { Text, Input, Select } from "rizzui";
import FormGroup from "@/app/shared/form-group";
import FormFooter from "@/components/form-footer";
import { useEffect, useMemo } from "react";
import KitShow from "@/kit/components/KitShow/KitShow";
import KitLoader from "@/kit/components/KitLoader/KitLoader";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from "@/kit/hooks/useAuth";

export const locationData = {
    India: {
        Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
        Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
        Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
    },
    USA: {
        California: ['Los Angeles', 'San Francisco', 'San Diego'],
        Texas: ['Houston', 'Dallas', 'Austin'],
        NewYork: ['New York City', 'Buffalo', 'Albany'],
    },
    Canada: {
        Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
        BritishColumbia: ['Vancouver', 'Victoria', 'Kelowna'],
        Quebec: ['Montreal', 'Quebec City', 'Laval'],
    },
};

export type Country = keyof typeof locationData;
export type State = keyof typeof locationData[Country];

interface FormData {
    registeredAddress: {
        addressLine1: string
        city: string
        state: string
        postalCode: string
        country: string
    },
    warehouseAddress: {
        addressLine1: string
        city: string
        state: string
        postalCode: string
        country: string
    },
}

const formSchema = yup.object().shape({
    registeredAddress: yup.object({
        addressLine1: yup.string().required('Address is a required'),
        city: yup.string().required('City is a required'),
        state: yup.string().required('State is a required'),
        postalCode: yup.string().required('Postal code is a required'),
        country: yup.string().required('Country is a required'),
    }),
    warehouseAddress: yup.object({
        addressLine1: yup.string().required('Address is a required'),
        city: yup.string().required('City is a required'),
        state: yup.string().required('State is a required'),
        postalCode: yup.string().required('Postal code is a required'),
        country: yup.string().required('Country is a required'),
    }),
})

export default function AddressDetailsPage() {
    const { user, loading } = useAuth()

    const defaultValues: FormData = {
        registeredAddress: {
            addressLine1: user?.addresses[0]?.addressLine1 || '',
            city: user?.addresses[0]?.city || '',
            state: user?.addresses[0]?.state || '',
            postalCode: user?.addresses[0]?.postalCode || '',
            country: user?.addresses[0]?.country || '',
        },
        warehouseAddress: {
            addressLine1: user?.addresses[1]?.addressLine1 || '',
            city: user?.addresses[1]?.city || '',
            state: user?.addresses[1]?.state || '',
            postalCode: user?.addresses[1]?.postalCode || '',
            country: user?.addresses[1]?.country || '',
        },
    }

    const {
        reset,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    })

    const registerSelectedCountry = watch('registeredAddress.country') as Country;
    const registerSelectedState = watch('registeredAddress.state') as State;
    const warehouseSelectedCountry = watch('warehouseAddress.country') as Country;
    const warehouseSelectedState = watch('warehouseAddress.state') as State;

    const countryTypeOptions = Object.keys(locationData).map(country => ({
        label: country,
        value: country,
    }));

    const stateOptions = useMemo(() => {
        if (!registerSelectedCountry) return [];
        return Object.keys(locationData[registerSelectedCountry]).map(state => ({
            label: state,
            value: state,
        }));
    }, [registerSelectedCountry]);

    const cityOptions = useMemo(() => {
        if (!registerSelectedCountry || !registerSelectedState) return [];
        const cities = locationData[registerSelectedCountry][registerSelectedState] as string[];

        return cities.map((city: string) => ({
            label: city,
            value: city,
        }));
    }, [registerSelectedCountry, registerSelectedState]);

    const warehouseStateOptions = useMemo(() => {
        if (!warehouseSelectedCountry || !locationData[warehouseSelectedCountry]) return [];
        return Object.keys(locationData[warehouseSelectedCountry]).map(state => ({
            label: state,
            value: state,
        }));
    }, [warehouseSelectedCountry]);

    const warehouseCityOptions = useMemo(() => {
        if (!warehouseSelectedCountry || !warehouseSelectedState) return [];
        const cities = locationData[warehouseSelectedCountry][warehouseSelectedState] as string[];

        return cities.map((city: string) => ({
            label: city,
            value: city,
        }));
    }, [warehouseSelectedCountry, warehouseSelectedState]);


    const isStateDisabled = !registerSelectedCountry;
    const isCityDisabled = !registerSelectedState;
    const isWarehouseStateDisabled = !warehouseSelectedCountry;
    const isWarehouseCityDisabled = !warehouseSelectedState;


    const onSubmit = async (data: any) => {

        try {
            const payload = {
                companyName: user?.companyName,
                email: user?.email,
                gstNumber: user?.gstNumber,
                panNumber: user?.panNumber,
                registeredAddress: {
                    addressLine1: data.registeredAddress.addressLine1,
                    city: data.registeredAddress.city,
                    state: data.registeredAddress.state,
                    postalCode: data.registeredAddress.postalCode,
                    country: data.registeredAddress.country,
                },
                warehouseAddress: {
                    addressLine1: data.warehouseAddress.addressLine1,
                    city: data.warehouseAddress.city,
                    state: data.warehouseAddress.state,
                    postalCode: data.warehouseAddress.postalCode,
                    country: data.warehouseAddress.country,
                },
                pointOfContact: {
                    name: user?.contacts[0]?.name,
                    phone: user?.contacts[0]?.phone,
                    email: user?.contacts[0]?.email,
                    designation: user?.contacts[0]?.designation ?? '',
                },
                bankAccount: {
                    bankName: user?.bankAccounts[0]?.bankName,
                    accountName: user?.bankAccounts[0]?.accountName,
                    accountNumber: user?.bankAccounts[0]?.accountNumber,
                    ifscCode: user?.bankAccounts[0]?.ifscCode,
                    accountType: user?.bankAccounts[0]?.accountType || '',
                },
                documents: []
            };

            console.log("addresspayload", payload);

        } catch (error) {
            toast.error(<Text as="b">Failed to update profile</Text>);
        }
    };

    useEffect(() => {
        if (!user) return;
        reset(defaultValues)
    }, [user]);

    return (
        <>
            <div className="@container">
                <KitShow show={loading}>
                    <div className='h-screen flex justify-center'>
                        <KitLoader isLoading={true} />
                    </div>
                </KitShow>
                <KitShow show={!loading}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                            <FormGroup
                                title="Registered Address"
                                className="pt-7 @2xl:pt-9 @3xl:pt-11"
                            >
                                <Controller
                                    name="registeredAddress.addressLine1"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Address Line 1 *"
                                            placeholder="Enter registered address"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.registeredAddress?.addressLine1 && errors.registeredAddress?.addressLine1.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name='registeredAddress.country'
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            label="Country *"
                                            options={countryTypeOptions}
                                            value={field.value}
                                            onChange={(selectedOption) => {
                                                const option = selectedOption as { label: string; value: string };
                                                field.onChange(option.value);
                                                setValue('registeredAddress.state', '');
                                                setValue('registeredAddress.city', '');
                                            }}
                                            error={errors?.registeredAddress?.country && errors.registeredAddress.country.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name='registeredAddress.state'
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            label="State *"
                                            options={stateOptions}
                                            value={field.value}
                                            onChange={(selectedOption) => {
                                                const option = selectedOption as { label: string; value: string };
                                                field.onChange(option.value);
                                                setValue('registeredAddress.city', '');
                                            }}
                                            error={errors?.registeredAddress?.state && errors.registeredAddress.state.message}
                                            disabled={isStateDisabled}
                                        />
                                    )}
                                />
                                <Controller
                                    name='registeredAddress.city'
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            label="City *"
                                            options={cityOptions}
                                            value={field.value}
                                            onChange={(selectedOption) => {
                                                const option = selectedOption as { label: string; value: string };
                                                field.onChange(option.value);
                                            }}
                                            error={errors?.registeredAddress?.city && errors.registeredAddress.city.message}
                                            disabled={isCityDisabled}
                                        />
                                    )}
                                />
                                <Controller
                                    name="registeredAddress.postalCode"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Postal Code *"
                                            placeholder="Enter postal code"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.registeredAddress?.postalCode && errors.registeredAddress?.postalCode.message}
                                        />
                                    )}
                                />
                            </FormGroup>
                            <FormGroup
                                title="Warehouse Address"
                                className="pt-7 @2xl:pt-9 @3xl:pt-11"
                            >
                                <Controller
                                    name="warehouseAddress.addressLine1"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Address Line 1 *"
                                            placeholder="Enter registered address"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.warehouseAddress?.addressLine1 && errors.warehouseAddress?.addressLine1.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name='warehouseAddress.country'
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            label="Country *"
                                            options={countryTypeOptions}
                                            value={field.value}
                                            onChange={(selectedOption) => {
                                                const option = selectedOption as { label: string; value: string };
                                                field.onChange(option.value);
                                                setValue('warehouseAddress.state', '');
                                                setValue('warehouseAddress.city', '');
                                            }}
                                            error={errors?.warehouseAddress?.country && errors.warehouseAddress.country.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name='warehouseAddress.state'
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            label="State *"
                                            options={warehouseStateOptions}
                                            value={field.value}
                                            onChange={(selectedOption) => {
                                                const option = selectedOption as { label: string; value: string };
                                                field.onChange(option.value);
                                                setValue('warehouseAddress.city', '');
                                            }}
                                            error={errors?.warehouseAddress?.state && errors.warehouseAddress.state.message}
                                            disabled={isWarehouseStateDisabled}
                                        />
                                    )}
                                />

                                <Controller
                                    name='warehouseAddress.city'
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            label="City *"
                                            options={warehouseCityOptions}
                                            value={field.value}
                                            onChange={(selectedOption) => {
                                                const option = selectedOption as { label: string; value: string };
                                                field.onChange(option.value);
                                            }}
                                            error={errors?.warehouseAddress?.city && errors.warehouseAddress.city.message}
                                            disabled={isWarehouseCityDisabled}
                                        />
                                    )}
                                />
                                <Controller
                                    name="warehouseAddress.postalCode"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Postal Code *"
                                            placeholder="Enter postal code"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.warehouseAddress?.postalCode && errors.warehouseAddress?.postalCode.message}
                                        />
                                    )}
                                />
                            </FormGroup>
                        </div>
                        <FormFooter
                            // isLoading={isLoading}
                            altBtnText="Cancel"
                            submitBtnText="Save"
                        />
                    </form>
                </KitShow>
            </div>
        </>
    );
}