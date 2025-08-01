/**
 * Shadcn Datetime Picker with support for timezone, date and time selection, minimum and maximum date limits, and 12-hour format...
 * Check out the live demo at https://shadcn-datetime-picker-pro.vercel.app/
 * Find the latest source code at https://github.com/huybuidac/shadcn-datetime-picker
 */
'use client';

import {
  addMonths,
  endOfDay,
  endOfMonth,
  format,
  getYear,
  setYear,
  startOfDay,
  startOfMonth,
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
import { ja } from 'date-fns/locale';

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
  const [month1YearPicker, setMonth1YearPicker] = useState<'month' | 'year' | false>(
    false,
  );
  const [month2YearPicker, setMonth2YearPicker] = useState<'month' | 'year' | false>(
    false,
  );

  const initDate = useMemo(
    () => new TZDate(value?.from || new Date(), timezone),
    [value, timezone],
  );

  const [month1, setMonth1] = useState<Date>(subMonths(initDate, 1));
  const [month2, setMonth2] = useState<Date>(initDate);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isPickingStart, setIsPickingStart] = useState(true);

  const endMonth1 = useMemo(() => {
    return setYear(month1, getYear(month1) + 1);
  }, [month1]);
  const endMonth2 = useMemo(() => {
    return setYear(month2, getYear(month2) + 1);
  }, [month2]);
  const minDate = useMemo(
    () => (min ? startOfDay(new TZDate(min, timezone)) : undefined),
    [min, timezone],
  );
  const maxDate = useMemo(
    () => (max ? endOfDay(new TZDate(max, timezone)) : undefined),
    [max, timezone],
  );

  const onDayChanged = useCallback(
    (d: DateRange | undefined, triggerDate: Date, index: 1 | 2) => {
      if (index === 1) {
        setMonth1(triggerDate);
      } else {
        setMonth2(triggerDate);
      }

      if (isPickingStart) {
        const from = startOfDay(triggerDate);
        setStartDate(from);
        setEndDate(undefined);
        setIsPickingStart(false);
      } else {
        const from = startOfDay(d?.from ?? triggerDate);
        const to = endOfDay(d?.to ?? triggerDate);
        setStartDate(from);
        setEndDate(to);
        if (from.getMonth() !== to.getMonth()) {
          setMonth1(from);
          setMonth2(to);
        }
        setIsPickingStart(true);
      }
    },
    [isPickingStart, startDate, setIsPickingStart, setStartDate, setEndDate, onChange],
  );

  const onSubmit = useCallback(() => {
    if (!startDate || !endDate || !isPickingStart) {
      onChange?.(undefined);
    } else {
      onChange?.({ from: startOfDay(startDate), to: endOfDay(endDate) });
    }
    setOpen(false);
  }, [isPickingStart, startDate, endDate, onChange]);

  const onMonthYearChanged1 = useCallback(
    (d: Date, mode: 'month' | 'year') => {
      setMonth1(d);
      if (mode === 'year') {
        setMonth1YearPicker('month');
      } else {
        setMonth1YearPicker(false);
      }
    },
    [setMonth1, setMonth1YearPicker],
  );
  const onNextMonth1 = useCallback(() => {
    setMonth1(addMonths(month1, 1));
  }, [month1]);
  const onPrevMonth1 = useCallback(() => {
    setMonth1(subMonths(month1, 1));
  }, [month1]);

  const onMonthYearChanged2 = useCallback(
    (d: Date, mode: 'month' | 'year') => {
      setMonth2(d);
      if (mode === 'year') {
        setMonth2YearPicker('month');
      } else {
        setMonth2YearPicker(false);
      }
    },
    [setMonth2, setMonth2YearPicker],
  );
  const onNextMonth2 = useCallback(() => {
    setMonth2(addMonths(month2, 1));
  }, [month2]);
  const onPrevMonth2 = useCallback(() => {
    setMonth2(subMonths(month2, 1));
  }, [month2]);

  useEffect(() => {
    if (open) {
      const from = value?.from;
      const to = value?.to;

      setMonth1(
        from && to && from.getMonth() < to.getMonth()
          ? from
          : subMonths(to ?? initDate, 1),
      );
      setMonth2(to ?? initDate);
      setStartDate(from);
      setEndDate(to);
      setMonth1YearPicker(false);
      setMonth2YearPicker(false);
      setIsPickingStart(true);
    }
  }, [open, initDate, value]);

  const displayValue = useMemo(() => {
    if ((!value?.from || !value?.to) && !open) return undefined;
    return { from: value?.from, to: value?.to };
  }, [value, open]);

  const displayFormat = useMemo(() => {
    if (!displayValue) return placeholder;
    const { from, to } = displayValue;
    if (!from || !to) return '';

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
  const month1YearPickerClassName = getMonthYearPickerClassName(!!month1YearPicker);

  const month2YearPickerClassName = getMonthYearPickerClassName(!!month2YearPicker);

  const isDisableBtn = useMemo(() => {
    return month1.getMonth() + 1 === month2.getMonth();
  }, [month1, month2]);

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
            tabIndex={0}
            className={cn(
              'flex w-full p-1 rounded-md border border-primary-3 min-h-10 h-auto items-center justify-between bg-white hover:bg-white [&_svg]:pointer-events-auto',
              triggerClassName,
            )}
            data-testid="datetime-picker-trigger"
          >
            <div
              className={cn(
                'w-full flex justify-between items-center',
                !displayValue && 'text-primary-5',
              )}
            >
              <span>{displayFormat}</span>
              <div className="flex items-center gap-1">
                {allowClear && displayValue?.from && displayValue?.to && (
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
      <PopoverContent className="w-auto p-2">
        <div className="flex gap-5">
          <div className="flex-col" key="startDate">
            <div className="w-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevMonth1}
                className={cn(month1YearPicker ? 'hidden' : '')}
                data-testid="datetime-picker-prev-month-1"
              >
                <ChevronLeftIcon />
              </Button>
              <div className="text-body-lg font-bold flex items-center justify-center cursor-pointer flex-1 py-2.5">
                <button
                  data-testid="datetime-picker-year"
                  className="ms-1"
                  onClick={() =>
                    setMonth1YearPicker(month1YearPicker === 'year' ? false : 'year')
                  }
                >
                  {format(month1, 'yyyy年')}
                </button>
                <button
                  data-testid="datetime-picker-month"
                  onClick={() =>
                    setMonth1YearPicker(month1YearPicker === 'month' ? false : 'month')
                  }
                >
                  {`${month1.getMonth() + 1}月`}
                </button>
              </div>
              <Button
                disabled={isDisableBtn}
                variant="ghost"
                size="icon"
                onClick={onNextMonth1}
                className={cn(
                  month1YearPicker ? 'hidden' : '',
                  isDisableBtn ? 'invisible' : '',
                )}
                data-testid="datetime-picker-next-month-1"
              >
                <ChevronRightIcon />
              </Button>
            </div>
            <div className="relative overflow-hidden">
              <DayPicker
                locale={ja}
                fixedWeeks
                timeZone={timezone}
                mode="range"
                selected={{ from: startDate, to: endDate }}
                onSelect={(d, triggerDate) => onDayChanged(d, triggerDate, 1)}
                month={month1}
                endMonth={endMonth1}
                disabled={
                  [max ? { after: max } : null, min ? { before: min } : null].filter(
                    Boolean,
                  ) as Matcher[]
                }
                onMonthChange={setMonth1}
                classNames={{
                  dropdowns: 'flex w-full gap-2',
                  months: 'flex w-full h-fit',
                  month: 'flex flex-col w-full',
                  month_caption: 'hidden',
                  button_previous: 'hidden',
                  button_next: 'hidden',
                  month_grid: 'w-full border-collapse',
                  weekdays: 'flex justify-between mt-2',
                  weekday:
                    'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                  week: 'flex w-full justify-between mt-2',
                  day: 'h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1',
                  day_button: cn(
                    'size-9 rounded-md p-0 font-normal aria-selected:opacity-100 hover:bg-primary-4 group-hover/selected:bg-primary-2 group-hover/selected:text-primary-foreground',
                  ),
                  range_start: 'rounded-l-md day-range-start',
                  range_end:
                    '[&:not(.day-range-start)]:rounded-l-none rounded-r-md day-range-end',
                  selected:
                    'rounded-l-md bg-primary-2 text-primary-foreground  hover:text-primary-foreground focus:bg-primary-2 focus:text-primary-foreground group/selected',
                  today:
                    'bg-accent text-accent-foreground [&:not([data-selected=true])]:rounded-md',
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
              <div className={month1YearPickerClassName}></div>
              <MonthYearPicker
                value={month1}
                mode={month1YearPicker as any}
                onChange={onMonthYearChanged1}
                minDate={minDate}
                maxDate={endOfMonth(subMonths(month2, 1))}
                className={cn(
                  'absolute top-0 left-0 bottom-0 right-0',
                  month1YearPicker ? '' : 'hidden',
                )}
              />
            </div>
          </div>
          <div className="flex-col" key="endDate">
            <div className="w-full flex items-center justify-center">
              <Button
                disabled={isDisableBtn}
                variant="ghost"
                size="icon"
                onClick={onPrevMonth2}
                className={cn(
                  month2YearPicker ? 'hidden' : '',
                  isDisableBtn ? 'invisible' : '',
                )}
                data-testid="datetime-picker-prev-month-2"
              >
                <ChevronLeftIcon />
              </Button>
              <div className="text-body-lg font-bold flex items-center justify-center cursor-pointer flex-1 py-2.5">
                <button
                  data-testid="datetime-picker-year"
                  className="ms-1"
                  onClick={() =>
                    setMonth2YearPicker(month2YearPicker === 'year' ? false : 'year')
                  }
                >
                  {format(month2, 'yyyy年')}
                </button>
                <button
                  data-testid="datetime-picker-month"
                  onClick={() =>
                    setMonth2YearPicker(month2YearPicker === 'month' ? false : 'month')
                  }
                >
                  {`${month2.getMonth() + 1}月`}
                </button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNextMonth2}
                className={cn(month2YearPicker ? 'hidden' : '')}
                data-testid="datetime-picker-next-month-2"
              >
                <ChevronRightIcon />
              </Button>
            </div>
            <div className="relative overflow-hidden">
              <DayPicker
                locale={ja}
                fixedWeeks
                timeZone={timezone}
                mode="range"
                selected={{ from: startDate, to: endDate }}
                onSelect={(d, triggerDate) => onDayChanged(d, triggerDate, 2)}
                month={month2}
                endMonth={endMonth2}
                disabled={
                  [max ? { after: max } : null, min ? { before: min } : null].filter(
                    Boolean,
                  ) as Matcher[]
                }
                onMonthChange={setMonth2}
                classNames={{
                  dropdowns: 'flex w-full gap-2',
                  months: 'flex w-full h-fit',
                  month: 'flex flex-col w-full',
                  month_caption: 'hidden',
                  button_previous: 'hidden',
                  button_next: 'hidden',
                  month_grid: 'w-full border-collapse',
                  weekdays: 'flex justify-between mt-2',
                  weekday:
                    'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                  week: 'flex w-full justify-between mt-2',
                  day: 'h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1',
                  day_button: cn(
                    'size-9 rounded-md p-0 font-normal aria-selected:opacity-100 hover:bg-primary-4 group-hover/selected:bg-primary-2 group-hover/selected:text-primary-foreground',
                  ),
                  range_start: 'rounded-l-md day-range-start',
                  range_end:
                    '[&:not(.day-range-start)]:rounded-l-none rounded-r-md day-range-end',
                  selected:
                    'rounded-l-md bg-primary-2 text-primary-foreground  hover:text-primary-foreground focus:bg-primary-2 focus:text-primary-foreground group/selected',
                  today:
                    'bg-accent text-accent-foreground [&:not([data-selected=true])]:rounded-md',
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
              <div className={month2YearPickerClassName}></div>
              <MonthYearPicker
                value={month2}
                mode={month2YearPicker as any}
                onChange={onMonthYearChanged2}
                minDate={startOfMonth(addMonths(month1, 1))}
                maxDate={maxDate}
                className={cn(
                  'absolute top-0 left-0 bottom-0 right-0',
                  month2YearPicker ? '' : 'hidden',
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2 border-t pt-2">
          <div className="flex flex-row-reverse items-center justify-between">
            <Button
              size="sx"
              className="ms-2 px-4 h-8 font-normal"
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
      </PopoverContent>
    </Popover>
  );
}
