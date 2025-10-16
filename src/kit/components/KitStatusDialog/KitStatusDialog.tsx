'use client';

import { Text, Title } from 'rizzui';
import KitButton from '../KitButton/KitButton';
import KitModal from '../KitModal';

interface Props {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  onDelete: () => void;
  isBtnLoading: boolean;
}

const KitStatusDialog = ({ isOpen, onClose, onDelete, title, isBtnLoading }: Props) => {
  return (
    <KitModal
      isOpen={isOpen}
      onClose={onClose}
      title={<Title as='h4' className="text-lg font-semibold">Update Status</Title>}
      size="sm"
    >
      <div className="p-4 px-0">
        <Text as="p" className="text-sm text-gray-700">
          Are you sure you want to change status to <b>{title}</b>? This action cannot be undone.
        </Text>
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-200 p-4">
        <KitButton variant="outline" onClick={onClose} disabled={isBtnLoading}>
          Cancel
        </KitButton>
        <KitButton
          variant="solid"
          color="danger"
          onClick={onDelete}
          disabled={isBtnLoading}
          isLoading={isBtnLoading}
        >
          Yes, Update
        </KitButton>
      </div>
    </KitModal>
  );
};

export default KitStatusDialog;
