'use client';

import DeletePopover from '@/components/delete-popover';
import PencilIcon from '@/components/icons/pencil';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Badge, Flex, Text, Tooltip } from 'rizzui';
import { getBadge } from '@/components/table-utils/get-badge';
import { BrandType } from '@/kit/models/Brand';
import { getStatusColors } from '@/components/table-utils/get-status-color';
import { StatusType } from '@/config/categories';

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
                    content={'Edit Brand'}
                    placement="top"
                    color="invert"
                >
                    <Link href={""}>
                        <ActionIcon
                            as="span"
                            size="sm"
                            variant="outline"
                            aria-label={'Edit Brand'}
                            onClick={() => meta?.handleEditRow && meta?.handleEditRow?.(row.original)}
                        >
                            <PencilIcon className="h-4 w-4" />
                        </ActionIcon>
                    </Link>
                </Tooltip>
                <DeletePopover
                    title={`Delete the Brand`}
                    description={`Are you sure you want to delete this #${row.original.id} Brand?`}
                    onDelete={() =>
                        meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                    }
                />
            </Flex>
        ),
    }),
];
