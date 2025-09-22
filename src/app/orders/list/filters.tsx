'use client';

import ToggleColumns from '@/components/table-utils/toggle-columns';
import { type Table as ReactTableType } from '@tanstack/react-table';
import {
    PiMagnifyingGlassBold,
    PiTrash,
} from 'react-icons/pi';
import { Button, Flex, Input } from 'rizzui';

interface TableToolbarProps<T extends Record<string, any>> {
    table: ReactTableType<T>;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
}

export default function Filters<TData extends Record<string, any>>({
    table,
    searchQuery,
    setSearchQuery,
}: TableToolbarProps<TData>) {
    const isMultipleSelected = table.getSelectedRowModel().rows.length > 1;

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

            <Flex align="center" gap="3" className="w-auto">
                {isMultipleSelected ? (
                    <Button
                        color="danger"
                        variant="outline"
                        className="h-[34px] gap-2 text-sm"
                        onClick={() => {

                        }}
                    >
                        <PiTrash size={18} />
                        Delete
                    </Button>
                ) : null}

                <ToggleColumns table={table} />
            </Flex>
        </Flex>
    );
}
