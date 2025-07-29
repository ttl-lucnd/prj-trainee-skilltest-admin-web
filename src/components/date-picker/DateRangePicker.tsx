import { useState } from 'react';
import { CalendarProps } from './base-datetime-picker';
import { DateRangePickerProps } from './interfaces';
import { DateRange } from 'react-day-picker';
import { BaseDateRangePicker } from './base-daterange-picker';

export function DateRangePicker(
  props: DateRangePickerProps & CalendarProps & { isNoBorder?: boolean },
) {
  const [date, setDate] = useState<DateRange | undefined>();
  return (
    <BaseDateRangePicker
      value={date}
      onChange={(date) => setDate(date)}
      hideTime={true}
      isNoBorder={props.isNoBorder}
      {...props}
    />
  );
}
