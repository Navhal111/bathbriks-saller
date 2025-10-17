'use client';

import RecentOrder from "@/views/dashboard/recent-order";
import SalesReport from "@/views/dashboard/sales-report";
import StatCards from "@/views/dashboard/stat-cards";
import { useDeleteSellerOrder, useGetSellerOrderList, useUpdateSellerOrder } from "@/kit/hooks/data/liveOrder";
import { OrderStatus } from "@/config/orders";
import KitShow from "@/kit/components/KitShow/KitShow";
import OrderViewModal from "@/views/order/OrderViewModal";
import KitStatusDialog from "@/kit/components/KitStatusDialog";
import { useEffect, useState } from "react";
import { SellerOrderType } from "@/kit/models/Order";
import { CustomErrorType } from "@/kit/models/CustomError";
import toast from "react-hot-toast";

export default function Home() {

    const [selectedOrder, setSelectedOrder] = useState<SellerOrderType>()
    const [orderId, setOrderId] = useState<string>('');
    const [actionType, setActionType] = useState<'delete' | 'update' | null>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false)
    const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false)

    const queryParams = {
        page: 1,
        size: 5,
        status: OrderStatus.PLACED,
    };

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
            <div className="@container">
                <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">

                    <StatCards className="@2xl:grid-cols-4 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-12" />

                    <SalesReport className="@4xl:col-span-2 @7xl:col-span-12" />

                    <RecentOrder
                        OrderList={Array.isArray(SellerOrderList?.data) ? SellerOrderList.data : []}
                        isLoading={isSellerOrderListLoading || isDeleting || isUpdateLoading}
                        className="relative @4xl:col-span-2 @7xl:col-span-12"
                        onDelete={orderDelete}
                        onStatusUpdate={onStatusUpdate}
                        onView={orderView}
                    />
                </div>
            </div>
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