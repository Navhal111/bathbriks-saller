'use client';

import { Input, Textarea } from 'rizzui';
import { UseFormReturn } from 'react-hook-form';
import { CompanyDetailsSchema } from '@/validators/sign-up.schema';

interface CompanyDetailsFormProps {
    methods: UseFormReturn<CompanyDetailsSchema>;
}

export default function CompanyDetailsForm({ methods }: CompanyDetailsFormProps) {
    const { register, formState: { errors } } = methods;

    return (
        <div className="space-y-5">
            <Input
                type="text"
                size="lg"
                label="Company Name *"
                placeholder="Enter your company name"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('companyName')}
                error={errors.companyName?.message}
            />
            <Input
                type="email"
                size="lg"
                label="Email ID"
                placeholder="Enter email address (optional)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('email')}
                error={errors.email?.message}
            />
            <Input
                type="text"
                size="lg"
                label="GST Number *"
                placeholder="Enter GST number (15 characters)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('gstNumber')}
                error={errors.gstNumber?.message}
                maxLength={15}
            />
            <Input
                type="text"
                size="lg"
                label="PAN Card *"
                placeholder="Enter PAN card number (10 characters)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('panNumber')}
                error={errors.panNumber?.message}
                maxLength={10}
            />
        </div>
    );
}