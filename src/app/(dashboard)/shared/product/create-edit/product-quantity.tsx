'use client';

import { useCallback, useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input, Switch, Button, ActionIcon } from 'rizzui';
import { productQuantity } from '@/app/(dashboard)/shared/product/create-edit/form-utils';
import TrashIcon from '@/components/icons/trash';
import { PiPlusBold } from 'react-icons/pi';
import KitShow from '@/kit/components/KitShow/KitShow';

export default function ProductQuantity({ className }: { className?: string }) {
    const {
        control,
        register,
        setValue,
        watch,
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

    const quantityPriceSwitch = watch('isQuantityPrice')

    useEffect(() => {
        if (!quantityPriceSwitch) {
            setValue('quantityPrice', productQuantity);
        }
    }, [quantityPriceSwitch, setValue]);

    return (
        <>
            <Controller
                name="isQuantityPrice"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Switch
                        label="Quantity Price"
                        className="col-span-full"
                        value={value}
                        checked={value}
                        onChange={onChange}
                    />
                )}
            />

            <KitShow show={quantityPriceSwitch}>
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
            </KitShow>
        </>
    );
}
