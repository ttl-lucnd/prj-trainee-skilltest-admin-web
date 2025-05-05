'use client';

import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface CheckboxFieldProps {
  readonly name: string;
  readonly label?: string;
  readonly control: Control<any>;
  readonly isHorizontal?: boolean;
  readonly className?: string;
  readonly onChange?: (value: any) => void;
  readonly disabled?: boolean;
  readonly labelClassName?: string;
}

export function CheckboxField({
  name,
  label,
  control,
  isHorizontal = false,
  className,
  onChange,
  disabled = false,
  labelClassName,
  ...props
}: CheckboxFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-center gap-2 self-center',
            isHorizontal && 'flex flex-row',
            className,
          )}
        >
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              disabled={disabled}
              {...props}
            />
          </FormControl>
          {label && (
            <FormLabel
              className={cn('min-w-[140px] text-left w-1/4 !mt-0', labelClassName)}
            >
              {label}
            </FormLabel>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
