'use client';

import DeletePopover from '@/components/delete-popover';
import { getStatusBadge } from '@/components/table-utils/get-status-badge';
import PencilIcon from '@/components/icons/pencil';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';
import { CategoryType } from '@/kit/models/Category';

const columnHelper = createColumnHelper<CategoryType>();

export const categoriesListColumns = [
    columnHelper.accessor('name', {
        id: 'name',
        size: 200,
        header: 'Name',
        cell: ({ row }) => <Text className="text-sm">{row.original.name}</Text>,
    }),
    columnHelper.display({
        id: 'description',
        size: 150,
        header: 'Description',
        cell: ({ row }) => <Text className="text-sm">{row.original.description}</Text>,
    }),
    columnHelper.accessor('status', {
        id: 'status',
        size: 120,
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => getStatusBadge(row.original.status),
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
                    content={'Edit Category'}
                    placement="top"
                    color="invert"
                >
                    <Link href={""}>
                        <ActionIcon
                            as="span"
                            size="sm"
                            variant="outline"
                            aria-label={'Edit Category'}
                            onClick={() => meta?.handleEditRow && meta?.handleEditRow?.(row.original)}
                        >
                            <PencilIcon className="h-4 w-4" />
                        </ActionIcon>
                    </Link>
                </Tooltip>
                <DeletePopover
                    title={`Delete the Category`}
                    description={`Are you sure you want to delete this #${row.original.id} Category?`}
                    onDelete={() =>
                        meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                    }
                />
            </Flex>
        ),
    }),
];
