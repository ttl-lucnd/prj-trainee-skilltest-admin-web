import { useCallback, useEffect, useMemo, useRef } from 'react';
import { TimeOption } from './interfaces';
import {
  endOfMonth,
  endOfYear,
  setYear,
  startOfMonth,
  startOfYear,
  setMonth as setMonthFns,
  getMonth,
  getYear,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { END_YEAR, MONTHS_IN_YEAR, START_YEAR } from './helpers';

export function MonthYearPicker({
  value,
  minDate,
  maxDate,
  mode = 'month',
  onChange,
  className,
}: Readonly<{
  value: Date;
  mode: 'month' | 'year';
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: Date, mode: 'month' | 'year') => void;
  className?: string;
}>) {
  const yearRef = useRef<HTMLDivElement>(null);
  const years = useMemo(() => {
    const years: TimeOption[] = [];
    for (let i = START_YEAR; i < END_YEAR; i++) {
      let disabled = false;
      const startY = startOfYear(setYear(value, i));
      const endY = endOfYear(setYear(value, i));
      if (minDate && endY < minDate) disabled = true;
      if (maxDate && startY > maxDate) disabled = true;
      years.push({ value: i, label: i.toString(), disabled });
    }
    return years;
  }, [value]);
  const months = useMemo(() => {
    const months: TimeOption[] = [];
    for (let i = 0; i < MONTHS_IN_YEAR; i++) {
      let disabled = false;
      const startM = startOfMonth(setMonthFns(value, i));
      const endM = endOfMonth(setMonthFns(value, i));
      if (minDate && endM < minDate) disabled = true;
      if (maxDate && startM > maxDate) disabled = true;
      months.push({ value: i, label: `${i + 1}月`, disabled });
    }
    return months;
  }, [value]);

  const onYearChange = useCallback(
    (v: TimeOption) => {
      let newDate = setYear(value, v.value);
      if (minDate && newDate < minDate) {
        newDate = setMonthFns(newDate, getMonth(minDate));
      }
      if (maxDate && newDate > maxDate) {
        newDate = setMonthFns(newDate, getMonth(maxDate));
      }
      onChange(newDate, 'year');
    },
    [onChange, value, minDate, maxDate],
  );

  useEffect(() => {
    if (mode === 'year') {
      yearRef.current?.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  }, [mode, value]);
  return (
    <div className={cn(className)}>
      <ScrollArea className="h-full">
        {mode === 'year' && (
          <div className="grid grid-cols-4">
            {years.map((year) => (
              <div
                key={year.value}
                ref={year.value === getYear(value) ? yearRef : undefined}
              >
                <Button
                  disabled={year.disabled}
                  variant={getYear(value) === year.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onYearChange(year)}
                >
                  {year.label}
                </Button>
              </div>
            ))}
          </div>
        )}
        {mode === 'month' && (
          <div className="grid grid-cols-3 gap-4">
            {months.map((month) => (
              <Button
                key={month.value}
                disabled={month.disabled}
                variant={getMonth(value) === month.value ? 'default' : 'ghost'}
                onClick={() => onChange(setMonthFns(value, month.value), 'month')}
              >
                {month.label}
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
