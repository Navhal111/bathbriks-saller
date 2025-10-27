'use client';

import DeletePopover from '@/components/delete-popover';
import { getRatings } from '@/components/table-utils/get-ratings';
import { getBadge } from '@/components/table-utils/get-badge';
import { getStockStatus } from '@/components/table-utils/get-stock-status';
import { ProductType } from '@/data/products-data';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Badge, Checkbox, Flex, Text, Tooltip } from 'rizzui';
import { ProductData } from '@/kit/models/Product';
import { ProductStatus } from '@/config/enums';

const columnHelper = createColumnHelper<ProductData>();

export const productsListColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  // columnHelper.accessor('name', {
  //   id: 'name',
  //   size: 300,
  //   header: 'Product',
  //   enableSorting: false,
  //   cell: ({ row }) => (
  //     <AvatarCard
  //       // src={row.original.image}
  //       src={''}
  //       name={row.original.name}
  //       description={row.original.description}
  //       avatarProps={{
  //         name: row.original.name,
  //         size: 'lg',
  //         className: 'rounded-lg',
  //       }}
  //     />
  //   ),
  // }),
  columnHelper.display({
    id: 'name',
    size: 150,
    header: 'Product',
    cell: ({ row }) => <Text className="text-sm">{row.original.name}</Text>,
  }),
  columnHelper.display({
    id: 'category',
    size: 150,
    header: 'Category',
    cell: ({ row }) => <Text className="text-sm">{row.original.category?.name}</Text>,
  }),
  columnHelper.display({
    id: 'brand',
    size: 150,
    header: 'Brand',
    cell: ({ row }) => <Text className="text-sm">{row.original.brand?.name}</Text>,
  }),
  columnHelper.accessor('mrp', {
    id: 'mrp',
    size: 150,
    header: 'MRP',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">${row.original.mrp}</Text>
    ),
  }),
  columnHelper.display({
    id: 'quantity',
    size: 150,
    header: 'Quantity',
    cell: ({ row }) => <Text className="text-sm">{row.original.quantity}</Text>,
  }),
  columnHelper.display({
    id: 'status',
    size: 150,
    header: 'Status',
    cell: ({ row, table: { options: { meta } } }) => {
      const status = row.original.status || ProductStatus.DRAFT;
      const canSendForReview = status === ProductStatus.DRAFT || status === ProductStatus.REJECTED;

      const getStatusBadge = (status: string) => {
        const badgeProps = {
          className: canSendForReview ? 'cursor-pointer hover:opacity-80 transition-opacity' : '',
          onClick: canSendForReview ? () => meta?.handleSendForReview && meta?.handleSendForReview(row.original) : undefined,
        };

        switch (status) {
          case ProductStatus.DRAFT:
            return <Badge variant="outline" color="secondary" className={`text-gray-600 border-gray-300 ${badgeProps.className}`} {...(badgeProps.onClick && { onClick: badgeProps.onClick })}>{status}</Badge>;
          case ProductStatus.PENDING_APPROVAL:
            return <Badge variant="outline" color="warning" className="text-orange-600 border-orange-300">{status.replace('_', ' ')}</Badge>;
          case ProductStatus.REJECTED:
            return <Badge variant="outline" color="danger" className={`text-red-600 border-red-300 ${badgeProps.className}`} {...(badgeProps.onClick && { onClick: badgeProps.onClick })}>{status}</Badge>;
          case ProductStatus.LIVE:
            return <Badge variant="outline" color="success" className="text-green-600 border-green-300">{status}</Badge>;
          case ProductStatus.DELETED_BY_SELLER:
            return <Badge variant="outline" color="danger" className="text-red-700 border-red-400">{status.replace(/_/g, ' ')}</Badge>;
          case ProductStatus.REMOVED_BY_ADMIN:
            return <Badge variant="outline" color="danger" className="text-red-800 border-red-500">{status.replace(/_/g, ' ')}</Badge>;
          case ProductStatus.DEACTIVATED:
            return <Badge variant="outline" color="secondary" className="text-gray-700 border-gray-400">{status}</Badge>;
          default:
            return <Badge variant="outline" color="secondary">{status}</Badge>;
        }
      };
      return getStatusBadge(status);
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
          content={'Edit Product'}
          placement="top"
          color="invert"
        >
          <Link href={""}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Product'}
              onClick={() => meta?.handleEditRow && meta?.handleEditRow?.(row.original)}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Product'}
          placement="top"
          color="invert"
        >
          <Link href={""}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'View Product'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this #${row.original.id} product?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
