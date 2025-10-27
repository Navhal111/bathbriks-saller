'use client';

import DeletePopover from '@/components/delete-popover';
import { allStatus, StatusTypes } from '@/components/table-utils/get-status-badge';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Flex, Select, SelectOption, Text, Tooltip } from 'rizzui';
import { SellerOrderType } from '@/kit/models/Order';
import EyeIcon from '@/components/icons/eye';
import { LIVE_ORDER_STATUS_OPTIONS } from '@/config/orders';
import cn from '@/utils/class-names';
import dayjs from 'dayjs';

const columnHelper = createColumnHelper<SellerOrderType>();

export const ordersListColumns = [
    columnHelper.accessor('order_date', {
        id: 'order_date',
        size: 150,
        header: 'Date',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">{dayjs(row.original.order_date).format('DD-MMM-YYYY')}</Text>
        ),
    }),
    columnHelper.accessor('id', {
        id: 'id',
        size: 200,
        header: 'Order ID',
        cell: ({ row }) => <Text className="text-sm">#{row.original.id}</Text>,
    }),
    columnHelper.display({
        id: 'customerName',
        size: 150,
        header: 'Customer Name',
        cell: ({ row }) => <Text className="text-sm">{row.original.user?.name || 'N/A'}</Text>,
    }),
    columnHelper.display({
        id: 'customerNumber',
        size: 150,
        header: 'Customer Number',
        cell: ({ row }) => <Text className="text-sm">{row.original.user?.mobile || 'N/A'}</Text>,
    }),
    columnHelper.display({
        id: 'productQty',
        size: 150,
        header: 'Quantity',
        cell: ({ row }) => {
            const totalQty = row.original.orderitems?.reduce((sum, item) => sum + item.qty, 0) || 0;
            return <Text className="font-medium text-gray-700">{totalQty}</Text>;
        },
    }),
    columnHelper.accessor('total_price', {
        id: 'total_price',
        size: 150,
        header: 'Amount',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">₹ {row.original.total_price}</Text>
        ),
    }),
    columnHelper.display({
        id: 'email',
        size: 150,
        header: 'Customer Email',
        cell: ({ row }) => (
            <Text className="text-gray-700">{row.original.user?.email || 'N/A'}</Text>
        ),
    }),
    columnHelper.accessor('paymentType', {
        id: 'paymentType',
        size: 150,
        header: 'Payment Mode',
        cell: ({ row }) => (
            <Text className="text-gray-700 capitalize">{row.original.paymentType}</Text>
        ),
    }),
    columnHelper.accessor('status', {
        id: 'status',
        size: 150,
        header: 'Status',
        enableSorting: false,
        cell: ({ row, table }) => {
            const currentValue = row.original.status;

            const handleChange = (selected: SelectOption | null) => {
                // const newValue: string = selected?.value ? String(selected.value) : '';
                const newValue = selected?.value as SellerOrderType["status"];
                const updatedRow = { ...row.original, status: newValue };
                table.options.meta?.handleUpdateRow?.(updatedRow);
            };

            const key = String(currentValue).toLowerCase() as StatusTypes;
            const currentBgClass = allStatus[key]?.[0] || "bg-gray-600";

            return (
                <Select
                    className={cn("custom-pill-select rounded-full text-white border", currentBgClass, allStatus[key]?.[2])}
                    size='sm'
                    options={LIVE_ORDER_STATUS_OPTIONS}
                    value={LIVE_ORDER_STATUS_OPTIONS.find((opt) => opt.value === String(currentValue)) || null}
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
                    content={'View Order'}
                    placement="top"
                    color="invert"
                >
                    <Link href={""}>
                        <ActionIcon
                            as="span"
                            size="sm"
                            variant="outline"
                            aria-label={'View Order'}
                            onClick={() => meta?.handleView && meta?.handleView?.(row.original)}
                        >
                            <EyeIcon className="h-4 w-4" />
                        </ActionIcon>
                    </Link>
                </Tooltip>
                <DeletePopover
                    title={`Delete the Order`}
                    description={`Are you sure you want to delete this #${row.original.id} Order?`}
                    onDelete={() =>
                        meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                    }
                />
            </Flex>
        ),
    }),
];