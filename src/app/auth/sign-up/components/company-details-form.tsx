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
            <Textarea
                size="lg"
                label="Registered Address *"
                placeholder="Enter registered address"
                className="[&>label>span]:font-medium"
                textareaClassName="text-sm"
                {...register('registeredAddress')}
                error={errors.registeredAddress?.message}
                rows={3}
            />
            <Textarea
                size="lg"
                label="Warehouse Address"
                placeholder="Enter warehouse address (optional)"
                className="[&>label>span]:font-medium"
                textareaClassName="text-sm"
                {...register('warehouseAddress')}
                error={errors.warehouseAddress?.message}
                rows={3}
            />
            <Input
                type="text"
                size="lg"
                label="GST Number *"
                placeholder="Enter GST number (15 characters)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('gstNo')}
                error={errors.gstNo?.message}
                maxLength={15}
            />
            <Input
                type="text"
                size="lg"
                label="PAN Card *"
                placeholder="Enter PAN card number (10 characters)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('panCard')}
                error={errors.panCard?.message}
                maxLength={10}
            />
        </div>
    );
}