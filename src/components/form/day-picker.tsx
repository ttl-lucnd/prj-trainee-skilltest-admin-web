import { Control } from 'react-hook-form';
import { DatePicker } from '../date-picker/DatePicker';
import { CalendarProps } from '../date-picker/base-datetime-picker';
import { FormField, FormItem } from '../ui/form';
import { FormFieldLayout } from './form-field-layout';
import { DateTimePickerProps } from '../date-picker/interfaces';

type DayPickerFieldProps = {
  label?: string;
  name: string;
  required?: boolean;
  control: Control<any>;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  classNameLabel?: string;
  fieldContainerClassName?: string;
};

export function DayPickerField({
  control,
  name,
  label,
  className,
  layout,
  required,
  classNameLabel,
  fieldContainerClassName,
  ...props
}: Readonly<DayPickerFieldProps & DateTimePickerProps & CalendarProps>) {
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
            classNameLabel={classNameLabel}
            className={fieldContainerClassName}
          >
            <DatePicker
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
