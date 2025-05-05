'use client';

import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

import { FormField, FormItem } from '@/components/ui/form';
import { MultiSelect } from '../ui/multiple-select';
import { FormFieldLayout } from './form-field-layout';

interface SelectOption {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  readonly label?: string | React.ReactNode;
  readonly name: string;
  readonly description?: string;
  readonly placeholder?: string;
  readonly options: SelectOption[];
  readonly specificOptions?: SelectOption[];
  readonly onChange?: (value?: string[]) => void;
  readonly required?: boolean;
  readonly control: Control<any>;
  readonly layout?: 'horizontal' | 'vertical';
  readonly className?: string;
  readonly size?: 'sm' | 'md';
  readonly maxCount?: number;
}

export function MultiSelectField({
  label,
  name,
  description = '',
  placeholder = '',
  options,
  specificOptions,
  onChange,
  required = false,
  control,
  layout = 'horizontal',
  className,
  size = 'md',
  maxCount = 1,
}: MultiSelectFieldProps) {
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
            <MultiSelect
              {...field}
              options={options}
              specificOptions={specificOptions}
              placeholder={placeholder}
              maxCount={maxCount}
              value={field.value}
              className={cn(
                'w-full',
                size === 'sm' && 'min-h-8 p-0.5',
                fieldError && 'border-destructive',
                label && 'mt-2',
              )}
              onValueChange={(values) => {
                field.onChange(values);
                onChange?.(values);
              }}
            />
          </FormFieldLayout>
        </FormItem>
      )}
    />
  );
}
