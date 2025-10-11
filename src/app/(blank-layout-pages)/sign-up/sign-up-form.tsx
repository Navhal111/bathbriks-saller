'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold, PiArrowLeftBold } from 'react-icons/pi';
import { Button, Text } from 'rizzui';
import { Form } from "@/app/(dashboard)/shared/form";
import Stepper from '@/components/stepper';
import PointOfContactForm from './components/point-of-contact-form';
import CompanyDetailsForm from './components/company-details-form';
import BankDetailsForm from './components/bank-details-form';
import {
    pointOfContactSchema,
    companyDetailsSchema,
    bankDetailsSchema,
    addressDetailsSchema,
} from '@/validators/sign-up.schema';
import AddressDetailsForm from './components/address-details-form';
import { useSWRSignUp } from '@/kit/hooks/data/auth';
import { SignUp } from '@/kit/models/Auth';
import { AccountType } from '@/config/enums';
import toast from 'react-hot-toast';
import { CustomErrorType } from '@/kit/models/CustomError';
import { useRouter } from 'next/navigation';

const steps = [
    { title: 'Contact Details', description: 'Personal information' },
    { title: 'Address Details', description: 'Address information' },
    { title: 'Company Details', description: 'Business information' },
    { title: 'Bank Details', description: 'Banking information' },
];

const initialValues = {
    companyName: "",
    email: "",
    password: "",
    gstNumber: "",
    panNumber: "",
    registeredAddress: {
        addressLine1: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
    },
    warehouseAddress: {
        addressLine1: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
    },
    pointOfContact: {
        name: "",
        phone: "",
        email: "",
        designation: "",
        confirmPassword: "",
    },
    bankAccount: {
        bankName: "",
        accountName: "",
        accountNumber: "",
        ifscCode: "",
        accountType: AccountType.SAVINGS as const,
    },
    documents: []
};

export default function SignUpForm() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(initialValues);

    const { create: onSignUpAccount, isMutating: isLoading } = useSWRSignUp()

    const getCurrentSchema = () => {
        switch (currentStep) {
            case 0:
                return pointOfContactSchema;
            case 1:
                return addressDetailsSchema;
            case 2:
                return companyDetailsSchema;
            case 3:
                return bankDetailsSchema;
            default:
                return pointOfContactSchema;
        }
    };

    const getCurrentDefaultValues = () => {
        switch (currentStep) {
            case 0:
                return formData.pointOfContact;
            case 1:
                return {
                    registeredAddress: formData.registeredAddress,
                    warehouseAddress: formData.warehouseAddress,
                };
            case 2:
                return {
                    companyName: formData.companyName,
                    email: formData.email,
                    gstNumber: formData.gstNumber,
                    panNumber: formData.panNumber,
                };
            case 3:
                return formData.bankAccount;
            default:
                return formData.pointOfContact;
        }
    };

    const onSubmit: SubmitHandler<any> = async (data) => {
        if (currentStep === 0) {
            const { password, confirmPassword, ...pointOfContact } = data;
            setFormData(prev => ({
                ...prev,
                password,
                pointOfContact,
            }));
            setCurrentStep(1);

        } else if (currentStep === 1) {
            setFormData(prev => ({
                ...prev,
                registeredAddress: data.registeredAddress,
                warehouseAddress: data.warehouseAddress,
            }));
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setFormData(prev => ({
                ...prev,
                companyName: data.companyName,
                email: data.email,
                gstNumber: data.gstNumber,
                panNumber: data.panNumber,
            }));
            setCurrentStep(3);
        } else {
            const { dealershipDocuments, ...bankAccount } = data;
            const finalData = {
                ...formData,
                bankAccount: bankAccount,
            };

            try {
                const signUpDetail = await onSignUpAccount(finalData as Partial<SignUp>)
                toast.success(signUpDetail?.message ?? 'Register Successfully!')
                router.push('/sign-in')
            } catch (error) {
                toast.error((error as CustomErrorType)?.message)
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderCurrentForm = (methods: any) => {
        switch (currentStep) {
            case 0:
                return <PointOfContactForm methods={methods} />;
            case 1:
                return <AddressDetailsForm methods={methods} />;
            case 2:
                return <CompanyDetailsForm methods={methods} />;
            case 3:
                return <BankDetailsForm methods={methods} />;
            default:
                return <PointOfContactForm methods={methods} />;
        }
    };

    return (
        <>
            <div className="mb-8">
                <Stepper steps={steps} currentStep={currentStep} />
            </div>

            <Form
                validationSchema={getCurrentSchema()}
                onSubmit={onSubmit}
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: getCurrentDefaultValues(),
                }}
            >
                {(methods) => (
                    <div className="space-y-6">
                        {renderCurrentForm(methods)}

                        <div className="flex items-center justify-between pt-4">
                            {currentStep > 0 ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePrevious}
                                    size="lg"
                                >
                                    <PiArrowLeftBold className="me-2 h-6 w-6" />
                                    <span>Previous</span>
                                </Button>
                            ) : (
                                <div></div>
                            )}

                            <Button type="submit" size="lg" isLoading={isLoading}>
                                <span>{currentStep === 2 ? 'Complete Registration' : 'Next'}</span>
                                <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                )}
            </Form>

            <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
                Already have an account?{' '}
                <Link
                    href="/sign-in"
                    className="font-semibold text-gray-700 transition-colors hover:text-blue"
                >
                    Sign In
                </Link>
            </Text>
        </>
    );
}