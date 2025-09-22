"use client";

import { Modal, Text, Title } from "rizzui";
import { Grid } from "rizzui";
import { InventoryAlert } from "@/kit/models/InventoryAlert";
import { useGetOneDisplayCheck } from "@/kit/hooks/data/displayCheck";
import { format } from "date-fns";
import XMarkIcon from "@/components/icons/xMark";

interface Props {
    isOpen: boolean
    onClose: () => void
    onRefresh?: () => void
    updateCheckDisplayModal?: InventoryAlert
}

export default function AddUpdateCheckDisplayModal({ isOpen, onClose, onRefresh, updateCheckDisplayModal }: Props) {

    const { data: CheckDisplayDetails, isLoading: isLoadingCheckDisplay, isValidating: isValidatingCheckDisplay } = useGetOneDisplayCheck(updateCheckDisplayModal?.itemId)

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                overlayClassName="backdrop-blur"
                customSize="100%"
                containerClassName="!w-[70vw] !shadow-2xl"
            >
                <div className="m-auto px-7 pt-6 pb-8">
                    <div className="mb-2 flex items-center justify-between">
                        <Title as="h5">Check Display Information</Title>
                        <button onClick={() => onClose()} className="p-2 rounded-full hover:bg-gray-100 transition">
                             <XMarkIcon className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    <Grid columns="3" className="gap-4 py-2">
                        <Grid.Col colSpan="2" className="flex items-center">
                            <Text className="text-lg font-semibold text-black">Product Name :</Text>
                            <Text className="text-lg text-gray-500 ml-2">{CheckDisplayDetails?.data?.productName}</Text>
                        </Grid.Col>
                        <Grid.Col className="flex items-center">
                            <Text className="text-lg font-semibold text-black">Price :</Text>
                            <Text className="text-lg text-gray-500 ml-2">{CheckDisplayDetails?.data?.price}</Text>
                        </Grid.Col>
                    </Grid>
                    <Grid columns="3" className="gap-4 py-2">
                        <Grid.Col className="flex items-center">
                            <Text className="text-lg font-semibold text-black">Store Name :</Text>
                            <Text className="text-lg text-gray-500 ml-2">{CheckDisplayDetails?.data?.storeName}</Text>
                        </Grid.Col>
                        <Grid.Col className="flex items-center">
                            <Text className="text-lg font-semibold text-black">Sales Last Two Months :</Text>
                            <Text className="text-lg text-gray-500 ml-2">{CheckDisplayDetails?.data?.salesLastTwoMonths}</Text>
                        </Grid.Col>
                        <Grid.Col className="flex items-center">
                            <Text className="text-lg font-semibold text-black">Days Since Last Sale :</Text>
                            <Text className="text-lg text-gray-500 ml-2">{CheckDisplayDetails?.data?.daysSinceLastSale}</Text>
                        </Grid.Col>
                    </Grid>
                    <Grid columns="3" className="gap-4 py-2">
                        <Grid.Col className="flex items-center">
                            <Text className="text-lg font-semibold text-black">Stock Qty :</Text>
                            <Text className="text-lg text-gray-500 ml-2">{CheckDisplayDetails?.data?.stockQty}</Text>
                        </Grid.Col>
                        <Grid.Col className="flex items-center">
                            <Text className="text-lg font-semibold text-black">Product Code :</Text>
                            <Text className="text-lg text-gray-500 ml-2">{CheckDisplayDetails?.data?.productCode}</Text>
                        </Grid.Col>
                        <Grid.Col className="flex items-center">
                            <Text className="text-lg font-semibold text-black">Last Purchase Date :</Text>
                            <Text className="text-lg text-gray-500 ml-2">{(CheckDisplayDetails?.data?.lastPurchaseDate) ? format(CheckDisplayDetails?.data?.lastPurchaseDate, "yyyy-MM-dd") : ''} </Text>
                        </Grid.Col>
                    </Grid>
                </div>
            </Modal>
        </div>
    );
}