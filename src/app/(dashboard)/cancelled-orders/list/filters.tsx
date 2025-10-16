'use client';

import PriceField from '@/components/controlled-table/price-field';
import { FilterDrawerView } from '@/components/controlled-table/table-filter';
import ToggleColumns from '@/components/table-utils/toggle-columns';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import {
    PiFunnel,
    PiMagnifyingGlassBold,
    PiTrashDuotone,
} from 'react-icons/pi';
import { Button, Flex, Input } from 'rizzui';

interface TableToolbarProps<T extends Record<string, any>> {
    table: ReactTableType<T>;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    search?: { minAmount: string; maxAmount: string };
    setSearch?: (search: { minAmount: string; maxAmount: string }) => void;
}

export default function Filters<TData extends Record<string, any>>({
    table,
    searchQuery,
    setSearchQuery,
    search,
    setSearch
}: TableToolbarProps<TData>) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [tempSearch, setTempSearch] = useState(search || { minAmount: '', maxAmount: '' });

    const {
        options: { meta },
    } = table;

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

            <FilterDrawerView
                isOpen={openDrawer}
                drawerTitle="Table Filters"
                setOpenDrawer={setOpenDrawer}
                onSubmit={() => setSearch?.(tempSearch)}
            >
                <div className="grid grid-cols-1 gap-6">
                    <FilterElements
                        initialSearch={search}
                        onTempChange={(values) => setTempSearch(values)}
                    />
                </div>
            </FilterDrawerView>

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


function FilterElements({
    initialSearch,
    onTempChange,
}: {
    initialSearch?: { minAmount: string; maxAmount: string };
    onTempChange?: (search: { minAmount: string; maxAmount: string }) => void;
}) {
    const [minAmount, setMinAmount] = useState(initialSearch?.minAmount || '');
    const [maxAmount, setMaxAmount] = useState(initialSearch?.maxAmount || '');

    useEffect(() => {
        onTempChange?.({ minAmount, maxAmount });
    }, [minAmount, maxAmount]);
    
    const isFiltered = minAmount !== '' || maxAmount !== '';

    return (
        <>
            <PriceField
                value={[minAmount, maxAmount]}
                onChange={(value) => {
                    setMinAmount(value[0]);
                    setMaxAmount(value[1]);
                }}
                label="Amount"
            />

            {isFiltered && (
                <Button
                    size="sm"
                    onClick={() => {
                        setMinAmount('');
                        setMaxAmount('');
                        onTempChange?.({ minAmount: '', maxAmount: '' });
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


