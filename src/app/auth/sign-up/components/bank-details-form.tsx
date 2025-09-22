'use client';

import { Input, Select } from 'rizzui';
import { UseFormReturn } from 'react-hook-form';
import { BankDetailsSchema } from '@/validators/sign-up.schema';

interface BankDetailsFormProps {
    methods: UseFormReturn<BankDetailsSchema>;
}

const accountTypeOptions = [
    { label: 'Savings Account', value: 'savings' },
    { label: 'Current Account', value: 'current' },
];

export default function BankDetailsForm({ methods }: BankDetailsFormProps) {
    const { register, formState: { errors }, setValue, watch } = methods;
    const accountType = watch('accountType');

    return (
        <div className="space-y-5">
            <Input
                type="text"
                size="lg"
                label="Bank Name"
                placeholder="Enter bank name (optional)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('bankName')}
                error={errors.bankName?.message}
            />
            <Input
                type="text"
                size="lg"
                label="Account Name"
                placeholder="Enter account holder name (optional)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('accountName')}
                error={errors.accountName?.message}
            />
            <Input
                type="text"
                size="lg"
                label="Account Number"
                placeholder="Enter account number (optional)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('accountNo')}
                error={errors.accountNo?.message}
            />
            <Input
                type="email"
                size="lg"
                label="Email ID"
                placeholder="Enter email address (optional)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('emailId')}
                error={errors.emailId?.message}
            />
            <Input
                type="text"
                size="lg"
                label="IFSC Code"
                placeholder="Enter IFSC code (optional)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('ifscCode')}
                error={errors.ifscCode?.message}
                maxLength={11}
            />
            <Select
                label="Account Type"
                placeholder="Select account type (optional)"
                size="lg"
                className="[&>label>span]:font-medium"
                selectClassName="text-sm"
                options={accountTypeOptions}
                value={accountType}
                onChange={(value) => setValue('accountType', value as 'savings' | 'current')}
                error={errors.accountType?.message}
            />
            <Input
                type="text"
                size="lg"
                label="Dealership Documents (If Applicable)"
                placeholder="Enter dealership document details (optional)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('dealershipDocuments')}
                error={errors.dealershipDocuments?.message}
            />
        </div>
    );
}