'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import { useDeleteOrder, useGetAllOrderList } from '@/kit/hooks/data/order';
import { ordersData } from '@/data/orders-data';
import { OrderType } from '@/kit/models/Order';
import toast from 'react-hot-toast';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import DeliveredOrdersTable from './list/table';
import { deliveredOrdersData } from '@/data/delivered-orders-data';
import OrderStatusViewModal from '@/views/order/OrderStatusViewModal';

const pageHeader = {
    title: 'Delivered Orders',
    breadcrumb: [
        {
            href: "/dashboard",
            name: 'Dashboard',
        },
        {
            name: 'Delivered Orders List',
        },
    ],
};

export default function DeliveredOrdersPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState({
        minAmount: '',
        maxAmount: '',
    })
    const [selectedOrder, setSelectedOrder] = useState<OrderType>()
    const [orderId, setOrderId] = useState<string>('');
    const [actionType, setActionType] = useState<'delete' | 'update' | null>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false)

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

    const toggleOrderModal = () => setIsOrderModalOpen(!isOrderModalOpen)

    const orderDelete = async (data: OrderType) => {
        setOrderId(String(data.id))
        setSelectedOrder(data)
        setActionType('delete');
    };

    const orderView = (data: OrderType) => {
        setSelectedOrder(data)
        toggleOrderModal()
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

            <DeliveredOrdersTable
                DeliveredOrderList={deliveredOrdersData}
                isLoading={false}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={OrderList?.meta}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                onDelete={orderDelete}
                onView={orderView}
                search={search}
                setSearch={setSearch}
            />

            <KitShow show={isOrderModalOpen}>
                <OrderStatusViewModal
                    isOpen={isOrderModalOpen}
                    onClose={toggleOrderModal}
                    selectedOrder={selectedOrder}
                />
            </KitShow>
        </>
    );
}
