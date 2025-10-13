'use client';

import DeletePopover from '@/components/delete-popover';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Badge, Flex, Text, Tooltip } from 'rizzui';
import { OrderType } from '@/kit/models/Order';
import EyeIcon from '@/components/icons/eye';
import dayjs from 'dayjs';
import { getStatusColors } from '@/components/table-utils/get-status-color';
import { StatusType } from '@/config/categories';

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
        size: 170,
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => {
            return (
                <Badge
                    variant="outline"
                    className="w-32 font-medium"
                    color={getStatusColors(row.original.status as StatusType)}
                    data-color={getStatusColors(row.original.status as StatusType)}
                >
                    {row.original.status}
                </Badge>
            );
        },
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
