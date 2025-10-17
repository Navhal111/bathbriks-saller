'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Text } from 'rizzui';
import { BrandType } from '@/kit/models/Brand';

const columnHelper = createColumnHelper<BrandType>();

export const brandListColumns = [
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
    // columnHelper.accessor('status', {
    //     id: 'status',
    //     size: 170,
    //     header: 'Status',
    //     enableSorting: false,
    //     cell: ({ row }) => {
    //         return (
    //             <Badge
    //                 variant="outline"
    //                 className="w-32 font-medium"
    //                 color={getStatusColors(row.original.status as StatusType)}
    //                 data-color={getStatusColors(row.original.status as StatusType)}
    //             >
    //                 {row.original.status}
    //             </Badge>
    //         );
    //     },
    // }),
];
