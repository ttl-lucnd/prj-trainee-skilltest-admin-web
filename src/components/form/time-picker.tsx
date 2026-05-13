import { Control } from 'react-hook-form';
import { FormField, FormItem } from '../ui/form';
import { TimePicker } from '../ui/time-picker';
import { FormFieldLayout } from './form-field-layout';

interface TimePickerProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  control: Control<any>;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  format?: string;
  allowClear?: boolean;
  timeStep?: number;
  dataTestId?: string;
}

export function TimePickerField({
  control,
  name,
  label,
  className,
  layout,
  required,
  allowClear,
  placeholder,
  disabled,
  timeStep,
  dataTestId,
}: Readonly<TimePickerProps>) {
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
          >
            <TimePicker
              value={field.value}
              onChange={field.onChange}
              allowClear={allowClear}
              placeholder={placeholder}
              disabled={disabled}
              status={fieldError ? 'error' : undefined}
              timeStep={timeStep}
              dataTestId={dataTestId}
            />
          </FormFieldLayout>
        </FormItem>
      )}
    />
  );
}
