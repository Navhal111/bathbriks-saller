'use client';

import { useTanStackTable } from '@/components/table/use-TanStack-Table';
import cn from '@/utils/class-names';
import WidgetCard from '@/components/cards/widget-card';
import Table from '@/components/table';
import { OrderType } from '@/kit/models/Order';
import { ordersListColumns } from '@/app/(dashboard)/live-orders/list/columns';
import KitButton from '@/kit/components/KitButton/KitButton';
import { useRouter } from 'next/navigation';

interface RecentOrderProps {
    OrderList: OrderType[];
    isLoading: boolean;
    className?: string
}

export default function RecentOrder({
    OrderList,
    isLoading,
    className,
}: RecentOrderProps
) {
    const router = useRouter()

    const { table, setData } = useTanStackTable<OrderType>({
        tableData: OrderList,
        columnConfig: ordersListColumns,
        options: {
            initialState: {
                pagination: {
                    pageIndex: 0,
                    pageSize: 7,
                },
            },
            enableColumnResizing: false,
        },
    });
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
                    onClick={() => router.push('/orders')}
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
