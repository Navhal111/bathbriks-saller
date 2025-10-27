'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Input, ActionIcon } from 'rizzui';
import { Select, SelectOption } from 'rizzui/select';
import { useGetDimensionsList } from '@/kit/hooks/data/dimensions';
import TrashIcon from '@/components/icons/trash';

export default function VariantRow({
    index,
    item,
    remove,
    dimensionOptions,
    register,
    control,
    errors,
    watchedProductVariants,
    setLinkedProductMap,
    fieldsLength,
}: any) {

    const { watch: watchRow, control: controlRow } = useFormContext();
    const selectedDimensionId = watchRow(`dimensions.${index}.dimension_id`) || '';

    const { GetDimensionsList: dimensionProducts, isGetDimensionsListLoading } = useGetDimensionsList({ dimension_id: selectedDimensionId }, Boolean(selectedDimensionId));

    const productOptions = (dimensionProducts?.data?.items || []).map((product: any) => ({
        label: product.name,
        value: String(product.id),
    }));

    const isDimensionAlreadySelected = (currentIndex: number, dimensionId: string) => {
        if (!dimensionId || !watchedProductVariants) return false;

        return watchedProductVariants.some((variant: any, index: number) =>
            index !== currentIndex && variant.dimension_id === dimensionId
        );
    };

    // Function to get error message for duplicate dimension
    const getDimensionErrorMessage = (currentIndex: number, dimensionId: string) => {
        if (isDimensionAlreadySelected(currentIndex, dimensionId)) {
            const dimensionName = dimensionOptions.find((opt: any) => opt.value === dimensionId)?.label || 'Dimension';
            return `${dimensionName} is already selected. Please choose a different dimension.`;
        }
        return (errors.dimensions as any)?.[currentIndex]?.dimension_id?.message;
    };

    // Get filtered options for each variant (exclude already selected dimensions)
    const getFilteredDimensionOptions = (currentIndex: number) => {
        const selectedDimensionIds = (watchedProductVariants || [])
            .map((variant: any, index: number) =>
                index !== currentIndex ? variant?.dimension_id : null
            )
            .filter(Boolean);

        return dimensionOptions.filter((option: any) =>
            !selectedDimensionIds.includes(option.value)
        );
    };

    return (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">

            <div className="col-span-full flex flex-col gap-4 xl:gap-7 flex-1">
                <div className="flex gap-4 xl:gap-7">
                    <div className='flex-1'>
                        <Controller
                            name={`dimensions.${index}.dimension_id`}
                            control={control}
                            render={({ field }) => {
                                const selectedOption = dimensionOptions.find((opt: any) => opt.value === field.value?.toString()) || null;
                                const errorMessage = getDimensionErrorMessage(index, field.value);

                                const filteredOptions = getFilteredDimensionOptions(index);

                                return (
                                    <Select
                                        label="Dimension"
                                        options={filteredOptions}
                                        value={selectedOption}
                                        onChange={(selected: SelectOption | null) => {
                                            const newValue = selected?.value || '';
                                            field.onChange(newValue);
                                        }}
                                        displayValue={(selected: SelectOption | null) => selected?.label || ''}
                                        placeholder="Select dimension"
                                        className="w-full"
                                        error={errorMessage}
                                    />
                                );
                            }}
                        />
                    </div>
                    <Input
                        label="Value"
                        placeholder="Enter value"
                        className="flex-grow"
                        {...register(`dimensions.${index}.value`)}
                        error={(errors.dimensions as any)?.[index]?.value?.message}
                    />
                </div>


                <div className="col-span-full">
                    <Controller
                        name={`dimensions.${index}.linked_product_id`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={productOptions}
                                value={productOptions.find((opt: any) => String(opt.value) === field.value) || null}
                                onChange={(selected: any) => {
                                    const selectedId = selected?.value || '';
                                    field.onChange(selectedId);
                                    // update parent linkedProductMap for aggregated linked_product_ids
                                    setLinkedProductMap((prev: Record<number, string>) => {
                                        const next = { ...prev, [index]: selectedId };
                                        return next;
                                    });
                                }}
                                displayValue={(selected: SelectOption | null) => selected?.label || ''}
                                label="Linked Product"
                                dropdownClassName="h-auto"
                                disabled={!selectedDimensionId}
                                placeholder={!selectedDimensionId ? 'Select dimension first' : 'Select linked product'}
                            />
                        )}
                    />
                </div>
            </div>

            {/** remove button **/}
            {fieldsLength > 1 && (
                <ActionIcon
                    onClick={() => remove(index)}
                    variant="flat"
                    className="mt-7 shrink-0"
                >
                    <TrashIcon className="h-4 w-4" />
                </ActionIcon>
            )}
        </div>
    );
}