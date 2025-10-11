"use client";

import { Modal, Text, Title } from "rizzui";
import cn from "@/utils/class-names";
import { formatDate } from "@/utils/format-date";
import { useGetAllOrderList } from "@/kit/hooks/data/order";
import { WalletType } from "@/kit/models/Wallet";
import { getBadge } from "@/components/table-utils/get-badge";

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
    selectedWallet?: WalletType
}

export default function WalletViewModal({ isOpen, onClose, selectedWallet }: Props) {

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                overlayClassName="backdrop-blur"
                customSize="100%"
                containerClassName="!w-[60vw] !shadow-2xl"
            >
                <div className="@container p-6">
                    <Title
                        as="h2"
                        className="mb-3.5 text-xl font-semibold @5xl:mb-5 @7xl:text-2xl"
                    >
                        Withdrawl Details
                    </Title>
                    <div className="flex flex-wrap justify-center border-b border-t border-gray-300 py-4 font-medium text-gray-700 @5xl:justify-start">
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            Transaction ID: <span className="font-bold">#FC6723757651DB74</span>
                        </span>
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            {formatDate(new Date(), 'MMMM D, YYYY')} at{' '}{formatDate(new Date(), 'h:mm A')}
                        </span>
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            Amount <span className="font-bold">₹20</span>
                        </span>
                        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
                            {getBadge('pending')}
                        </span>
                    </div>
                    <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
                        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
                            <div className="">
                                <Title
                                    as="h3"
                                    className="mb-3.5 text-base font-semibold @5xl:mb-5 @7xl:text-lg"
                                >
                                    Transaction
                                </Title>

                                <div className="space-y-4">
                                    <div
                                        className="flex items-center justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7"
                                    >
                                        <div className="flex w-1/3 items-center">
                                            <div className="flex flex-col">
                                                <Text as="span" className="font-lexend text-gray-700">
                                                    Withdrawl
                                                </Text>
                                                <span className="pt-1 text-[13px] font-normal text-gray-500">
                                                    By bank
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-1/3 text-end">₹1575.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
                            <WidgetCard
                                title="Transfer to"
                                childrenWrapperClass="py-5 @5xl:py-8 flex"
                            >
                                <div>
                                    <Title
                                        as="h3"
                                        className="mb-2.5 text-base font-semibold @7xl:text-lg"
                                    >
                                        Kotak Mahindra Bank
                                    </Title>
                                    <Text as="p" className="mb-2 break-all last:mb-0">
                                        IFSC: 1234567890
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