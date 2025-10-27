'use client';

import DateFiled from '@/components/controlled-table/date-field';
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
    search?: { startDate: string; endDate: string };
    setSearch?: (search: { startDate: string; endDate: string }) => void;
}

export default function Filters<TData extends Record<string, any>>({
    table,
    searchQuery,
    setSearchQuery,
    search,
    setSearch
}: TableToolbarProps<TData>) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [tempSearch, setTempSearch] = useState(search || { startDate: '', endDate: '' });

    const {
        options: { meta },
    } = table;

    return (
        <Flex align="center" justify="between" className="mb-4">
            <Input
                type="search"
                placeholder="Search by transaction..."
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
    initialSearch?: { startDate: string; endDate: string };
    onTempChange?: (search: { startDate: string; endDate: string }) => void;
}) {

    const [startDate, setStartDate] = useState(initialSearch?.startDate || '');
    const [endDate, setEndDate] = useState(initialSearch?.endDate || '');

    useEffect(() => {
        onTempChange?.({ startDate, endDate });
    }, [startDate, endDate]);

    const isFiltered = startDate !== '' || endDate !== '';

    return (
        <>
            <DateFiled
                selectsRange
                dateFormat={'dd-MMM-yyyy'}
                className="w-full"
                placeholderText="Select date range"
                startDate={startDate ? new Date(startDate) : null}
                endDate={endDate ? new Date(endDate) : null}
                selected={startDate ? new Date(startDate) : null}
                onChange={(date) => {
                    setStartDate(date[0] ? date[0].toLocaleDateString('en-CA') : '');
                    setEndDate(date[1] ? date[1].toLocaleDateString('en-CA') : '');
                }}
                inputProps={{
                    label: 'Date Range',
                }}
            />

            {isFiltered && (
                <Button
                    size="sm"
                    onClick={() => {
                        setStartDate('');
                        setEndDate('');
                        onTempChange?.({ startDate: '', endDate: '' });
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

