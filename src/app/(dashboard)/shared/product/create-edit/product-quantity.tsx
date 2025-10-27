'use client';

import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input, Button, ActionIcon } from 'rizzui';
import { productQuantity } from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import TrashIcon from '@/components/icons/trash';
import { PiPlusBold } from 'react-icons/pi';

export default function ProductQuantity({ className }: { className?: string }) {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'quantityPrice',
    });

    const addCustomField = useCallback(
        () => append([...productQuantity]),
        [append]
    );

    return (
        <>
            {fields.map((item, index) => (
                <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
                    <Input
                        type="number"
                        label="Quantity"
                        placeholder="10"
                        className="flex-grow"
                        error={(errors.quantityPrice as any)?.[index]?.quantity?.message}
                        {...register(`quantityPrice.${index}.quantity`)}
                    />
                    <Input
                        type="number"
                        label="Price"
                        placeholder="150.00"
                        className="flex-grow"
                        prefix={'₹'}
                        error={(errors.quantityPrice as any)?.[index]?.price?.message}
                        {...register(`quantityPrice.${index}.price`)}
                    />
                    {fields.length > 1 && (
                        <ActionIcon
                            onClick={() => remove(index)}
                            variant="flat"
                            className="mt-7 shrink-0"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </ActionIcon>
                    )}
                </div>
            ))}

            <Button
                onClick={addCustomField}
                variant="outline"
                className="col-span-full ml-auto w-auto"
            >
                <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> Add Item
            </Button>
        </>
    );
}
