'use client';

import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { parseErrorMessage } from '@/utils';
import { useTranslations } from 'next-intl';
import { CloseIcon } from '../icons';
import NoData from '../NoData';

export interface SelectOption {
  label: string;
  value: string;
  customLabel?: React.ReactNode;
}

interface SelectSingleProps {
  readonly label?: string | React.ReactNode;
  readonly name: string;
  readonly description?: string;
  readonly placeholder?: string;
  readonly options: SelectOption[];
  readonly onChange?: (value?: string | null) => void;
  readonly required?: boolean;
  readonly control: Control<any>;
  readonly layout?: 'horizontal' | 'vertical';
  readonly className?: string;
  readonly size?: 'sm' | 'md';
  readonly allowClear?: boolean;
  readonly classNameLabel?: string;
  readonly classNameTrigger?: string;
  readonly disabled?: boolean;
  readonly testId?: string;
}

export function SelectSingle({
  label,
  name,
  description = '',
  placeholder = '',
  options,
  onChange,
  required = false,
  control,
  layout = 'horizontal',
  className,
  size = 'md',
  allowClear = false,
  classNameLabel,
  classNameTrigger,
  disabled = false,
  testId,
}: SelectSingleProps) {
  const t = useTranslations();
  const handleChange = (value?: string | null) => {
    onChange?.(value);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormItem className={cn(fieldError && 'text-destructive', className)}>
          <div
            className={cn(
              'flex',
              label ? 'items-center gap-2' : 'flex-1',
              layout === 'vertical' && 'w-full flex-col items-start',
            )}
          >
            {label && (
              <FormLabel
                className={cn(
                  'min-w-[140px] text-left w-2/9 mt-2 text-body-md',
                  fieldError && 'text-destructive text-body-md',
                  layout === 'horizontal' && 'self-center',
                  classNameLabel,
                )}
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            <div className={cn('flex-1 w-full', !field.value && 'text-primary-3')}>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleChange(value);
                }}
                onOpenChange={(open) => {
                  if (!open) {
                    field.onBlur();
                  }
                }}
                value={field.value || ''}
                defaultValue={field.value || ''}
                disabled={disabled}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'mt-2 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 shadow-none text-body-md',
                      fieldError && 'border-destructive focus-visible:ring-destructive',
                      layout === 'vertical' && 'mt-0',
                      size === 'sm' && 'h-8 py-1',
                      classNameTrigger,
                    )}
                  >
                    <SelectValue
                      placeholder={placeholder}
                      defaultValue={field.value || ''}
                      className="text-body-md"
                      data-testid={testId}
                    />
                    {!!field.value && allowClear && (
                      <span
                        className="ml-auto mr-2"
                        onPointerDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          field.onChange(null);
                          handleChange(null);
                          field.onBlur();
                        }}
                      >
                        <CloseIcon size={20} />
                      </span>
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup className="overflow-y-auto max-h-[10rem]">
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.customLabel ?? option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  {options.length === 0 && <NoData className="my-8" />}
                </SelectContent>
              </Select>
              <FormDescription>{description}</FormDescription>
              {fieldError && (
                <p className="text-body-sm text-destructive mt-0.5">
                  {parseErrorMessage(t, fieldError.message ?? '')}
                </p>
              )}
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
