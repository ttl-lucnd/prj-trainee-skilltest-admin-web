'use client';

import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { UploadIcon, X } from 'lucide-react';
import { parseErrorMessage } from '@/utils';
import { useTranslations } from 'next-intl';
interface InputFileProps {
  label?: string;
  name: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: () => void;
  onChange?: (file: File | null) => void;
  onClear?: () => void;
  required?: boolean;
  control: Control<any>;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  size?: 'sm' | 'md';
  allowClear?: boolean;
  accept?: string;
  classNameLabel?: string;
  customClassName?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
}

export function InputFile({
  label,
  name,
  description = '',
  placeholder = 'Choose file',
  disabled = false,
  layout = 'horizontal',
  size = 'md',
  className,
  onFocus,
  onBlur,
  onChange,
  onClear,
  allowClear = false,
  required = false,
  control,
  accept = 'image/*',
  classNameLabel,
  customClassName,
  ref,
}: Readonly<InputFileProps>) {
  const t = useTranslations();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange?.(file || null);
  };

  const handleUploadClick = () => {
    ref?.current?.click();
  };

  const handleClear = (field: any) => {
    if (ref?.current) {
      ref.current.value = '';
    }
    field.onChange(null);
    onChange?.(null);
    onClear?.();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocus?.(e);
  };

  const handleBlur = () => {
    onBlur?.();
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormItem
          className={cn(
            'flex',
            fieldError && 'text-destructive',
            layout === 'horizontal' && 'items-center gap-2',
            layout === 'vertical' && 'flex-col',
            className,
          )}
        >
          {label && (
            <FormLabel
              className={cn(
                'min-w-[140px] text-left w-1/4 mt-2 text-body-md',
                fieldError && 'text-destructive text-body-md',
                classNameLabel,
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <div className="flex-1 w-full">
            <FormControl>
              <div className="relative">
                <Input
                  ref={ref}
                  type="file"
                  accept={accept}
                  required={required}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="hidden"
                  onChange={(e) => {
                    handleFileChange(e);
                    field.onChange(e);
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <Input
                  readOnly
                  placeholder={placeholder}
                  disabled={disabled}
                  value={field.value ?? ''}
                  className={cn(
                    'outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 shadow-none',
                    allowClear && field.value && 'pr-20',
                    !allowClear && 'pr-12',
                    size === 'sm' && 'h-8 py-1',
                    fieldError && 'border-destructive focus-visible:ring-destructive',
                    customClassName,
                  )}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {allowClear && field.value && (
                    <button
                      type="button"
                      className={cn(
                        'cursor-pointer p-1 hover:bg-gray-100 rounded-md',
                        disabled && 'cursor-not-allowed opacity-50',
                      )}
                      onClick={!disabled ? () => handleClear(field) : undefined}
                      disabled={disabled}
                      aria-label="Clear file"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                  <button
                    type="button"
                    className={cn(
                      'cursor-pointer p-1 hover:bg-gray-100 rounded-md',
                      disabled && 'cursor-not-allowed opacity-50',
                    )}
                    onClick={!disabled ? handleUploadClick : undefined}
                    disabled={disabled}
                    aria-label="Upload file"
                  >
                    <UploadIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            {fieldError && (
              <p className="text-body-sm text-destructive mt-0.5">
                {parseErrorMessage(t, fieldError.message ?? '')}
              </p>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
