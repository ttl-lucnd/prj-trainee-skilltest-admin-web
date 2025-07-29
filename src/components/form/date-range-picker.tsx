import { Control } from 'react-hook-form';
import { CalendarProps } from '../date-picker/base-datetime-picker';
import { FormField, FormItem } from '../ui/form';
import { FormFieldLayout } from './form-field-layout';
import { DateRangePicker } from '../date-picker/DateRangePicker';
import { DateRangePickerProps } from '../date-picker/interfaces';
import { cn } from '@/lib/utils';

type DateRangePickerFieldProps = {
  label?: string;
  name: string;
  required?: boolean;
  control: Control<any>;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  classNameLabel?: string;
  fieldContainerClassName?: string;
};

export function DateRangePickerField({
  control,
  name,
  label,
  className,
  layout,
  required,
  classNameLabel,
  fieldContainerClassName,
  ...props
}: Readonly<DateRangePickerProps & DateRangePickerFieldProps & CalendarProps>) {
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
            errorMessage={fieldError?.message}
            classNameLabel={classNameLabel}
            className={cn(
              fieldError
                ? 'border-destructive'
                : 'outline-none focus-within:ring-2 focus-within:ring-primary-2 focus-within:border-primary-2 shadow-none',
              fieldContainerClassName,
            )}
          >
            <DateRangePicker
              {...props}
              {...field}
              status={fieldError ? 'error' : undefined}
              value={field.value}
              onChange={(date) => field.onChange(date)}
            />
          </FormFieldLayout>
        </FormItem>
      )}
    />
  );
}
