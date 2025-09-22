'use client';

import { forwardRef } from 'react';
import { Input, InputProps } from 'rizzui/input';

type KitInputProps = InputProps & {
  required?: boolean;
};

const KitTextInput = forwardRef<HTMLInputElement, KitInputProps>(
  ({ className = '', label, required, error, prefix, suffix, ...rest }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <Input
          ref={ref}
          required={required}
          error={error}
          prefix={prefix}
          suffix={suffix}
          className={className}
          {...rest}
        />
      </div>
    );
  }
);

KitTextInput.displayName = 'KitTextInput';
export default KitTextInput;
