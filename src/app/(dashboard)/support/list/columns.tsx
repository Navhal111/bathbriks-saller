'use client';

import DeletePopover from '@/components/delete-popover';
import ChatIcon from '@/components/icons/chat-solid';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Badge, Flex, Text, Tooltip } from 'rizzui';
import { getStatusColors } from '@/components/table-utils/get-status-color';
import dayjs from 'dayjs';
import { SupoortType } from '@/kit/models/Supoort';
import KitShow from '@/kit/components/KitShow/KitShow';
import { StatusType } from '@/config/categories';

const columnHelper = createColumnHelper<SupoortType>();

export const supportListColumns = [
    columnHelper.accessor('title', {
        id: 'title',
        size: 200,
        header: 'Title',
        cell: ({ row }) => <Text className="text-sm">{row.original.title}</Text>,
    }),
    columnHelper.accessor('description', {
        id: 'description',
        size: 200,
        header: 'Description',
        cell: ({ row }) => <Text className="text-sm">{row.original.description}</Text>,
    }),
    columnHelper.accessor('date', {
        id: 'date',
        size: 200,
        header: 'Date',
        cell: ({ row }) => <Text className="font-medium text-gray-700">{dayjs(row.original.date).format('DD-MMM-YYYY')}</Text>
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
                <KitShow show={row.original.status !== 'resolved'}>
                    <Tooltip
                        size="sm"
                        content={'Chat'}
                        placement="top"
                        color="invert"
                    >
                        <Link href={""}>
                            <ActionIcon
                                as="span"
                                size="sm"
                                variant="outline"
                                aria-label={'Chat'}
                                onClick={() => meta?.handlChatRow && meta?.handlChatRow?.(row.original)}
                            >
                                <ChatIcon className="h-4 w-4" />
                            </ActionIcon>
                        </Link>
                    </Tooltip>
                </KitShow>
                <DeletePopover
                    title={`Delete the Support`}
                    description={`Are you sure you want to delete this #${row.original.id} Support?`}
                    onDelete={() =>
                        meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                    }
                />
            </Flex>
        ),
    }),
];
