'use client';

import { Modal } from '@/components/modal';
import { Button } from 'rizzui/button';
import { Text } from 'rizzui';
import { ProductData } from '@/kit/models/Product';
import { useSubmitProductApproval } from '@/kit/hooks/data/product';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface SendReviewPopupProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductData | null;
    onSuccess: () => void;
}

export default function SendReviewPopup({
    isOpen,
    onClose,
    product,
    onSuccess,
}: SendReviewPopupProps) {
    const { submitForReview, isSubmitting, submitError, submitData, resetSubmit } = useSubmitProductApproval();

    const handleSubmit = async () => {
        if (!product?.id) return;

        try {
            await submitForReview(product.id);
        } catch (error) {
            toast.error('Failed to submit for review');
        }
    };

    useEffect(() => {
        if (submitData && !submitError) {
            toast.success('Product submitted for review successfully!');
            onSuccess();
            onClose();
            resetSubmit();
        }
    }, [submitData, submitError, onSuccess, onClose, resetSubmit]);

    useEffect(() => {
        if (submitError) {
            toast.error('Failed to submit product for review');
        }
    }, [submitError]);

    const handleClose = () => {
        onClose();
        resetSubmit();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="sm">
            <div className="p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Send for Review
                    </h3>
                    <Text className="text-sm text-gray-600">
                        Are you sure you want to send "{product?.name}" for review?
                        This will change the status to pending approval.
                    </Text>
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                    >
                        Send for Review
                    </Button>
                </div>
            </div>
        </Modal>
    );
}