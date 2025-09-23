'use client';

import DeletePopover from '@/components/delete-popover';
import { allStatus, StatusTypes } from '@/components/table-utils/get-status-badge';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Flex, Select, SelectOption, Text, Tooltip } from 'rizzui';
import { ReturnOrderType } from '@/kit/models/ReturnOrder';
import EyeIcon from '@/components/icons/eye';
import { ORDER_STATUS_OPTIONS } from '@/config/orders';
import cn from '@/utils/class-names';

const columnHelper = createColumnHelper<ReturnOrderType>();

export const returnOrdersListColumns = [
    columnHelper.accessor('orderID', {
        id: 'orderID',
        size: 200,
        header: 'Order ID',
        cell: ({ row }) => <Text className="text-sm">{row.original.orderID}</Text>,
    }),
    columnHelper.display({
        id: 'customerName',
        size: 150,
        header: 'Customer Name',
        cell: ({ row }) => <Text className="text-sm">{row.original.customerName}</Text>,
    }),
    columnHelper.accessor('productQty', {
        id: 'productQty',
        size: 150,
        header: 'Product Quantity',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">{row.original.productQty}</Text>
        ),
    }),
    columnHelper.accessor('price', {
        id: 'price',
        size: 150,
        header: 'Price',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">${row.original.price}</Text>
        ),
    }),
    columnHelper.accessor('finalPrice', {
        id: 'finalPrice',
        size: 150,
        header: 'Final Price',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">${row.original.finalPrice}</Text>
        ),
    }),
    columnHelper.accessor('status', {
        id: 'status',
        size: 120,
        header: 'Status',
        enableSorting: false,
        cell: ({ row, table }) => {
            const currentValue = row.original.status;

            const handleChange = (selected: SelectOption | null) => {
                const newValue: string = selected?.value ? String(selected.value) : '';
                const updatedRow = { ...row.original, status: newValue };
                table.options.meta?.handleUpdateRow?.(updatedRow);
            };

            const key = String(currentValue).toLowerCase() as StatusTypes;
            const currentBgClass = allStatus[key]?.[1] || "bg-gray-600";

            const filteredStatusOptions = ORDER_STATUS_OPTIONS.filter(option => option.value !== 'return');

            return (
                <Select
                    className={cn("custom-pill-select rounded-full text-white", currentBgClass)}
                    options={filteredStatusOptions}
                    value={filteredStatusOptions.find((opt) => opt.value === String(currentValue)) || null}
                    displayValue={(selected: SelectOption | null) => selected?.label || ''}
                    onChange={handleChange}
                />
            );
        }
    }),
    columnHelper.display({
        id: 'action',
        size: 120,
        cell: ({
            row,
            table: {
                options: { meta },
            },
        }) => (
            <Flex align="center" justify="end" gap="3" className="pe-4">
                <Tooltip
                    size="sm"
                    content={'View Return Order'}
                    placement="top"
                    color="invert"
                >
                    <Link href={""}>
                        <ActionIcon
                            as="span"
                            size="sm"
                            variant="outline"
                            aria-label={'View Return Order'}
                            onClick={() => meta?.handleView && meta?.handleView?.(row.original)}
                        >
                            <EyeIcon className="h-4 w-4" />
                        </ActionIcon>
                    </Link>
                </Tooltip>
                <DeletePopover
                    title={`Delete the Return Order`}
                    description={`Are you sure you want to delete this #${row.original.id} Return Order?`}
                    onDelete={() =>
                        meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                    }
                />
            </Flex>
        ),
    }),
];
