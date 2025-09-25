"use client";

import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { Text, Input } from "rizzui";
import FormGroup from "@/app/shared/form-group";
import FormFooter from "@/components/form-footer";
import { useEffect } from "react";
import KitShow from "@/kit/components/KitShow/KitShow";
import KitLoader from "@/kit/components/KitLoader/KitLoader";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from "@/kit/hooks/useAuth";

interface FormData {
    companyName: string,
    email: string,
    gstNumber: string,
    panNumber: string,
}

const formSchema = yup.object().shape({
    companyName: yup.string().required('Company name is a required'),
    email: yup.string().required('Email is a required'),
    gstNumber: yup
        .string()
        .required('GST number is required')
        .length(15, 'GST number must be exactly 15 characters'),
    panNumber: yup
        .string()
        .required('PAN number is required')
        .length(15, 'GST number must be exactly 10 characters'),
})

export default function CompanyDetailsPage() {

    const { user, loading } = useAuth()

    const defaultValues: FormData = {
        companyName: user?.companyName || '',
        email: user?.email || '',
        gstNumber: user?.gstNumber || '',
        panNumber: user?.panNumber || '',
    }

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    })

    const onSubmit = async (data: any) => {

        try {
            const payload = {
                companyName: data.companyName,
                email: data.email,
                gstNumber: data?.gstNumber,
                panNumber: data.panNumber,
                registeredAddress: {
                    addressLine1: user?.addresses[0]?.addressLine1,
                    city: user?.addresses[0]?.city,
                    state: user?.addresses[0]?.state,
                    postalCode: user?.addresses[0]?.postalCode,
                    country: user?.addresses[0]?.country,
                },
                warehouseAddress: {
                    addressLine1: user?.addresses[1]?.addressLine1,
                    city: user?.addresses[1]?.city,
                    state: user?.addresses[1]?.state,
                    postalCode: user?.addresses[1]?.postalCode,
                    country: user?.addresses[1]?.country,
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

            console.log("bankpayload", payload);

            // const result = await updateUser(payload);
            // toast.success(<Text as="b">Profile updated successfully!</Text>);
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
                                title="Username"
                                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                            >
                                <Controller
                                    name="companyName"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Company Name *"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.companyName && errors.companyName.message}
                                            placeholder="Enter your company name"
                                        />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Email ID"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.email && errors.email.message}
                                            placeholder="Enter email address (optional)"
                                        />
                                    )}
                                />
                                <Controller
                                    name="gstNumber"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="GST Number *"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.gstNumber && errors.gstNumber.message}
                                            placeholder="Enter GST number (15 characters)"
                                            type="number"
                                            onKeyDown={(e) => {
                                                if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="panNumber"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="PAN Card *"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.panNumber && errors.panNumber.message}
                                            placeholder="Enter PAN card number (10 characters)"
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