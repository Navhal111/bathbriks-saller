'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold, PiArrowLeftBold } from 'react-icons/pi';
import { Button, Text } from 'rizzui';
import { Form } from "@/app/shared/form";
import Stepper from '@/components/stepper';
import PointOfContactForm from './components/point-of-contact-form';
import CompanyDetailsForm from './components/company-details-form';
import BankDetailsForm from './components/bank-details-form';
import {
    pointOfContactSchema,
    companyDetailsSchema,
    bankDetailsSchema,
    PointOfContactSchema,
    CompanyDetailsSchema,
    BankDetailsSchema,
} from '@/validators/sign-up.schema';

const steps = [
    { title: 'Contact Details', description: 'Personal information' },
    { title: 'Company Details', description: 'Business information' },
    { title: 'Bank Details', description: 'Banking information' },
];

const initialValues = {
    pointOfContact: {
        name: '',
        phoneNumber: '',
        email: '',
        designation: '',
        password: '',
        confirmPassword: '',
    },
    companyDetails: {
        companyName: '',
        registeredAddress: '',
        warehouseAddress: '',
        gstNo: '',
        panCard: '',
    },
    bankDetails: {
        bankName: '',
        accountName: '',
        accountNo: '',
        emailId: '',
        ifscCode: '',
        accountType: 'savings' as const,
        dealershipDocuments: '',
    },
};

export default function SignUpForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(initialValues);

    const getCurrentSchema = () => {
        switch (currentStep) {
            case 0:
                return pointOfContactSchema;
            case 1:
                return companyDetailsSchema;
            case 2:
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
                return formData.companyDetails;
            case 2:
                return formData.bankDetails;
            default:
                return formData.pointOfContact;
        }
    };

    const onSubmit: SubmitHandler<any> = (data) => {
        if (currentStep === 0) {
            setFormData(prev => ({ ...prev, pointOfContact: data }));
            setCurrentStep(1);
        } else if (currentStep === 1) {
            setFormData(prev => ({ ...prev, companyDetails: data }));
            setCurrentStep(2);
        } else {
            const finalData = {
                ...formData,
                bankDetails: data,
            };
            console.log('Final form data:', finalData);
            // Handle final submission here
            // You can call your API or perform sign-up logic
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
                return <CompanyDetailsForm methods={methods} />;
            case 2:
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

                            <Button type="submit" size="lg">
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
                    href="/auth/sign-in"
                    className="font-semibold text-gray-700 transition-colors hover:text-blue"
                >
                    Sign In
                </Link>
            </Text>
        </>
    );
}