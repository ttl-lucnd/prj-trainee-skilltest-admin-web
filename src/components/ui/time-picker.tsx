'use client';

import * as React from 'react';
import dayjs from 'dayjs';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';
import { CloseIcon } from '../icons';

interface TimePickerProps {
  value?: Date;
  onChange?: (date?: Date) => void;
  allowClear?: boolean;
  placeholder?: string;
  disabled?: boolean;
  status?: 'error' | 'warning' | 'success';
  timeStep?: number;
  dataTestId?: string;
}

const DEBOUNCE_TIME = 150;
const MINUTES_IN_HOUR = 60;

export function TimePicker({
  value,
  onChange,
  allowClear,
  placeholder,
  disabled,
  status,
  timeStep = 1,
  dataTestId,
}: Readonly<TimePickerProps>) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from(
    { length: MINUTES_IN_HOUR / timeStep },
    (_, i) => i * timeStep,
  );
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedHourRef = React.useRef<HTMLButtonElement>(null);
  const selectedMinuteRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  React.useEffect(() => {
    if (isOpen && date) {
      setTimeout(() => {
        selectedHourRef.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
        selectedMinuteRef.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }, DEBOUNCE_TIME);
    }
  }, [isOpen, date]);

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    const newDate = date ? new Date(date) : new Date();
    if (type === 'hour') {
      newDate.setHours(parseInt(value));
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value));
    }
    setDate(newDate);
    onChange?.(newDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'w-full justify-between text-left font-normal hover:bg-white',
            status === 'error' && 'border-status-error',
          )}
          disabled={disabled}
          data-testid={dataTestId ?? 'time-picker-trigger'}
        >
          {date ? (
            dayjs(date).format('HH:mm')
          ) : (
            <span className="text-primary-3">{placeholder}</span>
          )}
          <span className="flex items-center gap-1">
            {allowClear && !!date && (
              <span
                className="cursor-pointer "
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDate(undefined);
                  onChange?.(undefined);
                }}
              >
                <CloseIcon size={20} />
              </span>
            )}
            <Clock className="h-4 w-4" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
          <ScrollArea className="w-64 sm:w-auto">
            <div className="flex sm:flex-col p-2">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  ref={date?.getHours() === hour ? selectedHourRef : undefined}
                  size="sm"
                  variant={date && date.getHours() === hour ? 'default' : 'ghost'}
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange('hour', hour.toString())}
                >
                  {hour.toString().padStart(2, '0')}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>
          <ScrollArea className="w-64 sm:w-auto">
            <div className="flex sm:flex-col p-2">
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  ref={date?.getMinutes() === minute ? selectedMinuteRef : undefined}
                  size="sm"
                  variant={date && date.getMinutes() === minute ? 'default' : 'ghost'}
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange('minute', minute.toString())}
                >
                  {minute.toString().padStart(2, '0')}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
