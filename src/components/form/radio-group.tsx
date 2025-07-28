'use client';

import { Control, FieldError } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  RadioGroup as BaseRadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface RadioGroupFieldProps {
  readonly name: string;
  readonly label?: string;
  readonly control: Control<any>;
  readonly isHorizontal?: boolean;
  readonly isHorizontalItem?: boolean;
  readonly labelClassName?: string;
  readonly classNames?: string;
  readonly groupClassName?: string;
  readonly disabled?: boolean;
  readonly items: ReadonlyArray<{
    readonly value: string;
    readonly label: string;
  }>;
  readonly fieldError?: FieldError;
  readonly required?: boolean;
}

export function RadioGroup({
  name,
  label,
  control,
  items,
  isHorizontal = false,
  isHorizontalItem = false,
  labelClassName,
  classNames,
  groupClassName,
  disabled = false,
  required = false,
  ...props
}: RadioGroupFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormItem
          className={cn(
            'flex items-center',
            fieldError && 'text-destructive',
            !isHorizontal && 'flex-col',
            isHorizontal && 'flex-row gap-2',
            classNames,
          )}
        >
          {label && (
            <FormLabel
              className={cn(
                'min-w-[140px] text-left self-start w-1/4 mt-2 text-body-md',
                fieldError && 'text-destructive text-body-md',
                labelClassName,
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <BaseRadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className={cn(
                'flex flex-col gap-8 py-2',
                isHorizontalItem && 'flex flex-row',
                !label && 'mt-2',
                groupClassName,
              )}
              {...props}
            >
              {items?.map((item) => (
                <div key={item.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    id={`${name}-${item.value}`}
                    value={item.value}
                    checked={field.value === item.value}
                    disabled={disabled}
                  />
                  <label
                    htmlFor={`${name}-${item.value}`}
                    className={cn(
                      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
                      disabled && 'cursor-not-allowed opacity-70',
                    )}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </BaseRadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
