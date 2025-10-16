'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Text } from 'rizzui';
import { OrderProducts } from '@/kit/models/Order';
import ProductImageCell from './ProductImageCell';

const columnHelper = createColumnHelper<OrderProducts>();

export const OrderViewProductsColumn = [
    columnHelper.accessor('productUrl', {
        id: 'productUrl',
        size: 100,
        header: 'Image',
        enableSorting: false,
        cell: ({ row }) => <ProductImageCell product={row.original} />,
    }),
    columnHelper.accessor('productName', {
        id: 'productName',
        size: 200,
        header: 'Product',
        cell: ({ row }) => <Text className="text-sm">{row.original.productName}</Text>,
    }),
    columnHelper.accessor('sku', {
        id: 'sku',
        size: 200,
        header: 'SKU',
        cell: ({ row }) => <Text className="text-sm">{row.original.sku}</Text>,
    }),
    columnHelper.accessor('mrp', {
        id: 'mrp',
        size: 200,
        header: 'Product MRP',
        cell: ({ row }) => <Text className="text-sm">{row.original.mrp}</Text>,
    }),
    columnHelper.accessor('price', {
        id: 'price',
        size: 200,
        header: 'Product Price',
        cell: ({ row }) => <Text className="text-sm">{row.original.price}</Text>,
    }),
    columnHelper.accessor('quantity', {
        id: 'quantity',
        size: 200,
        header: 'Quantity',
        cell: ({ row }) => <Text className="text-sm">{row.original.quantity}</Text>,
    }),
    columnHelper.accessor('finaPrice', {
        id: 'finaPrice',
        size: 200,
        header: 'Price',
        cell: ({ row }) => {
            const price = row.original.price || 0;
            const quantity = row.original.quantity || 0;
            const total = price * quantity;

            return <Text className="text-sm">{total}</Text>;
        }
    }),
];
