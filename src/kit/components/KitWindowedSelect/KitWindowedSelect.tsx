"use client";

import React from 'react';
import { SelectOption } from "rizzui/select";
import WindowedSelect from 'react-windowed-select';

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderColor: '#ced4da',
        border: '2px solid #ced4da',
        borderRadius: '6px',
        '&:hover': {
            border: '2px solid #1976d2',
        },
        boxShadow: 'none',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
};

interface KitWindowedSelectProps {
    options: SelectOption[];
    value: string;
    onChange: (selected: SelectOption | null) => void;
    label?: string;
    required?: boolean;
    width?: string;
    windowThreshold?: number;
    disabled?: boolean;
}

const KitWindowedSelect: React.FC<KitWindowedSelectProps> = ({
    options,
    value,
    onChange,
    label,
    required = false,
    width = "w-[280px]",
    windowThreshold = 100,
    disabled = false
}) => {
    return (
        <div className={`${width}`}>
            {label && (
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <WindowedSelect
                instanceId="play-frequency-select"
                isClearable
                isSearchable
                options={options}
                value={options.find((opt) => opt.value === value) || null}
                onChange={(selected: any) => {
                    onChange(selected);
                }}
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
                windowThreshold={windowThreshold}
                styles={customStyles}
                isDisabled={disabled}
            />
        </div>
    );
};

export default KitWindowedSelect;
