import XMarkIcon from "@/components/icons/xMark";
import React, { useState } from "react";
import { Input } from "rizzui/input";

type KitChipInputProps = {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    label?: string;
    labelClassName?: string;
};

function KitChipInput({
    value,
    onChange,
    placeholder,
    label,
    labelClassName,
}: KitChipInputProps) {
    const [input, setInput] = useState("");

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag));
    };

    return (
        <div>
            {label && (
                <label className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <div className="flex flex-wrap items-center gap-2 p-2 rounded-md border border-gray-300 min-h-[44px]">
                {value.map((tag, index) => (
                    <span
                        key={`${tag}-${index}`}
                        className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                        {tag}
                        <button onClick={() => removeTag(tag)}>
                            <XMarkIcon className="w-4 h-4 text-gray-500 hover:text-red-500" />
                        </button>
                    </span>
                ))}
                <Input
                    //   className="border-none shadow-none flex-1 min-w-[100px]"
                    className="flex-1 min-w-[100px] !border-none !shadow-none !bg-transparent !p-0 focus:!ring-0 focus:!outline-none focus-visible:!ring-0"
                    placeholder={placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default KitChipInput
