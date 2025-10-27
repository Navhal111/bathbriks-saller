'use client';

import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import { exportToCSV } from '@/utils/export-to-csv';
import { SellerOrderType } from '@/kit/models/Order';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ordersListColumns } from '@/app/(dashboard)/live-orders/list/columns';
import WidgetCard from '@/components/cards/widget-card';
import cn from '@/utils/class-names';
import KitButton from '@/kit/components/KitButton/KitButton';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends unknown> {
        handleDeleteRow?: (data: TData) => void;
        handleUpdateRow?: (data: TData) => void;
        handleView?: (data: TData) => void;
    }
}

export default function RecentOrder({
    OrderList,
    isLoading,
    className,
    onStatusUpdate,
    onDelete,
    onView,
}: {
    OrderList: SellerOrderType[];
    isLoading: boolean;
    className?: string
    onStatusUpdate: (data: SellerOrderType) => void;
    onDelete: (data: SellerOrderType) => void;
    onView: (data: SellerOrderType) => void;
}) {

    const router = useRouter()

    const handleView = (data: SellerOrderType) => {
        onView(data)
    }

    const handleUpdateRow = (data: SellerOrderType) => {
        onStatusUpdate(data)
    };

    const handleDeleteRow = (data: SellerOrderType) => {
        onDelete(data)
    };

    const { table, setData } = useTanStackTable<SellerOrderType>({
        tableData: OrderList,
        columnConfig: ordersListColumns,
        options: {
            meta: {
                handleDeleteRow,
                handleUpdateRow,
                handleView
            },
            enableColumnResizing: false,
        },
    });

    const selectedData = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);

    function handleExportData() {
        exportToCSV(
            selectedData,
            'ID,Name,Description,Status',
            `category_data_${selectedData.length}`
        );
    }

    useEffect(() => {
        if (Array.isArray(OrderList)) {
            setData(OrderList);
        }
    }, [OrderList, setData]);

    return (
        <WidgetCard
            title="Recent Orders"
            className={cn('p-0 lg:p-0', className)}
            headerClassName="px-5 pt-5 lg:px-7 lg:pt-7 mb-6"
            action={
                <KitButton
                    variant="solid"
                    color="primary"
                    className='!w-32 !h-[36px]'
                    onClick={() => router.push('/live-orders')}
                >
                    Show more
                </KitButton>
            }
        >
            <Table
                table={table}
                variant="modern"
                isLoading={isLoading}
                classNames={{
                    cellClassName: 'first:ps-6',
                    headerCellClassName: 'first:ps-6',
                }}
            />
        </WidgetCard>
    );
}
