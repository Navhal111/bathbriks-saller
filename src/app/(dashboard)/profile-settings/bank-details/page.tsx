"use client";

import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { Text, Input, Select } from "rizzui";
import FormGroup from "@/app/(dashboard)/shared/form-group";
import FormFooter from "@/components/form-footer";
import { useEffect } from "react";
import KitShow from "@/kit/components/KitShow/KitShow";
import KitLoader from "@/kit/components/KitLoader/KitLoader";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from "@/kit/hooks/useAuth";
import { useUpdateUser } from "@/kit/hooks/data/user";
import storage from "@/kit/services/storage";
import authConfig from '@/config/auth'

const accountTypeOptions = [
    { label: 'Savings Account', value: 'SAVINGS' },
    { label: 'Current Account', value: 'CURRENT' },
];

interface FormData {
    bankName: string,
    accountName: string,
    accountNumber: string,
    emailId: string,
    ifscCode: string,
    accountType: string,
    dealershipDocuments: [],
}

const formSchema = yup.object().shape({
    bankName: yup.string().required('Bank name is a required'),
    accountName: yup.string().required('Account name is a required'),
    accountNumber: yup
        .string()
        .required('Account number is required')
        .matches(/^\d{10,}$/, 'Account number must be at least 6 digits'),
    emailId: yup.string().required('Email is a required'),
    ifscCode: yup
        .string()
        .required('IFSC code is a required')
        .length(11, 'IFSC code must be exactly 11 characters'),
    accountType: yup.string().required('Account type is a required'),
    dealershipDocuments: yup.array().optional(),
})

export default function BankDetailsPage() {
    const { user, loading } = useAuth()

    const { update: onUpdateUser, isUpdatingUser: isUserUpdateLoading } = useUpdateUser()

    const defaultValues: FormData = {
        bankName: user?.bankAccounts[0]?.bankName || '',
        accountName: user?.bankAccounts[0]?.accountName || '',
        accountNumber: user?.bankAccounts[0]?.accountNumber || '',
        emailId: user?.email || '',
        ifscCode: user?.bankAccounts[0]?.ifscCode || '',
        accountType: user?.bankAccounts[0]?.accountType || '',
        dealershipDocuments: [],
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

    const isBtnLoading = isUserUpdateLoading

    const onSubmit = async (data: any) => {

        try {
            const payload = {
                companyName: user?.companyName,
                email: user?.email,
                gstNumber: user?.gstNumber,
                panNumber: user?.panNumber,
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
                    bankName: data?.bankName,
                    accountName: data?.accountName,
                    accountNumber: data?.accountNo,
                    ifscCode: data?.ifscCode,
                    accountType: data?.accountType ?? '',
                },
                documents: []
            };


            console.log("bankpayload", payload);

            const updateUser = await onUpdateUser(payload)
            await Promise.all([storage.setItem(authConfig.storageUserDetailName, updateUser.data)])
            toast.success(updateUser?.message ?? 'Profile updated successfully!')

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
                                title="Bank Details"
                                className="pt-7 @2xl:pt-9 @3xl:pt-11"
                            >
                                <Controller
                                    name="bankName"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Bank Name"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.bankName && errors.bankName.message}
                                            placeholder="Enter bank name"
                                        />
                                    )}
                                />
                                <Controller
                                    name="accountName"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Account Name"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.accountName && errors.accountName.message}
                                            placeholder="Enter account holder name"
                                        />
                                    )}
                                />
                                <Controller
                                    name="accountNumber"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Account Number"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.accountNumber && errors.accountNumber.message}
                                            placeholder="Enter account number min (6 characters)"
                                            type="number"
                                            onKeyDown={(e) => {
                                                if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="ifscCode"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="IFSC Code"
                                            ref={ref}
                                            required
                                            value={value}
                                            onChange={onChange}
                                            error={errors.ifscCode && errors.ifscCode.message}
                                            placeholder="Enter IFSC code (11 characters)"
                                        />
                                    )}
                                />
                                <Controller
                                    name='accountType'
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            label="Account Type"
                                            options={accountTypeOptions}
                                            value={field.value}
                                            onChange={(selectedOption) => {
                                                const option = selectedOption as { label: string; value: string };
                                                field.onChange(option.value);
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="dealershipDocuments"
                                    control={control}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <Input
                                            label="Dealership Documents (If Applicable)"
                                            ref={ref}
                                            value={value}
                                            onChange={onChange}
                                            placeholder="Enter dealership document details (optional)"
                                        />
                                    )}
                                />
                            </FormGroup>
                        </div>
                        <FormFooter
                            isLoading={isBtnLoading}
                            altBtnText="Cancel"
                            submitBtnText="Save"
                        />
                    </form>
                </KitShow>
            </div>
        </>
    );
}
