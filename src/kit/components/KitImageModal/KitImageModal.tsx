
import XMarkIcon from '@/components/icons/xMark';
import React, { useEffect, useRef } from 'react';

interface Props {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: any
    modalClass?: string
    reverseButtonColour?: boolean

}
const KitImageModal = ({ isOpen, onClose, title, children, modalClass, reverseButtonColour }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex justify-center items-center z-50 rounded-xl">
            <div ref={modalRef} className={`rounded-lg p-6 w-full h-full max-w-5xl ${modalClass} max-h-[95vh]`}>
                <div className="flex justify-end">
                    <button
                        className="cursor-pointer"
                        onClick={onClose}
                    >
                        <XMarkIcon width={18} height={18} className='text-white'/>
                    </button>
                </div>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );

};

export default KitImageModal
