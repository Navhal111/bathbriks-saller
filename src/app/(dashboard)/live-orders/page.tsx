'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import { useGetSellerOrderList, useUpdateSellerOrder, useDeleteSellerOrder } from '@/kit/hooks/data/liveOrder';
import { SellerOrderType } from '@/kit/models/Order';
import toast from 'react-hot-toast';
import OrderViewModal from '@/views/order/OrderViewModal';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';
import LiveOrdersTable from './list/table';
import { CustomErrorType } from '@/kit/models/CustomError';
import KitStatusDialog from '@/kit/components/KitStatusDialog';
import { OrderStatus } from '@/config/orders';

const pageHeader = {
    title: 'Live Orders',
    breadcrumb: [
        {
            href: "/dashboard",
            name: 'Dashboard',
        },
        {
            name: 'Live Orders List',
        },
    ],
};

export interface filterParamsProps {
    minAmount: string,
    maxAmount: string,
    startDate: string,
    endDate: string,
    status: string,
}

export const filterParams: filterParamsProps = {
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
    status: '',
};

export default function OrdersPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState<filterParamsProps>(filterParams);
    const [selectedOrder, setSelectedOrder] = useState<SellerOrderType>()
    const [orderId, setOrderId] = useState<string>('');
    const [actionType, setActionType] = useState<'delete' | 'update' | null>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false)
    const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false)

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const queryParams = {
        page: page,
        size: pageSize,
        status: OrderStatus.PLACED,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(search.minAmount && { startDate: search.minAmount }),
        ...(search.maxAmount && { endDate: search.maxAmount }),
    }

    const { SellerOrderList, isSellerOrderListLoading, refreshSellerOrderList } = useGetSellerOrderList(queryParams);
    const { deleteRecord, isDeleting } = useDeleteSellerOrder(orderId || '');
    const { updateSellerOrder: onUpdateOrder, isMutating: isUpdateLoading } = useUpdateSellerOrder(String(selectedOrder?.id));

    const toggleOrderModal = () => setIsOrderModalOpen(!isOrderModalOpen)
    const toggleStatusModal = () => setIsStatusModalOpen(!isStatusModalOpen)

    const orderDelete = async (data: SellerOrderType) => {
        setOrderId(String(data.id))
        setSelectedOrder(data)
        setActionType('delete');
    };

    const onStatusUpdate = async (data: SellerOrderType) => {
        setSelectedOrder(data)
        toggleStatusModal()
    };

    const orderView = (data: SellerOrderType) => {
        setSelectedOrder(data)
        toggleOrderModal()
    }

    const onhandleStatusUpdate = async () => {
        if (!selectedOrder) return

        try {
            await onUpdateOrder({ status: selectedOrder?.status })
            toast.success('Order updated successfully!')
            toggleStatusModal()
            refreshSellerOrderList?.();
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

            <LiveOrdersTable
                OrderList={Array.isArray(SellerOrderList?.data) ? SellerOrderList.data : []}
                isLoading={isSellerOrderListLoading || isUpdateLoading || isDeleting}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={SellerOrderList?.meta}
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
