'use client';

import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

import { FormField, FormItem } from '@/components/ui/form';
import { FormFieldLayout } from './form-field-layout';
import { Combobox, IComboboxProps } from '../ui/combobox';

interface ComboboxFieldProps extends IComboboxProps {
  readonly label?: string | React.ReactNode;
  readonly name: string;
  readonly description?: string;
  readonly required?: boolean;
  readonly control: Control<any>;
  readonly layout?: 'horizontal' | 'vertical';
  readonly className?: string;
  readonly classNameLabel?: string;
  readonly size?: 'sm' | 'md';
}

export function ComboboxField({
  label,
  name,
  description = '',
  onChange,
  required = false,
  control,
  layout = 'horizontal',
  className,
  size = 'md',
  classNameLabel,
  ...rest
}: ComboboxFieldProps) {
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
            classNameLabel={classNameLabel}
          >
            <Combobox
              {...rest}
              value={field.value}
              className={cn(
                size === 'sm' && 'min-h-8 p-0.5',
                fieldError && 'border-destructive',
              )}
              onChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
            />
          </FormFieldLayout>
        </FormItem>
      )}
    />
  );
}
