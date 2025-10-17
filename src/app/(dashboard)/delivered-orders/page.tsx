'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import { SellerOrderType } from '@/kit/models/Order';
import toast from 'react-hot-toast';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import DeliveredOrdersTable from './list/table';
import { OrderStatus } from '@/config/orders';
import { useDeleteSellerOrder, useGetSellerOrderList } from '@/kit/hooks/data/liveOrder';
import OrderViewModal from '@/views/order/OrderViewModal';

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

export interface filterParamsProps {
    minAmount: string,
    maxAmount: string,
    startDate: string,
    endDate: string,
}

export const filterParams: filterParamsProps = {
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
};

export default function DeliveredOrdersPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState<filterParamsProps>(filterParams);
    const [selectedOrder, setSelectedOrder] = useState<SellerOrderType>()
    const [orderId, setOrderId] = useState<string>('');
    const [actionType, setActionType] = useState<'delete' | 'update' | null>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false)

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const queryParams = {
        page: page,
        size: pageSize,
        status: OrderStatus.DELIVERED,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(search.minAmount && { startDate: search.minAmount }),
        ...(search.maxAmount && { endDate: search.maxAmount }),
    }

    const { SellerOrderList, isSellerOrderListLoading, refreshSellerOrderList } = useGetSellerOrderList(queryParams);
    const { deleteRecord, isDeleting } = useDeleteSellerOrder(orderId || '');

    const toggleOrderModal = () => setIsOrderModalOpen(!isOrderModalOpen)

    const orderDelete = async (data: SellerOrderType) => {
        setOrderId(String(data.id))
        setSelectedOrder(data)
        setActionType('delete');
    };

    const orderView = (data: SellerOrderType) => {
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

                refreshSellerOrderList?.();
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
                        data={Array.isArray(SellerOrderList?.data)
                            ? SellerOrderList?.data
                            : SellerOrderList?.data
                                ? [SellerOrderList.data]
                                : []}
                        fileName="category_data"
                        header="ID,OrderID,CustomerName,ProductQty,Price,FinalPrice,Status"
                    />
                </div>
            </PageHeader>

            <DeliveredOrdersTable
                DeliveredOrderList={Array.isArray(SellerOrderList?.data) ? SellerOrderList.data : []}
                isLoading={isSellerOrderListLoading || isDeleting}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={SellerOrderList?.meta}
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
                <OrderViewModal
                    isOpen={isOrderModalOpen}
                    onClose={toggleOrderModal}
                    selectedOrder={selectedOrder}
                />
            </KitShow>
        </>
    );
}
