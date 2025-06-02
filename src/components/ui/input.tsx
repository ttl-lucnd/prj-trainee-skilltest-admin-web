import * as React from 'react';

import { cn } from '@/lib/utils';
import { CloseIcon } from '../icons';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    React.ComponentProps<'input'> {
  label?: string;
  allowClear?: boolean;
  sizeHeight?: 'sm' | 'md';
  suffixIcon?: React.ReactNode;
  onSuffixIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      allowClear,
      value,
      onChange,
      sizeHeight = 'md',
      suffixIcon,
      onSuffixIconClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-primary-3 px-3 py-2 text-base text-textDefaultColor file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-primary-5 outline-none  disabled:cursor-not-allowed disabled:bg-primary-4 disabled:text-primary-3 disabled:border-primary-3 md:text-sm noSpinnerClass bg-white',
            ((allowClear && !!value) || suffixIcon) && 'pl-10',
            sizeHeight === 'sm' && 'h-8 py-1',
            className,
          )}
          ref={ref}
          value={value}
          onChange={onChange}
          {...props}
        />
        {suffixIcon && (
          <button
            type="button"
            className="absolute top-1/2 left-3 -translate-y-1/2 text-primary-5"
            onClick={onSuffixIconClick}
            aria-label="suffix action"
            tabIndex={0}
          >
            {suffixIcon}
          </button>
        )}
        {allowClear && !!value && (
          <span
            className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 text-textDefaultColor"
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange?.({
                target: { value: null },
              } as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
          >
            <CloseIcon size={20} />
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
