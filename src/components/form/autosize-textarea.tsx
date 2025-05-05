'use client';

import { cn } from '@/lib/utils';
import { Control, FieldError } from 'react-hook-form';
import * as yup from 'yup';

import { FormField, FormItem } from '@/components/ui/form';
import { FormFieldLayout } from './form-field-layout';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { TEXTAREA_MAX_LENGTH } from '@/utils/constants';

interface AutosizeTextareaProps {
  label: string;
  name: string;
  control: Control<any>;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  required?: boolean;
  validation?: yup.StringSchema;
  error?: FieldError;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  allowClear?: boolean;
  maxLength?: number;
  minHeight?: number;
  maxHeight?: number;
}

export function AutosizeTextareaField({
  label,
  name,
  description = '',
  placeholder = '',
  layout = 'horizontal',
  className,
  onFocus,
  onBlur,
  onChange,
  required = false,
  control,
  maxLength = TEXTAREA_MAX_LENGTH,
  ...rest
}: Readonly<AutosizeTextareaProps>) {
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onFocus?.(e);
  };

  const handleBlur = () => {
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
    onChange?.(e?.target?.value ?? '');
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormItem className={cn(fieldError && 'text-destructive', className)}>
          <FormFieldLayout
            label={label}
            required={required}
            layout={layout}
            hasError={!!fieldError}
            description={description}
            errorMessage={fieldError?.message}
          >
            <AutosizeTextarea
              required={required}
              placeholder={placeholder}
              {...field}
              {...rest}
              maxLength={maxLength ?? undefined}
              value={field.value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              className={cn('shadow-none', fieldError && 'border-destructive')}
            />
          </FormFieldLayout>
        </FormItem>
      )}
    />
  );
}
