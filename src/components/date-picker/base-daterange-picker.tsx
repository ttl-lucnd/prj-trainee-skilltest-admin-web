/**
 * Shadcn Datetime Picker with support for timezone, date and time selection, minimum and maximum date limits, and 12-hour format...
 * Check out the live demo at https://shadcn-datetime-picker-pro.vercel.app/
 * Find the latest source code at https://github.com/huybuidac/shadcn-datetime-picker
 */
'use client';

import {
  addMonths,
  endOfDay,
  format,
  getYear,
  setYear,
  startOfDay,
  subMonths,
} from 'date-fns';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange, DayPicker, Matcher, TZDate } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CloseIcon } from '../icons';
import { MonthYearPicker } from './MonthYearPicker';
import { getDateTimeFormat } from './helpers';
import { DateRangePickerProps } from './interfaces';

export type CalendarProps = Omit<React.ComponentProps<typeof DayPicker>, 'mode'>;

// Extract trigger class names into a separate function
const getTriggerClassName = ({
  displayValue,
  isNoBorder,
  allowClear,
  value,
  disabled,
  classNames,
  size,
  status,
}: {
  displayValue?: DateRange;
  isNoBorder?: boolean;
  allowClear?: boolean;
  value?: DateRange;
  disabled?: boolean;
  classNames?: any;
  size?: string;
  status?: string;
}) => {
  const baseClasses =
    'flex w-full cursor-pointer items-center h-9 px-3 font-normal bg-white rounded-md text-sm shadow-sm';
  const displayClasses = !displayValue ? 'text-primary-3' : '';
  const borderClasses = isNoBorder ? 'border-none' : '';
  const paddingClasses = !allowClear || !value ? 'pe-3' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  }[size ?? 'md'];
  const statusClasses = status === 'error' ? 'border-status-error' : '';
  const triggerClasses = classNames?.trigger || '';

  return cn(
    baseClasses,
    displayClasses,
    borderClasses,
    paddingClasses,
    disabledClasses,
    sizeClasses,
    statusClasses,
    triggerClasses,
  );
};

// Extract month year picker class names into a separate function
const getMonthYearPickerClassName = (monthYearPicker: boolean) => {
  return cn(
    'absolute top-0 left-0 bottom-0 right-0',
    monthYearPicker ? 'bg-popover' : 'hidden',
  );
};

export function BaseDateRangePicker({
  value,
  onChange,
  renderTrigger,
  min,
  max,
  timezone,
  hideTime,
  use12HourFormat,
  disabled,
  allowClear,
  classNames,
  placeholder,
  modal = false,
  dateFormat,
  size = 'md',
  isNoBorder = false,
  status,
  ...props
}: DateRangePickerProps & CalendarProps & { isNoBorder?: boolean }) {
  const [open, setOpen] = useState(false);
  const [monthYearPicker, setMonthYearPicker] = useState<'month' | 'year' | false>(false);
  const initDate = useMemo(
    () => new TZDate(value?.from || new Date(), timezone),
    [value, timezone],
  );

  const [month, setMonth] = useState<Date>(initDate);
  const [startDate, setStartDate] = useState<Date>(initDate);
  const [endDate, setEndDate] = useState<Date>(initDate);

  const endMonth = useMemo(() => {
    return setYear(month, getYear(month) + 1);
  }, [month]);
  const minDate = useMemo(
    () => (min ? startOfDay(new TZDate(min, timezone)) : undefined),
    [min, timezone],
  );
  const maxDate = useMemo(
    () => (max ? endOfDay(new TZDate(max, timezone)) : undefined),
    [max, timezone],
  );

  const onDayChanged = useCallback(
    (d: DateRange) => {
      setStartDate(startOfDay(d.from ?? initDate));
      setEndDate(endOfDay(d.to ?? initDate));
    },
    [setStartDate, setEndDate, onChange],
  );

  const onSubmit = useCallback(() => {
    if (!startDate || !endDate) {
      onChange?.(undefined);
    } else {
      onChange?.({ from: startDate, to: endDate });
    }
    setOpen(false);
  }, [startDate, endDate, onChange]);

  const onMonthYearChanged = useCallback(
    (d: Date, mode: 'month' | 'year') => {
      setMonth(d);
      if (mode === 'year') {
        setMonthYearPicker('month');
      } else {
        setMonthYearPicker(false);
      }
    },
    [setMonth, setMonthYearPicker],
  );
  const onNextMonth = useCallback(() => {
    setMonth(addMonths(month, 1));
  }, [month]);
  const onPrevMonth = useCallback(() => {
    setMonth(subMonths(month, 1));
  }, [month]);

  useEffect(() => {
    if (open) {
      setMonth(value?.from ?? initDate);
      setStartDate(value?.from ?? initDate);
      setEndDate(value?.to ?? initDate);
      setMonthYearPicker(false);
    }
  }, [open, initDate, value]);

  const displayValue = useMemo(() => {
    if ((!value?.from || !value?.to) && !open) return undefined;
    return { from: startDate, to: endDate };
  }, [value, open]);

  const displayFormat = useMemo(() => {
    if (!displayValue) return placeholder;
    const { from, to } = displayValue;
    const start = format(
      from,
      getDateTimeFormat({
        dateFormat,
        hideTime,
        use12HourFormat,
      }),
    );

    const end = format(
      to,
      getDateTimeFormat({
        dateFormat,
        hideTime,
        use12HourFormat,
      }),
    );

    return `${start} - ${end}`;
  }, [displayValue, placeholder, hideTime, use12HourFormat, dateFormat]);

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange?.(undefined);
    setOpen(false);
  };

  const triggerProps = {
    displayValue,
    isNoBorder,
    allowClear,
    value,
    disabled,
    classNames,
    size,
    status,
  };

  const triggerClassName = getTriggerClassName(triggerProps);
  const monthYearPickerClassName = getMonthYearPickerClassName(!!monthYearPicker);

  return (
    <Popover open={open} onOpenChange={!disabled ? setOpen : undefined} modal={modal}>
      <PopoverTrigger asChild>
        {renderTrigger ? (
          renderTrigger({
            value: displayValue,
            open,
            timezone,
            disabled,
            use12HourFormat,
            setOpen,
          })
        ) : (
          <div
            role="button"
            tabIndex={0}
            className={cn(
              'flex w-full p-1 rounded-md border border-primary-3 min-h-10 h-auto items-center justify-between bg-white hover:bg-white [&_svg]:pointer-events-auto',
              triggerClassName,
            )}
            data-testid="datetime-picker-trigger"
          >
            <div className="w-full flex justify-between items-center">
              {displayFormat}
              <div className="flex items-center gap-1">
                {allowClear && displayValue && (
                  <button
                    disabled={disabled}
                    aria-label="Clear date"
                    onClick={handleClearDate}
                  >
                    <CloseIcon size={20} />
                  </button>
                )}
                <CalendarIcon className="size-4 text-[#5D6B98]" />
              </div>
            </div>
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2">
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevMonth}
            className={cn(monthYearPicker ? 'hidden' : '')}
            data-testid="datetime-picker-prev-month"
          >
            <ChevronLeftIcon />
          </Button>
          <div className="text-body-lg font-bold ms-2 flex items-center justify-center cursor-pointer flex-1 py-2.5">
            <button
              data-testid="datetime-picker-year"
              className="ms-1"
              onClick={() =>
                setMonthYearPicker(monthYearPicker === 'year' ? false : 'year')
              }
            >
              {format(month, 'yyyy年')}
            </button>
            <button
              data-testid="datetime-picker-month"
              onClick={() =>
                setMonthYearPicker(monthYearPicker === 'month' ? false : 'month')
              }
            >
              {`${month.getMonth() + 1}月`}
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextMonth}
            className={cn(monthYearPicker ? 'hidden' : '')}
            data-testid="datetime-picker-next-month"
          >
            <ChevronRightIcon />
          </Button>
        </div>
        <div className="relative overflow-hidden">
          <DayPicker
            timeZone={timezone}
            mode="range"
            selected={{ from: startDate, to: endDate }}
            onSelect={(d) => d && onDayChanged(d)}
            month={month}
            endMonth={endMonth}
            disabled={
              [max ? { after: max } : null, min ? { before: min } : null].filter(
                Boolean,
              ) as Matcher[]
            }
            onMonthChange={setMonth}
            classNames={{
              dropdowns: 'flex w-full gap-2',
              months: 'flex w-full h-fit',
              month: 'flex flex-col w-full',
              month_caption: 'hidden',
              button_previous: 'hidden',
              button_next: 'hidden',
              month_grid: 'w-full border-collapse',
              weekdays: 'flex justify-between mt-2',
              weekday: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
              week: 'flex w-full justify-between mt-2',
              day: 'h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1',
              day_button: cn(
                'size-9 rounded-md p-0 font-normal aria-selected:opacity-100 hover:bg-primary-4 group-hover/selected:bg-primary-2 group-hover/selected:text-primary-foreground',
              ),
              range_end: 'day-range-end',
              selected:
                'bg-primary-2 text-primary-foreground  hover:text-primary-foreground focus:bg-primary-2 focus:text-primary-foreground rounded-l-md rounded-r-md group/selected',
              today: 'bg-accent text-accent-foreground rounded-md',
              outside:
                'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
              disabled: 'text-muted-foreground opacity-50',
              range_middle:
                'aria-selected:bg-accent aria-selected:text-accent-foreground',
              hidden: 'invisible',
            }}
            showOutsideDays={true}
            {...props}
          />
          <div className={monthYearPickerClassName}></div>
          <MonthYearPicker
            value={month}
            mode={monthYearPicker as any}
            onChange={onMonthYearChanged}
            minDate={minDate}
            maxDate={maxDate}
            className={cn(
              'absolute top-0 left-0 bottom-0 right-0',
              monthYearPicker ? '' : 'hidden',
            )}
          />
        </div>
        {!monthYearPicker && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-row-reverse items-center justify-between">
              <Button
                size="sx"
                className="ms-2 yt h-8 font-normal"
                onClick={onSubmit}
                data-testid="datetime-picker-submit"
              >
                設定
              </Button>
              {timezone && (
                <div className="text-sm">
                  <span>Timezone:</span>
                  <span className="font-semibold ms-1">{timezone}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
