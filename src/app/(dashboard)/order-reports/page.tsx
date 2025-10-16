'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import { useDeleteOrder, useGetAllOrderList, useUpdateOrder } from '@/kit/hooks/data/order';
import { ordersData } from '@/data/orders-data';
import { OrderType } from '@/kit/models/Order';
import toast from 'react-hot-toast';
import OrderViewModal from '@/views/order/OrderViewModal';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import OrderReportsTable from './list/table';
import { filterParamsProps } from '../live-orders/page';
import KitMetricCard from '@/kit/components/KitMetricCard/KitMetricCard';
import TicketIcon from '@/components/icons/ticket';
import { CustomErrorType } from '@/kit/models/CustomError';
import KitStatusDialog from '@/kit/components/KitStatusDialog';

const pageHeader = {
    title: 'Order Reports',
    breadcrumb: [
        {
            href: "/dashboard",
            name: 'Dashboard',
        },
        {
            name: 'Order Reports List',
        },
    ],
};

export const filterParams: filterParamsProps = {
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
    status: '',
};

const ticketStats = [
    {
        id: 1,
        icon: <TicketIcon className="h-full w-full" />,
        title: 'Total Orders',
        metric: '₹ 12,450',
    },
    {
        id: 2,
        icon: <TicketIcon className="h-full w-full" />,
        title: 'Total Orders Amount',
        metric: '₹ 3,590',
    },
    {
        id: 3,
        icon: <TicketIcon className="h-full w-full" />,
        title: 'Total Active Orders',
        metric: '7,890',
    },
    {
        id: 3,
        icon: <TicketIcon className="h-full w-full" />,
        title: 'Total Cancellation Orders',
        metric: '1,160',
    },
];

export default function OrderReportsPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState<filterParamsProps>(filterParams);
    const [selectedOrder, setSelectedOrder] = useState<OrderType>()
    const [orderId, setOrderId] = useState<string>('');
    const [actionType, setActionType] = useState<'delete' | 'update' | null>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false)
    const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false)

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const queryParams = {
        page: page,
        size: pageSize,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(search.minAmount && { startDate: search.minAmount }),
        ...(search.maxAmount && { endDate: search.maxAmount }),
    }

    const { OrderList, isOrderListLoading, refreshOrderList } = useGetAllOrderList(queryParams);
    const { deleteRecord, isDeleting } = useDeleteOrder(orderId || '');
    const { update: onUpdateOrder, isUpdatingOrder } = useUpdateOrder(String(selectedOrder?.id));

    const toggleOrderModal = () => setIsOrderModalOpen(!isOrderModalOpen)
    const toggleStatusModal = () => setIsStatusModalOpen(!isStatusModalOpen)

    const orderDelete = async (data: OrderType) => {
        setOrderId(String(data.id))
        setSelectedOrder(data)
        setActionType('delete');
    };

    const onStatusUpdate = async (data: OrderType) => {
        setSelectedOrder(data)
        toggleStatusModal()
    };

    const orderView = (data: OrderType) => {
        setSelectedOrder(data)
        toggleOrderModal()
    }

    const onhandleStatusUpdate = async () => {
        if (!selectedOrder) return

        try {
            const response = await onUpdateOrder({ ...selectedOrder })
            toast.success(response?.message || 'Order updated successfully!')
            toggleStatusModal()
            refreshOrderList?.();
        } catch (error) {
            toast.error((error as CustomErrorType)?.message)
        }
    }

    useEffect(() => {
        const performAction = async () => {
            if (!orderId || !actionType) return;

            try {
                if (actionType === 'delete' && selectedOrder) {
                    await deleteRecord(selectedOrder);
                    toast.success("Order deleted successfully!");
                }
                refreshOrderList?.();
            } catch (error) {
                toast.error("Failed to perform action");
            } finally {
                setOrderId('');
                setSelectedOrder(undefined);
                setActionType(null);
            }
        };

        performAction();
    }, [orderId, actionType]);

    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
                <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                    <ExportButton
                        data={ordersData}
                        fileName="category_data"
                        header="ID,OrderID,CustomerName,ProductQty,Price,FinalPrice,Status"
                    />
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 gap-5 xl:gap-8 xl:grid-cols-2 2xl:grid-cols-4 2xl:gap-8 mb-4">
                {ticketStats.map((stat) => (
                    <KitMetricCard
                        key={stat.title + stat.id}
                        title={stat.title}
                        metric={stat.metric}
                        icon={stat.icon}
                        iconClassName="bg-transparent w-11 h-11"
                    />
                ))}
            </div>

            <OrderReportsTable
                OrderList={ordersData}
                isLoading={false}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={OrderList?.meta}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                onDelete={orderDelete}
                onStatusUpdate={onStatusUpdate}
                onView={orderView}
                search={search}
                setSearch={setSearch}
            />

            <KitShow show={isOrderModalOpen}>
                <OrderViewModal
                    isOpen={isOrderModalOpen}
                    onClose={toggleOrderModal}
                    selectedOrder={selectedOrder}
                />
            </KitShow>

            <KitShow show={isStatusModalOpen}>
                <KitStatusDialog
                    isOpen={isStatusModalOpen}
                    onClose={toggleStatusModal}
                    title={selectedOrder?.status}
                    onDelete={onhandleStatusUpdate}
                    isBtnLoading={false}
                />
            </KitShow>
        </>
    );
}