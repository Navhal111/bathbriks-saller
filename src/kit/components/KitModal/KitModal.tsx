'use client';

import { Modal } from 'rizzui';
import type { ReactNode } from 'react';
import KitIcon from '../KitIcon/KitIcon';
import KitShow from '../KitShow/KitShow';

interface Props {
  isOpen: boolean;
  isFullScreen?: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  content?: string | ReactNode;
  actions?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const KitModal = ({
  isOpen = false,
  isFullScreen = false,
  onClose,
  title,
  content,
  actions,
  children,
  className,
  size = 'md',
  rounded = 'lg',
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isFullScreen ? 'xl' : size}
      rounded={rounded}
      className={className}
    >
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="text-lg font-semibold">{title}</div>
        <button onClick={onClose} aria-label="Close modal">
          <KitIcon icon="tabler:x" fontSize={16} />
        </button>
      </div>

      <KitShow show={Boolean(content)}>
        <div className="p-4">{content}</div>
      </KitShow>

      <KitShow show={Boolean(children)}>
        <div className="p-4">{children}</div>
      </KitShow>

      <KitShow show={Boolean(actions)}>
        <div className="flex justify-end gap-2 border-t border-gray-200 p-4">
          {actions}
        </div>
      </KitShow>
    </Modal>
  );
};

export default KitModal;
