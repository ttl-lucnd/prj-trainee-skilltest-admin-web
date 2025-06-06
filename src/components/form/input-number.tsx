'use client';

import * as yup from 'yup';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  DECIMAL_ALLOW_CODES,
  DOT_ALLOW_CODES,
  INPUT_NUMBER_ALLOW_KEYS,
  INPUT_PHONE_MAX_LENGTH,
  INTEGER_ALLOW_CODES,
  MAX_INTEGER,
  VERSION_ALLOW_CODES,
} from '@/utils/constants';
import { useState } from 'react';
import { parseErrorMessage } from '@/utils';
import { useTranslations } from 'next-intl';

interface InputNumberProps {
  readonly label?: string;
  readonly name: string;
  readonly description?: string;
  readonly placeholder?: string;
  readonly defaultValue?: number;
  readonly onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  readonly onBlur?: () => void;
  readonly onChange?: (value: number) => void;
  readonly required?: boolean;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly validation?: yup.NumberSchema;
  readonly control: Control<any>;
  readonly suffix?: string;
  readonly allowClear?: boolean;
  readonly layout?: 'horizontal' | 'vertical';
  readonly className?: string;
  readonly classNameLabel?: string;
  readonly inputClassName?: string;
  readonly type?: 'number' | 'phone' | 'version';
  readonly disabled?: boolean;
  readonly allowDecimal?: boolean;
  readonly size?: 'sm' | 'md';
  readonly maxLength?: number;
}

export function InputNumber({
  label,
  name,
  description = '',
  placeholder = '',
  onFocus,
  onBlur,
  onChange,
  required = false,
  min,
  max = MAX_INTEGER,
  step = 1,
  control,
  suffix,
  allowClear = false,
  layout = 'horizontal',
  className,
  classNameLabel,
  inputClassName,
  type = 'number',
  disabled = false,
  allowDecimal = false,
  size = 'md',
  maxLength,
}: InputNumberProps) {
  const [oldValue, setOldValue] = useState('');
  const t = useTranslations();

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData('text');
    if (type === 'version') {
      if (pastedText.split('').some((char) => !VERSION_ALLOW_CODES.includes(char))) {
        event.preventDefault();
      }
    } else {
      if (!allowDecimal && (pastedText.includes('.') || pastedText.includes(','))) {
        event.preventDefault();
      }
      if (pastedText.includes('-') || pastedText.includes('+')) {
        event.preventDefault();
      }
      if (pastedText.includes('e') || pastedText.includes('E')) {
        event.preventDefault();
      }
    }
  };
  const preventInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (INPUT_NUMBER_ALLOW_KEYS.includes(event.key)) {
      if (!event.ctrlKey && !event.metaKey) {
        event.preventDefault();
      }
      return;
    }

    if (type === 'version') {
      if (
        ![...INTEGER_ALLOW_CODES, ...DOT_ALLOW_CODES].includes(event.code) ||
        event.shiftKey
      ) {
        event.preventDefault();
      }
    } else if (!allowDecimal) {
      if (!INTEGER_ALLOW_CODES.includes(event.code) || event.shiftKey) {
        event.preventDefault();
      }
    } else if (!DECIMAL_ALLOW_CODES.includes(event.code) || event.shiftKey) {
      event.preventDefault();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    const value = e?.target?.value ? parseFloat(e.target.value) : 0;
    onChange?.(value);
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
            'flex items-center',
            fieldError && 'text-destructive',
            layout === 'vertical' && 'flex-col w-full flex-1 justify-start items-start',
            layout === 'horizontal' && 'items-center gap-2',
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
              <div className={cn('relative')}>
                <Input
                  type={type === 'number' ? 'number' : 'text'}
                  required={required}
                  min={min}
                  step={step}
                  placeholder={placeholder}
                  aria-label={label}
                  {...field}
                  value={field.value === 0 ? 0 : (field.value ?? '')}
                  onFocus={handleFocus}
                  onBlur={() => {
                    handleBlur();
                    field.onBlur();
                  }}
                  allowClear={allowClear}
                  disabled={disabled}
                  onChange={(e) => {
                    const raw = e?.target?.value ?? '';
                    if (!allowDecimal && (raw.includes('.') || raw.includes(','))) return;
                    const value = Number(raw);
                    if (type === 'number') {
                      if (max && value > max) {
                        field.onChange(+oldValue);
                        onChange?.(+oldValue);
                        return;
                      }
                    }
                    setOldValue(e.target.value);
                    field.onChange(e.target.value);
                    handleChange(e);
                  }}
                  className={cn(
                    'noSpinnerClass pr-12',
                    fieldError ? 'border-destructive focus-visible:ring-destructive'
                    : 'outline-none focus:ring-1 focus:ring-primary-2 focus:border-primary-2 shadow-none',
                    size === 'sm' && 'h-8 py-1',
                    inputClassName,
                  )}
                  inputMode={type === 'number' ? 'numeric' : 'text'}
                  pattern={type === 'number' ? '[0-9]*' : undefined}
                  maxLength={type === 'phone' ? INPUT_PHONE_MAX_LENGTH : maxLength}
                  onKeyDown={(e) => preventInput(e)}
                  onPaste={handlePaste}
                  
                />
                {suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    {suffix}
                  </span>
                )}
              </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            {fieldError && (
              <p className="text-body-sm font-medium text-destructive mt-0.5">
                {parseErrorMessage(t, fieldError.message ?? '')}
              </p>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
