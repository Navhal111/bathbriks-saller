'use client';

import DateFiled from '@/components/controlled-table/date-field';
import PriceField from '@/components/controlled-table/price-field';
import { FilterDrawerView } from '@/components/controlled-table/table-filter';
import ToggleColumns from '@/components/table-utils/toggle-columns';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useState } from 'react';
import { PiFunnel, PiMagnifyingGlassBold, PiTrashDuotone } from 'react-icons/pi';
import { Button, Flex, Input, SelectOption } from 'rizzui';
import { filterParamsProps } from '../page';
import StatusField from '@/components/controlled-table/status-field';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { LIVE_ORDER_STATUS_OPTIONS } from '@/config/orders';

interface TableToolbarProps<T extends Record<string, any>> {
    table: ReactTableType<T>;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    search?: filterParamsProps;
    setSearch?: (search: filterParamsProps) => void;
}

export default function Filters<TData extends Record<string, any>>({
    table,
    searchQuery,
    setSearchQuery,
    search,
    setSearch
}: TableToolbarProps<TData>) {
    const [openDrawer, setOpenDrawer] = useState(false);

    const methods = useForm<filterParamsProps>({
        defaultValues: search ?? {
            minAmount: '',
            maxAmount: '',
            startDate: '',
            endDate: '',
            status: '',
        },
    });

    const { register, handleSubmit, setValue, reset, watch } = methods;

    const onSubmit = (values: filterParamsProps) => {
        setSearch?.(values);
    };

    return (
        <Flex align="center" justify="between" className="mb-4">
            <Input
                type="search"
                placeholder="Search by customer name..."
                value={searchQuery}
                onClear={() => setSearchQuery?.('')}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                inputClassName="h-9"
                clearable={true}
                prefix={<PiMagnifyingGlassBold className="size-4" />}
            />
            <FormProvider {...methods}>
                <FilterDrawerView
                    isOpen={openDrawer}
                    drawerTitle="Table Filters"
                    setOpenDrawer={setOpenDrawer}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 gap-6">
                        <FilterElements />
                    </div>
                </FilterDrawerView>
            </FormProvider>

            <Flex align="center" gap="3" className="w-auto">
                <Button
                    variant={'outline'}
                    onClick={() => setOpenDrawer(!openDrawer)}
                    className="h-9 pe-3 ps-2.5"
                >
                    <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
                    Filters
                </Button>

                <ToggleColumns table={table} />
            </Flex>
        </Flex>
    );
}

function FilterElements() {

    const { control, watch, setValue, reset } = useFormContext<filterParamsProps>();

    const values = watch();
    const isFiltered = Object.values(values).some((val) => val !== '');

    return (
        <>
            <Controller
                name="minAmount"
                control={control}
                render={({ field: { value: minValue, onChange: onMinChange } }) => (
                    <Controller
                        name="maxAmount"
                        control={control}
                        render={({ field: { value: maxValue, onChange: onMaxChange } }) => (
                            <PriceField
                                value={[minValue, maxValue]}
                                onChange={([min, max]) => {
                                    onMinChange(min);
                                    onMaxChange(max);
                                }}
                                label="Amount"
                            />
                        )}
                    />
                )}
            />

            <DateFiled
                selectsRange
                dateFormat={'dd-MMM-yyyy'}
                className="w-full"
                placeholderText="Select date range"
                startDate={watch('startDate') ? new Date(watch('startDate')) : null}
                endDate={watch('endDate') ? new Date(watch('endDate')) : null}
                onChange={(date) => {
                    setValue('startDate', date[0]?.toLocaleDateString('en-CA') ?? '');
                    setValue('endDate', date[1]?.toLocaleDateString('en-CA') ?? '');
                }}
                inputProps={{ label: 'Date Range' }}
            />

            <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <StatusField
                        options={LIVE_ORDER_STATUS_OPTIONS}
                        value={LIVE_ORDER_STATUS_OPTIONS.find(opt => String(opt.value) === value) || null}
                        onChange={(selected: any) => {
                            onChange(selected ?? null);
                        }}
                        displayValue={(selected: SelectOption | null) => selected?.label || ''}
                        getOptionValue={(option: { value: any }) => option.value}
                        dropdownClassName="!z-20 h-auto"
                        className={'w-auto'}
                        label="Status"
                    />
                )}
            />

            {isFiltered && (
                <Button
                    size="sm"
                    onClick={() => {
                        reset();
                    }}
                    variant="flat"
                    className="h-9 bg-gray-200/70"
                >
                    <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
                </Button>
            )}
        </>
    );
}


