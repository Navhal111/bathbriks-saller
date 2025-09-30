"use client";

import { Modal, Text, Title } from "rizzui";
import { OrderType } from "@/kit/models/Order";
import cn from "@/utils/class-names";
import { PiCheckBold } from "react-icons/pi";
import { formatDate } from "@/utils/format-date";
import OrderViewProductsTable from "./OrderViewProductsTable";
import { useState } from "react";
import { ordersData } from "@/data/orders-data";
import { useGetAllOrderList } from "@/kit/hooks/data/order";

const orderStatus = [
    { id: 1, label: 'Order Pending' },
    { id: 2, label: 'Order Processing' },
    { id: 3, label: 'Order At Local Facility' },
    { id: 4, label: 'Order Out For Delivery' },
    { id: 5, label: 'Order Completed' },
];

const transitions = [
    {
        id: 1,
        paymentMethod: {
            name: 'MasterCard',
            image:
                'https://isomorphic-furyroad.s3.amazonaws.com/public/payment/master.png',
        },
        price: '₹1575.00',
    }
];

const currentOrderStatus = 3;

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
    selectedOrder?: OrderType
}

export default function OrderViewModal({ isOpen, onClose, selectedOrder }: Props) {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { OrderList, isOrderListLoading, refreshOrderList } = useGetAllOrderList();

    const subtotal = selectedOrder?.orderProducts.reduce(
        (acc, product) => acc + (product.mrp * product.quantity),
        0
    ) ?? 0;

    const actualTotal = selectedOrder?.orderProducts.reduce(
        (acc, product) => acc + (product.price * product.quantity),
        0
    ) ?? 0;

    const discount = subtotal - actualTotal;

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                overlayClassName="backdrop-blur"
                customSize="100%"
                containerClassName="!w-[90vw] !shadow-2xl"
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
                            Order ID: <span className="font-bold">{selectedOrder?.orderID}</span>
                        </span>
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            {formatDate(new Date(), 'MMMM D, YYYY')} at{' '}{formatDate(new Date(), 'h:mm A')}
                        </span>
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            2 Items
                        </span>
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            Total <span className="font-bold">₹20</span>
                        </span>
                    </div>
                    <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
                        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">

                            <div className="pb-5">
                                <OrderViewProductsTable
                                    OrderList={selectedOrder?.orderProducts ?? []}
                                    isLoading={false}
                                // meta={OrderList?.meta}
                                // page={page}
                                // setPage={setPage}
                                // pageSize={pageSize}
                                // setPageSize={setPageSize}
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
                                    {transitions.map((item) => (
                                        <div
                                            key={item.paymentMethod.name}
                                            className="flex items-center justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7"
                                        >
                                            <div className="flex w-1/3 items-center">
                                                <div className="flex flex-col">
                                                    <Text as="span" className="font-lexend text-gray-700">
                                                        Payment
                                                    </Text>
                                                    <span className="pt-1 text-[13px] font-normal text-gray-500">
                                                        Via {item.paymentMethod.name}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="w-1/3 text-end">{item.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
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

                            <WidgetCard
                                title="Customer Details"
                                childrenWrapperClass="py-5 @5xl:py-8 flex"
                            >
                                <div>
                                    <Title
                                        as="h3"
                                        className="mb-2.5 text-base font-semibold @7xl:text-lg"
                                    >
                                        Leslie Alexander
                                    </Title>
                                    <Text as="p" className="mb-2 break-all last:mb-0">
                                        nevaeh.simmons@example.com
                                    </Text>
                                    <Text as="p" className="mb-2 last:mb-0">
                                        (316) 555-0116
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