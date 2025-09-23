'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Text } from 'rizzui';
import dayjs from 'dayjs';
import { getBadge } from '@/components/table-utils/get-badge';
import { WalletType } from '@/kit/models/Wallet';

const columnHelper = createColumnHelper<WalletType>();

export const walletColumns = [
    columnHelper.accessor('amount', {
        id: 'amount',
        size: 150,
        header: 'Amount',
        cell: ({ row }) => (
            <Text className="font-medium text-gray-700">${row.original.amount}</Text>
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
];
