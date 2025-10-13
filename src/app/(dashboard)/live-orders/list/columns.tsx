'use client';

import DeletePopover from '@/components/delete-popover';
import { allStatus, StatusTypes } from '@/components/table-utils/get-status-badge';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Flex, Select, SelectOption, Text, Tooltip } from 'rizzui';
import { OrderType } from '@/kit/models/Order';
import EyeIcon from '@/components/icons/eye';
import { LIVE_ORDER_STATUS_OPTIONS } from '@/config/orders';
import cn from '@/utils/class-names';
import dayjs from 'dayjs';

const columnHelper = createColumnHelper<OrderType>();

export const ordersListColumns = [
    columnHelper.accessor('date', {
        id: 'date',
        size: 150,
        header: 'Date',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">{dayjs(row.original.date).format('DD-MMM-YYYY')}</Text>
        ),
    }),
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
    columnHelper.display({
        id: 'customerNumber',
        size: 150,
        header: 'Customer Number',
        cell: ({ row }) => <Text className="text-sm">{row.original.customerNumber}</Text>,
    }),
    columnHelper.accessor('productQty', {
        id: 'productQty',
        size: 150,
        header: 'Quantity',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">{row.original.productQty}</Text>
        ),
    }),
    columnHelper.accessor('totalMrp', {
        id: 'totalMrp',
        size: 150,
        header: 'Amount',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">₹ {row.original.totalMrp}</Text>
        ),
    }),
    // columnHelper.accessor('totalPrice', {
    //     id: 'totalPrice',
    //     size: 150,
    //     header: 'Final Price',
    //     cell: ({ row }) => (
    //         <Text className="font-medium text-gray-700">₹{row.original.totalPrice}</Text>
    //     ),
    // }),
    columnHelper.accessor('deliveryPincode', {
        id: 'deliveryPincode',
        size: 150,
        header: 'Delivery Pincode',
        cell: ({ row }) => (
            <Text className="text-gray-700">{row.original.deliveryPincode}</Text>
        ),
    }),
    columnHelper.accessor('deliveryCity', {
        id: 'deliveryCity',
        size: 150,
        header: 'Delivery City',
        cell: ({ row }) => (
            <Text className="text-gray-700">{row.original.deliveryCity}</Text>
        ),
    }),
    columnHelper.accessor('paymentMode', {
        id: 'paymentMode',
        size: 150,
        header: 'Payment Mode',
        cell: ({ row }) => (
            <Text className="text-gray-700">{row.original.paymentMode}</Text>
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
                const newValue: string = selected?.value ? String(selected.value) : '';
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
