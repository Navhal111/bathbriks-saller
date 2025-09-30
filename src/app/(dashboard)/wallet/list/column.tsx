'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';
import dayjs from 'dayjs';
import { getBadge } from '@/components/table-utils/get-badge';
import { WalletType } from '@/kit/models/Wallet';
import Link from 'next/link';
import EyeIcon from '@/components/icons/eye';

const columnHelper = createColumnHelper<WalletType>();

export const walletColumns = [
    columnHelper.accessor('amount', {
        id: 'amount',
        size: 150,
        header: 'Amount',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">₹{row.original.amount}</Text>
        ),
    }),
    columnHelper.accessor('transactionType', {
        id: 'transactionType',
        size: 200,
        header: 'Transaction Type',
        cell: ({ row }) => <Text className="text-sm">{row.original.transactionType}</Text>,
    }),
    columnHelper.accessor('date', {
        id: 'date',
        size: 150,
        header: 'Date',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">{dayjs(row.original.date).format('DD-MMM-YYYY')}</Text>
        ),
    }),
    columnHelper.accessor('status', {
        id: 'status',
        size: 120,
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => getBadge(row.original.status),
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
                    content={'View Wallet'}
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
            </Flex>
        ),
    }),
];
