import { useState } from 'react';
import { CalendarProps, BaseDateTimePicker } from './base-datetime-picker';
import { DateTimePickerProps } from './interfaces';

export function DatePicker(
  props: DateTimePickerProps & CalendarProps & { isNoBorder?: boolean },
) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <BaseDateTimePicker
      value={date}
      onChange={(date) => setDate(date)}
      hideTime={true}
      isNoBorder={props.isNoBorder}
      {...props}
    />
  );
}
