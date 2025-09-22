'use client';

import { Input, Password } from 'rizzui';
import { UseFormReturn } from 'react-hook-form';
import { PointOfContactSchema } from '@/validators/sign-up.schema';

interface PointOfContactFormProps {
    methods: UseFormReturn<PointOfContactSchema>;
}

export default function PointOfContactForm({ methods }: PointOfContactFormProps) {
    const { register, formState: { errors } } = methods;

    return (
        <div className="space-y-5">
            <Input
                type="text"
                size="lg"
                label="Name *"
                placeholder="Enter your full name"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('name')}
                error={errors.name?.message}
            />
            <Input
                type="tel"
                size="lg"
                label="Phone Number *"
                placeholder="Enter your phone number"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('phoneNumber')}
                error={errors.phoneNumber?.message}
            />
            <Input
                type="email"
                size="lg"
                label="Email *"
                placeholder="Enter your email address"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('email')}
                error={errors.email?.message}
            />
            <Input
                type="text"
                size="lg"
                label="Designation"
                placeholder="Enter your designation (optional)"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('designation')}
                error={errors.designation?.message}
            />
            <Password
                label="Password *"
                placeholder="Enter your password"
                size="lg"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('password')}
                error={errors.password?.message}
            />
            <Password
                label="Confirm Password *"
                placeholder="Confirm your password"
                size="lg"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />
        </div>
    );
}