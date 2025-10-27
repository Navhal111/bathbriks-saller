import FormGroup from '@/app/(dashboard)/shared/form-group';
import cn from '@/utils/class-names';
import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui/input';

interface OrderQuantityProps {
    className?: string;
}

export default function OrderQuantity({ className }: OrderQuantityProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <FormGroup
                title="Order Quantity"
                description="Add your order quantity here"
                className={cn(className)}
            >
                <Input
                    type="number"
                    label="Min Order"
                    placeholder="10"
                    {...register('minOrder')}
                    error={errors.minOrder?.message as string}
                />
                <Input
                    type="number"
                    label="Max Order"
                    placeholder="20"
                    {...register('maxOrder')}
                    error={errors.maxOrder?.message as string}
                />
            </FormGroup>
        </>
    );
}
