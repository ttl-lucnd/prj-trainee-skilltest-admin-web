'use client';

import * as yup from 'yup';
import { Control, FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { parseErrorMessage, TEXTAREA_MAX_LENGTH } from '@/utils';
import { useTranslations } from 'next-intl';

interface InputTextProps {
  label: string;
  name: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => void;
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
  maxLength?: number;
  maxHeight?: string;
  textHeight?: string;
  resizable?: boolean;
}

export function InputTextArea({
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
  required = false,
  control,
  maxLength = TEXTAREA_MAX_LENGTH,
  allowClear = false,
  maxHeight = '400px',
  textHeight = 'auto',
  resizable = true,
}: Readonly<InputTextProps>) {
  const t = useTranslations();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    onFocus?.(e);
    if (textareaRef.current) {
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
    onChange?.(e?.target?.value ?? '');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormItem
          className={cn(
            'w-full flex flex-1',
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
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <div className="flex-1 relative">
            <FormControl>
              <Textarea
                required={required}
                placeholder={placeholder}
                {...field}
                maxLength={maxLength ?? undefined}
                disabled={disabled}
                value={field.value || ''}
                onFocus={handleFocus}
                onBlur={() => {
                  onBlur?.();
                  field.onBlur();
                }}
                resizable={resizable}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                className={cn(
                  'outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 shadow-none',
                  size === 'sm' && 'h-8 py-1',
                  fieldError && 'border-destructive focus-visible:ring-destructive',
                )}
                ref={textareaRef}
                rows={1}
                style={{ maxHeight: maxHeight, height: textHeight }}
                allowClear={allowClear}
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
