"use client";

import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { Form } from "@/app/shared/form";
import { Loader, Text, Input, Select } from "rizzui";
import FormGroup from "@/app/shared/form-group";
import FormFooter from "@/components/form-footer";
import {
    defaultValues,
    personalInfoFormSchema,
    PersonalInfoFormTypes,
} from "@/validators/personal-info.schema";
import { LocalStorageService } from "@/services/localStorageService";
import { useUserDetailsRedux } from "@/store/hooks/useUserDetailsRedux";
import { useEffect, useState } from "react";

const accountTypeOptions = [
    { label: 'Savings Account', value: 'savings' },
    { label: 'Current Account', value: 'current' },
];

export default function BankDetailsPage() {
    const [userName, setUserName] = useState<string>("");
    const [formMethods, setFormMethods] = useState<any>(null);

    // Redux hook for user details
    const { userDetails, isLoading, error, fetchUserDetails, updateUser } =
        useUserDetailsRedux();

    useEffect(() => {
        // Get username from localStorage on component mount
        const storedUsername = LocalStorageService.getUsername();
        if (storedUsername) {
            setUserName(storedUsername);
        }
        // Fetch user details
        fetchUserDetails();
    }, []);

    // Handle successful update
    useEffect(() => {
        if (userDetails && !isLoading && !error) {
            // Success handling can be added here if needed
        }
    }, [userDetails, isLoading, error]);

    // Update form values when user details are fetched and form methods are available
    useEffect(() => {
        if (userDetails && formMethods) {
            formMethods.setValue("name", userDetails.userName || "");
            formMethods.setValue("mobile", userDetails.userMobile || "");
            formMethods.setValue("email", userDetails.userEmail || "");
            formMethods.setValue("designation", userDetails.userDesignation || "");
            formMethods.setValue("companyName", userDetails.userCompanyName || "");
            formMethods.setValue("registeredAddress", userDetails.userRegisteredAddress || "");
            formMethods.setValue("warehouseAddress", userDetails.userWarehouseAddress || "");
            formMethods.setValue("gstNo", userDetails.userGstNo || "");
            formMethods.setValue("panCard", userDetails.userPanCard || "");
            formMethods.setValue("bankName", userDetails.userBankName || "");
            formMethods.setValue("accountName", userDetails.userAccountName || "");
            formMethods.setValue("accountNo", userDetails.userAccountNo || "");
            formMethods.setValue("emailId", userDetails.userEmailId || "");
            formMethods.setValue("ifscCode", userDetails.userIfscCode || "");
            formMethods.setValue("accountType", userDetails.userAccountType || "");
            formMethods.setValue("dealershipDocuments", userDetails.userDealershipDocuments || "");
            setUserName(userDetails.userName || "");
        }
    }, [userDetails, formMethods]);

    const onSubmit: SubmitHandler<PersonalInfoFormTypes> = async (data) => {
        console.log("Form submitted with data:", data);
        console.log("Current user details:", userDetails);
        console.log("Current username:", userName);

        try {
            if (!userDetails) {
                console.error("User details not loaded");
                toast.error(<Text as="b">User details not loaded</Text>);
                return;
            }

            const payload = {
                username: userName,
                userEmail: data.email,
                userMobile: data.mobile,
                userDesignation: data.designation,
                userType: userDetails.userType,
                userCompanyName: data.companyName,
                userRegisteredAddress: data.registeredAddress,
                userWarehouseAddress: data?.warehouseAddress ?? '',
                userGstNo: data.gstNo,
                userPanCard: data.panCard,
                userBankName: data?.bankName ?? '',
                userAccountName: data?.accountName ?? '',
                userAccountNo: data?.accountNo ?? '',
                userEmailId: data?.emailId ?? '',
                userIfscCode: data?.ifscCode ?? '',
                userAccountType: data?.accountType ?? 'savings',
                userDealershipDocuments: data?.dealershipDocuments ?? '',
            };

            console.log("Calling updateUser with payload:", payload);

            const result = await updateUser(payload);
            console.log("Update result:", result);
            toast.success(<Text as="b">Profile updated successfully!</Text>);
        } catch (error) {
            console.error("Update error:", error);
            toast.error(<Text as="b">Failed to update profile</Text>);
        }
    };

    return (
        <Form<PersonalInfoFormTypes>
            validationSchema={personalInfoFormSchema}
            // resetValues={reset}
            onSubmit={onSubmit}
            className="@container"
            useFormProps={{
                mode: "onChange",
                defaultValues,
            }}
        >
            {({
                register,
                control,
                setValue,
                getValues,
                watch,
                formState: { errors, isSubmitting },
            }) => {
                const accountType = watch('accountType');
                // Capture form methods for use in useEffect
                if (!formMethods || formMethods.setValue !== setValue) {
                    setFormMethods({ setValue, register, control, getValues });
                }

                console.log("Form errors:", errors);
                console.log("Form is submitting:", isSubmitting);

                return (
                    <>

                        {isLoading && (
                            <div className="flex justify-center items-center py-8">
                                <Loader size="lg" />
                                <Text className="ml-3">Loading bank details...</Text>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-md mt-7 @2xl:mt-9 @3xl:grid-cols-12 @3xl:mt-11">
                                <Text className="text-red-600">
                                    Error loading bank details. Please try again.
                                </Text>
                            </div>
                        )}

                        <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                            <FormGroup
                                title="Bank Details"
                                className="pt-7 @2xl:pt-9 @3xl:pt-11"
                            >
                                <Input
                                    type="text"
                                    label="Bank Name"
                                    placeholder="Bank name"
                                    {...register('bankName')}
                                    error={errors.bankName?.message as string}
                                />
                                <Input
                                    type="text"
                                    label="Account Name"
                                    placeholder="Account name"
                                    {...register('accountName')}
                                    error={errors.accountName?.message as string}
                                />
                                <Input
                                    type="text"
                                    label="Account No"
                                    placeholder="Account No"
                                    {...register('accountNo')}
                                    error={errors.accountNo?.message as string}
                                />
                                <Input
                                    type="email"
                                    label="Email Id"
                                    placeholder="Email Id"
                                    {...register('emailId')}
                                    error={errors.emailId?.message as string}
                                />
                                <Input
                                    type="text"
                                    label="Ifsc Code"
                                    placeholder="Ifsc code"
                                    {...register('ifscCode')}
                                    error={errors.ifscCode?.message as string}
                                />
                                <Select
                                    label="Account Type"
                                    placeholder="Select account type (optional)"
                                    selectClassName="text-sm"
                                    options={accountTypeOptions}
                                    value={accountType}
                                    onChange={(value) => setValue('accountType', value as 'savings' | 'current')}
                                    error={errors.accountType?.message}
                                />
                                <Input
                                    type="text"
                                    label="Dealership Documents"
                                    placeholder="Dealership documents"
                                    {...register('dealershipDocuments')}
                                    error={errors.dealershipDocuments?.message as string}
                                />
                            </FormGroup>
                        </div>

                        <FormFooter
                            isLoading={isLoading}
                            altBtnText="Cancel"
                            submitBtnText="Save"
                        />

                    </>
                );
            }}
        </Form>
    );
}
