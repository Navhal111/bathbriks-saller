'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Text } from 'rizzui';
import { CategoryType } from '@/kit/models/Category';

const columnHelper = createColumnHelper<CategoryType>();

export const categoriesListColumns = [
    columnHelper.accessor('name', {
        id: 'name',
        size: 200,
        header: 'Name',
        cell: ({ row }) => <Text className="text-sm">{row.original.name}</Text>,
    }),
    columnHelper.accessor('slug', {
        id: 'slug',
        size: 200,
        header: 'Slug',
        cell: ({ row }) => <Text className="text-sm">{row.original.slug}</Text>,
    }),
    // columnHelper.accessor('status', {
    //     id: 'status',
    //     size: 120,
    //     header: 'Status',
    //     enableSorting: false,
    //     cell: ({ row }) => getBadge(row.original.status),
    // }),
];
