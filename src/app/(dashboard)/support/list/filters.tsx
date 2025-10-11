'use client';

import ToggleColumns from '@/components/table-utils/toggle-columns';
import { SUPPORT_STATUS_OPTIONS } from '@/config/support';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useState } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Flex, Input, Select } from 'rizzui';

interface TableToolbarProps<T extends Record<string, any>> {
    table: ReactTableType<T>;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
}

export default function Filters<TData extends Record<string, any>>({
    table,
    searchQuery,
    setSearchQuery
}: TableToolbarProps<TData>) {

    const [statusOptions, setStatusOptions] = useState('')

    const {
        options: { meta },
    } = table;

    return (
        <Flex align="center" justify="between" className="mb-4">
            <Input
                type="search"
                placeholder="Search by brand name..."
                value={searchQuery ?? ''}
                onClear={() => setSearchQuery?.('')}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                inputClassName="h-9"
                clearable={true}
                prefix={<PiMagnifyingGlassBold className="size-4" />}
            />

            <Select
                selectClassName="!h-9 !w-48"
                placeholder="Filter status"
                options={SUPPORT_STATUS_OPTIONS}
                value={statusOptions}
                onChange={(selected: any) => setStatusOptions(selected.value)}
            />

            <Flex align="center" gap="3" className="w-auto">
                <ToggleColumns table={table} />
            </Flex>
        </Flex>
    );
}
