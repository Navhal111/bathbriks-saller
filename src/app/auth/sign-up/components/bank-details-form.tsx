'use client';

import { Input, Select, SelectOption } from 'rizzui';
import { UseFormReturn } from 'react-hook-form';
import { BankDetailsSchema } from '@/validators/sign-up.schema';
import { AccountType } from '@/config/enums';

interface BankDetailsFormProps {
    methods: UseFormReturn<BankDetailsSchema>;
}

const accountTypeOptions = [
    { label: 'Savings Account', value: 'SAVINGS' },
    { label: 'Current Account', value: 'CURRENT' },
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
                placeholder="Enter account number min (6 characters)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('accountNumber')}
                error={errors.accountNumber?.message}
            />
            <Input
                type="text"
                size="lg"
                label="IFSC Code"
                placeholder="Enter IFSC code (11 characters)"
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
                value={accountTypeOptions.find(opt => opt.value === accountType) ?? null}
                onChange={(option) => setValue('accountType', (option as { value: AccountType.SAVINGS | AccountType.CURRENT }).value)}
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