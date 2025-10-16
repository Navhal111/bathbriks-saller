"use client";

import { Badge, Modal, Text, Title } from "rizzui";
import { SellerOrderType } from "@/kit/models/Order";
import cn from "@/utils/class-names";
import { PiCheckBold } from "react-icons/pi";
import { formatDate } from "@/utils/format-date";
import OrderViewProductsTable from "./OrderViewProductsTable";
import { OrderStatus } from "@/config/orders";
import { StatusType } from "@/config/categories";
import { getStatusColors } from "@/components/table-utils/get-status-color";

const orderStatus = [
    { id: 1, label: 'Order Placed', value: OrderStatus.PLACED },
    { id: 2, label: 'Order Confirmed', value: OrderStatus.CONFIRMED },
    { id: 3, label: 'Order Shipped', value: OrderStatus.SHIPPED },
    { id: 4, label: 'Order Delivered', value: OrderStatus.DELIVERED },
];


function WidgetCard({
    title,
    className,
    children,
    childrenWrapperClass,
}: {
    title?: string;
    className?: string;
    children: React.ReactNode;
    childrenWrapperClass?: string;
}) {
    return (
        <div className={className}>
            <Title
                as="h3"
                className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
            >
                {title}
            </Title>
            <div
                className={cn(
                    'rounded-lg border border-muted px-5 @sm:px-7 @5xl:rounded-xl',
                    childrenWrapperClass
                )}
            >
                {children}
            </div>
        </div>
    );
}

interface Props {
    isOpen: boolean
    onClose: () => void
    selectedOrder?: SellerOrderType
    isStatus?: boolean
}

export default function OrderViewModal({ isOpen, onClose, selectedOrder, isStatus = true }: Props) {

    // Get order products based on type
    const getOrderProducts = () => {
        if (!selectedOrder) return [];
        return selectedOrder.orderitems?.map(item => ({
            id: String(item.id),
            productUrl: item.product?.productUrl || [],
            productName: item.product?.name || 'N/A',
            sku: item.product?.sku || 'N/A',
            price: item.price,
            mrp: parseInt(item.product?.mrp || '0'),
            quantity: item.qty,
            finaPrice: item.price
        })) || [];
    };

    const orderProducts = getOrderProducts();

    const subtotal = orderProducts.reduce(
        (acc, product) => acc + (product.mrp * product.quantity),
        0
    );

    const actualTotal = orderProducts.reduce(
        (acc, product) => acc + (product.price * product.quantity),
        0
    );

    const discount = subtotal - actualTotal;

    // Get order details based on type
    const getOrderDetails = () => {
        if (!selectedOrder) return { id: '', date: '', customerName: '', customerEmail: '', customerPhone: '', total: 0, itemCount: 0, paymentMethod: '' };

        return {
            id: `#${selectedOrder.id}`,
            date: selectedOrder.order_date,
            customerName: selectedOrder.user?.name || 'N/A',
            customerEmail: selectedOrder.user?.email || 'N/A',
            customerPhone: selectedOrder.user?.mobile || 'N/A',
            total: selectedOrder.total_price,
            itemCount: selectedOrder.orderitems?.reduce((sum, item) => sum + item.qty, 0) || 0,
            paymentMethod: selectedOrder.paymentType,
            status: selectedOrder.status
        };
    };

    const orderDetails = getOrderDetails();

    const currentOrderStatus = orderStatus.find((s) => s.value === orderDetails.status)?.id || 0;

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                overlayClassName="backdrop-blur"
                customSize="100%"
                containerClassName="!w-[90vw] !min-h-[90vh] !shadow-2xl"
            >
                <div className="@container p-6">
                    <Title
                        as="h2"
                        className="mb-3.5 text-xl font-semibold @5xl:mb-5 @7xl:text-2xl"
                    >
                        Order Details
                    </Title>
                    <div className="flex flex-wrap justify-center border-b border-t border-gray-300 py-4 font-medium text-gray-700 @5xl:justify-start">
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            Order ID: <span className="font-bold">{orderDetails.id}</span>
                        </span>
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            {formatDate(new Date(orderDetails.date), 'MMMM D, YYYY')} at{' '}{formatDate(new Date(orderDetails.date), 'h:mm A')}
                        </span>
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            {orderDetails.itemCount} Items
                        </span>
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            Total <span className="font-bold">₹{orderDetails.total}</span>
                        </span>
                        {!isStatus &&
                            <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                                <Badge
                                    variant="outline"
                                    color={getStatusColors(orderDetails?.status as StatusType)}
                                    data-color={getStatusColors(orderDetails?.status as StatusType)}
                                >
                                    {orderDetails?.status}
                                </Badge>
                            </span>
                        }
                    </div>
                    <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
                        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">

                            <div className="pb-5">
                                <OrderViewProductsTable
                                    OrderList={orderProducts}
                                />
                                <div className="border-t border-muted pt-7 @5xl:mt-3">
                                    <div className="ms-auto max-w-lg space-y-6">
                                        <div className="flex justify-between font-medium">
                                            Subtotal <span>₹{subtotal}</span>
                                        </div>
                                        <div className="flex justify-between font-medium">
                                            Discount <span>₹{discount}</span>
                                        </div>
                                        <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                                            Total <span>₹{subtotal - discount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="!mt-0">
                                <Title
                                    as="h3"
                                    className="mb-3.5 text-base font-semibold @5xl:mb-5 @7xl:text-lg"
                                >
                                    Transaction
                                </Title>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7">
                                        <div className="flex w-1/3 items-center">
                                            <div className="flex flex-col">
                                                <Text as="span" className="font-lexend text-gray-700">
                                                    Payment
                                                </Text>
                                                <span className="pt-1 text-[13px] font-normal text-gray-500">
                                                    Via {orderDetails.paymentMethod}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-1/3 text-end">₹{orderDetails.total}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
                            {isStatus ? orderDetails.status !== OrderStatus.CANCELLED ?
                                <WidgetCard
                                    title="Order Status"
                                    childrenWrapperClass="py-5 @5xl:py-8 flex"
                                >
                                    <div className="ms-2 w-full space-y-7 border-s-2 border-gray-100">
                                        {orderStatus.map((item) => (
                                            <div
                                                key={item.id}
                                                className={cn(
                                                    "relative ps-6 text-sm font-medium before:absolute before:-start-[9px] before:top-px before:h-5 before:w-5 before:-translate-x-px before:rounded-full before:bg-gray-100 before:content-[''] after:absolute after:-start-px after:top-5 after:h-10 after:w-0.5 after:content-[''] last:after:hidden",
                                                    currentOrderStatus > item.id
                                                        ? 'before:bg-primary after:bg-primary'
                                                        : 'after:hidden',
                                                    currentOrderStatus === item.id && 'before:bg-primary'
                                                )}
                                            >
                                                {currentOrderStatus >= item.id ? (
                                                    <span className="absolute -start-1.5 top-1 text-white">
                                                        <PiCheckBold className="h-auto w-3" />
                                                    </span>
                                                ) : null}

                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </WidgetCard>
                                :
                                <WidgetCard
                                    title="Order Status"
                                    childrenWrapperClass="py-5 @5xl:py-8 flex"
                                >
                                    <div className="ms-2 w-full space-y-7 border-s-2 border-gray-100">
                                        <div
                                            className={cn(
                                                "relative ps-6 text-sm font-medium before:absolute before:-start-[9px] before:top-px before:h-5 before:w-5 before:-translate-x-px before:rounded-full before:content-[''] after:absolute after:-start-px after:top-5 after:h-10 after:w-0.5 after:content-[''] last:after:hidden before:bg-primary after:bg-primary"
                                            )}
                                        >
                                            <span className="absolute -start-1.5 top-1 text-white">
                                                <PiCheckBold className="h-auto w-3" />
                                            </span>

                                            Cancelled
                                        </div>
                                    </div>
                                </WidgetCard>
                                : ''
                            }

                            <WidgetCard
                                title="Customer Details"
                                childrenWrapperClass="py-5 @5xl:py-8 flex"
                            >
                                <div>
                                    <Title
                                        as="h3"
                                        className="mb-2.5 text-base font-semibold @7xl:text-lg"
                                    >
                                        {orderDetails.customerName}
                                    </Title>
                                    <Text as="p" className="mb-2 break-all last:mb-0">
                                        {orderDetails.customerEmail}
                                    </Text>
                                    <Text as="p" className="mb-2 last:mb-0">
                                        {orderDetails.customerPhone}
                                    </Text>
                                    <Text as="p" className="mb-2 last:mb-0">
                                        <span className="font-semibold">Total Amount: </span>₹{orderDetails.total}
                                    </Text>
                                </div>
                            </WidgetCard>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}