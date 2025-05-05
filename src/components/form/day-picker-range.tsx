import { Control } from 'react-hook-form';
import { DatePicker } from '../date-picker/DatePicker';
import { CalendarProps } from '../date-picker/base-datetime-picker';
import { FormField, FormItem } from '../ui/form';
import { FormFieldLayout } from './form-field-layout';
import { DateTimePickerProps } from '../date-picker/interfaces';
import { cn } from '@/lib/utils';

type DayPickerRangeFieldProps = {
  label?: string;
  startName: string;
  endName: string;
  required?: boolean;
  control: Control<any>;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  classNameLabel?: string;
  fieldContainerClassName?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  onFromDateChange?: (date: Date | undefined) => void;
  onToDateChange?: (date: Date | undefined) => void;
};

export function DayPickerRangeField({
  control,
  startName,
  endName,
  label,
  className,
  layout,
  required,
  classNameLabel,
  fieldContainerClassName,
  startPlaceholder = '--',
  endPlaceholder = '--',
  onFromDateChange,
  onToDateChange,
  ...props
}: Readonly<DayPickerRangeFieldProps & DateTimePickerProps & CalendarProps>) {
  return (
    <FormItem className={className}>
      <FormFieldLayout
        label={label}
        required={required}
        layout={layout}
        classNameLabel={classNameLabel}
        className={fieldContainerClassName}
      >
        <div className="flex border border-textDefaultColor bg-white rounded-md">
          <FormField
            control={control}
            name={startName}
            render={({ field, fieldState: { error: fieldError } }) => (
              <div className="flex-1">
                <DatePicker
                  {...props}
                  {...field}
                  status={fieldError ? 'error' : undefined}
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    onFromDateChange?.(date);
                  }}
                  placeholder={startPlaceholder}
                  className={cn(fieldError && 'border-status-error', 'border-none')}
                  isNoBorder={true}
                  allowClear={true}
                />
                {fieldError && (
                  <div className="text-status-error text-sm mt-1">
                    {fieldError.message}
                  </div>
                )}
              </div>
            )}
          />
          <div className="flex items-center justify-center w-2">{'-'}</div>
          <FormField
            control={control}
            name={endName}
            render={({ field, fieldState: { error: fieldError } }) => (
              <div className="flex-1">
                <DatePicker
                  {...props}
                  {...field}
                  status={fieldError ? 'error' : undefined}
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    onToDateChange?.(date);
                  }}
                  placeholder={endPlaceholder}
                  className={cn(fieldError && 'border-status-error', 'border-none')}
                  min={control._getWatch(startName)}
                  isNoBorder={true}
                  allowClear={true}
                />
                {fieldError && (
                  <div className="text-status-error text-sm mt-1">
                    {fieldError.message}
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </FormFieldLayout>
    </FormItem>
  );
}
