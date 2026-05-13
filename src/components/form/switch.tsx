'use client';

import { Control } from 'react-hook-form';
import { FormField, FormItem } from '../ui/form';
import { FormFieldLayout } from './form-field-layout';
import { cn } from '@/lib/utils';
import { Switch } from '../ui/switch';

interface SwitchFieldProps {
  label?: string;
  name: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  control: Control<any>;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  onChange?: (checked: boolean) => void;
  classNameLabel?: string;
}

export function SwitchField({
  label,
  name,
  description,
  disabled = false,
  required = false,
  control,
  layout = 'horizontal',
  className,
  onChange,
  classNameLabel,
}: Readonly<SwitchFieldProps>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormItem className={className}>
          <FormFieldLayout
            label={label}
            required={required}
            layout={layout}
            hasError={!!fieldError}
            errorMessage={fieldError?.message}
            description={description}
            classNameLabel={classNameLabel}
          >
            <Switch
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                onChange?.(checked);
              }}
              disabled={disabled}
              className={cn(
                fieldError && 'border-destructive',
                'data-[state=checked]:bg-primary-2 mt-2',
              )}
            />
          </FormFieldLayout>
        </FormItem>
      )}
    />
  );
}
