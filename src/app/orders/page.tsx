'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';
import { categoriesData } from '@/data/categories-data';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import AddUpdateCategoryModal from '@/views/category/AddUpdateCategoryModal';
import { CategoryType } from '@/kit/models/Category';
import { useGetAllCategoryList } from '@/kit/hooks/data/category';
import { useDeleteOrder, useGetAllOrderList, useUpdateOrder } from '@/kit/hooks/data/order';
import { ordersData } from '@/data/orders-data';
import OrdersTable from './list/table';
import { OrderType } from '@/kit/models/Order';
import toast from 'react-hot-toast';
import { CustomErrorType } from '@/kit/models/CustomError';
import OrderViewModal from '@/views/order/OrderViewModal';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';

const pageHeader = {
    title: 'Orders',
    breadcrumb: [
        {
            href: "/",
            name: 'Dashboard',
        },
        {
            name: 'Orders List',
        },
    ],
};

export default function OrdersPage() {
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
    const { update: onUpdateOrder, isUpdatingOrder } = useUpdateOrder(orderId);

    const toggleOrderModal = () => setIsOrderModalOpen(!isOrderModalOpen)

    const orderDelete = async (data: OrderType) => {
        setOrderId(String(data.id))
        setSelectedOrder(data)
        setActionType('delete');
    };

    const onStatusUpdate = async (data: OrderType) => {
        setOrderId(String(data.id))
        setSelectedOrder(data)
        setActionType('update');
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

                if (actionType === 'update' && selectedOrder) {
                    const { id, createdAt, updatedAt, ...rest } = selectedOrder;
                    const updatedRow = { ...rest };
                    await onUpdateOrder(updatedRow as Partial<OrderType>);
                    toast.success("Order updated successfully!");
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

            <OrdersTable
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
        </>
    );
}
