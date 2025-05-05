'use client';

import * as yup from 'yup';
import { Control, FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { parseErrorMessage } from '@/utils';
import { useTranslations } from 'next-intl';

interface InputFormProps {
  label?: string;
  name: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  required?: boolean;
  validation?: yup.StringSchema;
  control: Control<any>;
  error?: FieldError;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  size?: 'sm' | 'md';
  allowClear?: boolean;
  maxLength?: number | null;
  type?: string;
  classNameLabel?: string;
  customClassName?: string;
  suffixIcon?: React.ReactNode;
  onSuffixIconClick?: () => void;
}

export function InputText({
  label,
  name,
  description = '',
  placeholder = '',
  disabled = false,
  layout = 'horizontal',
  size = 'md',
  className,
  onFocus,
  onBlur,
  onChange,
  allowClear = false,
  required = false,
  control,
  maxLength = 255,
  type = 'text',
  classNameLabel,
  customClassName,
  suffixIcon,
  onSuffixIconClick,
}: Readonly<InputFormProps>) {
  const t = useTranslations();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocus?.(e);
  };

  const handleBlur = () => {
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    onChange?.(e?.target?.value ?? '');
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
              <Input
                required={required}
                placeholder={placeholder}
                {...field}
                type={type}
                maxLength={maxLength ?? undefined}
                disabled={disabled}
                value={field.value || ''}
                onFocus={handleFocus}
                onBlur={() => {
                  handleBlur();
                  field.onBlur();
                }}
                allowClear={allowClear}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                className={cn(
                  'outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 shadow-none',
                  size === 'sm' && 'h-8 py-1',
                  fieldError && 'border-destructive focus-visible:ring-destructive',
                  customClassName,
                )}
                suffixIcon={suffixIcon}
                onSuffixIconClick={onSuffixIconClick}
              />
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
