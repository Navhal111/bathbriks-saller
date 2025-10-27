'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Text } from 'rizzui';
import { SubCategoryData } from '@/kit/models/SubCategory';

const columnHelper = createColumnHelper<SubCategoryData>();

export const subCategoriesListColumns = [
    columnHelper.accessor('name', {
        id: 'name',
        size: 200,
        header: 'Name',
        cell: ({ row }) => <Text className="text-sm">{row?.original?.name}</Text>,
    }),
    columnHelper.display({
        id: 'slug',
        size: 150,
        header: 'Slug',
        cell: ({ row }) => <Text className="text-sm">{row?.original?.slug}</Text>,
    }),
    columnHelper.display({
        id: 'category',
        size: 150,
        header: 'Category',
        cell: ({ row }) => <Text className="text-sm">{row?.original?.category?.name}</Text>,
    }),
    // columnHelper.accessor('status', {
    //     id: 'status',
    //     size: 120,
    //     header: 'Status',
    //     enableSorting: false,
    //     cell: ({ row }) => getBadge(row.original.status),
    // }),
];
