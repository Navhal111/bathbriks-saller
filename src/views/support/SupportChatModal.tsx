"use client";

import { Modal } from "rizzui";
import { Grid } from "rizzui";
import KitButton from "@/kit/components/KitButton/KitButton";
import MessageDetails from "./message-details";

interface Props {
    isOpen: boolean
    onClose: () => void
    onRefresh?: () => void
}

export default function SupportChatModal({ isOpen, onClose, onRefresh }: Props) {

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                overlayClassName="backdrop-blur"
                customSize="100%"
                containerClassName="!w-[60vw] !shadow-2xl"
            >
                <div className="m-auto px-7 pt-6 pb-8">
                    <div className="@container">
                        <div className="mt-5 items-start @container @2xl:mt-9">
                            <MessageDetails className="col-span-12" />
                        </div>
                    </div>
                    <Grid className="flex justify-end mt-3 gap-3">
                        <KitButton
                            isLoading={false}
                            variant="outline"
                            color="primary"
                            className='w-[80px]'
                            onClick={onClose}
                        >
                            Cancel
                        </KitButton>
                    </Grid>
                </div>
            </Modal>
        </div>
    );
}