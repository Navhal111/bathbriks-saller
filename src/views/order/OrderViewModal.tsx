"use client";

import { Modal } from "rizzui";
import { OrderType } from "@/kit/models/Order";

interface Props {
    isOpen: boolean
    onClose: () => void
    selectedOrder?: OrderType
}

export default function OrderViewModal({ isOpen, onClose, selectedOrder }: Props) {

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                overlayClassName="backdrop-blur"
                customSize="100%"
                containerClassName="!w-[50vw] !shadow-2xl"
            >
                <div className="m-auto px-7 pt-6 pb-8 bg-white rounded-md shadow-md text-gray-800">
                    <header className="mb-6 flex justify-between items-center border-b pb-4">
                        <h2 className="text-2xl font-semibold">Invoice</h2>
                        <div className="text-right">
                            <p className="font-semibold">Order ID: {selectedOrder?.orderID}</p>
                            <p className="font-semibold">Status: <span className="font-medium">{selectedOrder?.status}</span></p>
                        </div>
                    </header>

                    <section className="mb-6 grid grid-cols-2 gap-x-6">
                        <div>
                            <h4 className="font-semibold mb-1">Customer Name</h4>
                            <p>{selectedOrder?.customerName}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">Order Date</h4>
                            <p>{new Date().toLocaleDateString()}</p>
                        </div>
                    </section>

                    <section className="mb-6">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr>
                                    <th className="border-b py-2">Quantity</th>
                                    <th className="border-b py-2">Price (per unit)</th>
                                    <th className="border-b py-2">Final Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2">{selectedOrder?.productQty}</td>
                                    <td className="py-2">${selectedOrder?.price.toFixed(2)}</td>
                                    <td className="py-2 font-semibold">${selectedOrder?.finalPrice.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <footer className="text-right border-t pt-4">
                        <p className="text-lg font-semibold">Total: ${selectedOrder?.finalPrice.toFixed(2)}</p>
                    </footer>
                </div>
            </Modal>
        </div>
    );
}