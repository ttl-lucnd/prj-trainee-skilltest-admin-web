'use client';

import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { INPUT_NUMBER_ALLOW_KEYS, DECIMAL_ALLOW_CODES } from '@/utils';

interface InputDateProps {
  readonly control: Control<any>;
  readonly name: string;
  readonly label?: string;
  readonly yearMin?: number;
  readonly yearMax?: number;
  readonly monthMin?: number;
  readonly monthMax?: number;
  readonly dayMin?: number;
  readonly dayMax?: number;
}

export function InputDate({
  control,
  name,
  label,
  yearMin = 1900,
  yearMax = 2100,
  monthMin = 1,
  monthMax = 12,
  dayMin = 1,
  dayMax = 31,
}: InputDateProps) {
  const t = useTranslations();
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [day, setDay] = useState<number>();

  const preventInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (INPUT_NUMBER_ALLOW_KEYS.includes(event.key)) {
      if (!event.ctrlKey && !event.metaKey) {
        event.preventDefault();
      }
      return;
    }
    if (!DECIMAL_ALLOW_CODES.includes(event.code) || event.shiftKey) {
      event.preventDefault();
    }
  };

  return (
    <FormItem className="flex items-center gap-2">
      {label && (
        <FormLabel className="min-w-[140px] text-left w-1/4 self-center mt-2">
          {label}
        </FormLabel>
      )}
      <div className="flex items-center space-x-[7.5px] mt-2">
        <FormField
          control={control}
          name={`${name}.year`}
          render={({ field }) => (
            <FormControl>
              <Input
                type="number"
                placeholder="----"
                data-testid="year-input"
                min={yearMin}
                max={yearMax}
                {...field}
                value={field.value || ''}
                className={cn(
                  'w-[52px] px-2 text-center outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 shadow-none',
                )}
                onKeyDown={preventInput}
                onChange={(e) => {
                  const value = Number(e.target?.value);
                  if (yearMax && value > yearMax) {
                    field.onChange(year);
                    return;
                  }
                  setYear(value);
                  field.onChange(value);
                }}
              />
            </FormControl>
          )}
        />
        <span className="text-sm">{t('common.date.year')}</span>
        <FormField
          control={control}
          name={`${name}.month`}
          render={({ field }) => (
            <FormControl>
              <Input
                type="number"
                placeholder="--"
                data-testid="month-input"
                min={monthMin}
                max={monthMax}
                {...field}
                value={field.value || ''}
                className={cn(
                  'w-10 px-2 text-center outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 shadow-none',
                )}
                onKeyDown={preventInput}
                onChange={(e) => {
                  const value = Number(e.target?.value);
                  if (monthMax && value > monthMax) {
                    field.onChange(month);
                    return;
                  }

                  setMonth(value);
                  field.onChange(value);
                }}
              />
            </FormControl>
          )}
        />
        <span className="text-sm">{t('common.date.month')}</span>
        <FormField
          control={control}
          name={`${name}.day`}
          render={({ field }) => (
            <FormControl>
              <Input
                type="number"
                placeholder="--"
                data-testid="day-input"
                min={dayMin}
                max={dayMax}
                {...field}
                value={field.value || ''}
                className={cn(
                  'w-10 px-2 text-center outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 shadow-none',
                )}
                onKeyDown={preventInput}
                onChange={(e) => {
                  const value = Number(e.target?.value);
                  if (dayMax && value > dayMax) {
                    field.onChange(day);
                    return;
                  }

                  if (dayMin && value < dayMin) {
                    field.onChange(day);
                    setDay(value);
                    return;
                  }
                  setDay(value);
                  field.onChange(value);
                }}
              />
            </FormControl>
          )}
        />
        <span className="text-sm">{t('common.date.day')}</span>
      </div>
    </FormItem>
  );
}
