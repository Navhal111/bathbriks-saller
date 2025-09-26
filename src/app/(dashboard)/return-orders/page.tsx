'use client';

import PageHeader from '@/app/(dashboard)/shared/page-header';
import ExportButton from '@/app/(dashboard)/shared/export-button';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect, useState } from 'react';
import { ordersData } from '@/data/orders-data';
import { useDeleteReturnOrder, useGetAllReturnOrderList, useUpdateReturnOrder } from '@/kit/hooks/data/returnOrders';
import { returnOrdersData } from '@/data/returnOrders-data';
import { ReturnOrderType } from '@/kit/models/ReturnOrder';
import ReturnOrdersTable from './list/table';
import toast from 'react-hot-toast';
import OrderViewModal from '@/views/order/OrderViewModal';
import KitDebouncedSearchInput from '@/kit/components/KitDebouncedSearchInput';

const pageHeader = {
    title: 'Return Orders',
    breadcrumb: [
        {
            href: "/dashboard",
            name: 'Dashboard',
        },
        {
            name: 'Return Orders List',
        },
    ],
};

export default function ReturnOrdersPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState({
        minAmount: '',
        maxAmount: '',
    })
    const [selectedReturnOrder, setSelectedReturnOrder] = useState<ReturnOrderType>()
    const [returnOrderId, setReturnOrderId] = useState<string>('');
    const [actionType, setActionType] = useState<'delete' | 'update' | null>(null);
    const [isReturnOrderModalOpen, setIsReturnOrderModalOpen] = useState<boolean>(false)

    const debouncedSearch = KitDebouncedSearchInput(searchQuery, 500);

    const queryParams = {
        page: page,
        size: pageSize,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(search.minAmount && { startDate: search.minAmount }),
        ...(search.maxAmount && { endDate: search.maxAmount }),
    }

    const { ReturnOrderList, isReturnOrderListLoading, refreshReturnOrderList } = useGetAllReturnOrderList(queryParams);
    const { deleteRecord, isDeleting } = useDeleteReturnOrder(returnOrderId || '');
    const { update: onUpdateReturnOrder, isUpdatingReturnOrder } = useUpdateReturnOrder(returnOrderId);

    const toggleReturnOrderModal = () => setIsReturnOrderModalOpen(!isReturnOrderModalOpen)

    const returnOrderDelete = async (data: ReturnOrderType) => {
        setReturnOrderId(String(data.id))
        setSelectedReturnOrder(data)
        setActionType('delete');
    };

    const onStatusUpdate = async (data: ReturnOrderType) => {
        setReturnOrderId(String(data.id))
        setSelectedReturnOrder(data)
        setActionType('update');
    };

    const returnOrderView = (data: ReturnOrderType) => {
        setSelectedReturnOrder(data)
        toggleReturnOrderModal()
    }

    useEffect(() => {
        const performAction = async () => {
            if (!returnOrderId || !actionType) return;

            try {
                if (actionType === 'delete' && selectedReturnOrder) {
                    await deleteRecord(selectedReturnOrder);
                    toast.success("Return order deleted successfully!");
                }

                if (actionType === 'update' && selectedReturnOrder) {
                    const { id, createdAt, updatedAt, ...rest } = selectedReturnOrder;
                    const updatedRow = { ...rest };
                    await onUpdateReturnOrder(updatedRow as Partial<ReturnOrderType>);
                    toast.success("Return order updated successfully!");
                }

                refreshReturnOrderList?.();
            } catch (error) {
                toast.error("Failed to perform action");
            } finally {
                setReturnOrderId('');
                setSelectedReturnOrder(undefined);
                setActionType(null);
            }
        };

        performAction();
    }, [returnOrderId, actionType]);

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

            <ReturnOrdersTable
                ReturnOrderList={returnOrdersData}
                isLoading={false}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                meta={ReturnOrderList?.meta}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                onStatusUpdate={onStatusUpdate}
                onDelete={returnOrderDelete}
                onView={returnOrderView}
                search={search}
                setSearch={setSearch}
            />

            <KitShow show={isReturnOrderModalOpen}>
                <OrderViewModal
                    isOpen={isReturnOrderModalOpen}
                    onClose={toggleReturnOrderModal}
                    selectedOrder={selectedReturnOrder}
                />
            </KitShow>
        </>
    );
}
