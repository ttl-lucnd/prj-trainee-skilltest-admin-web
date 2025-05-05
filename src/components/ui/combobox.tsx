'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import NoData from '../NoData';
import { TruncatedText } from '../TruncateText';
import { ChevronDownIcon } from '../icons';
import { useTranslations } from 'next-intl';

type ValueType = string | number | null | undefined;

export interface IComboboxProps {
  value?: ValueType;
  placeholder?: string;
  searchPlaceholder?: string;
  options: { label: string; value: ValueType }[];
  allowClear?: boolean;
  className?: string;
  onChange?: (value?: ValueType) => void;
  onOpenChange?: (open: boolean) => void;
}

export function Combobox({
  value,
  placeholder = '',
  searchPlaceholder,
  options,
  allowClear = false,
  className,
  onChange,
  onOpenChange,
}: Readonly<IComboboxProps>) {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [_value, setValue] = React.useState<ValueType>();

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>();

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  React.useEffect(() => {
    if (open && _value) {
      setTimeout(() => {
        if (listRef.current) {
          const selectedItem = listRef.current.querySelector(`[data-value="${_value}"]`);
          selectedItem?.scrollIntoView({ block: 'center' });
        }
      }, 0);
    }
  }, [open, _value]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange],
  );

  const handleSelect = React.useCallback(
    (value: string) => {
      setValue(value);
      handleOpenChange(false);
      onChange?.(value);
    },
    [onChange, handleOpenChange],
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setValue(null);
      onChange?.(null);
    },
    [onChange],
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          aria-expanded={open}
          className={cn(
            'w-full h-10 flex items-center justify-between gap-2 truncate border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none text-body-md',
            className,
          )}
        >
          <span className={cn('truncate', !_value && 'text-primary-3')}>
            {_value
              ? options.find((option) => option.value === _value)?.label
              : placeholder}
          </span>
          <span className="flex items-center gap-2">
            {allowClear && _value && (
              <X
                className="h-4 w-4 shrink-0 cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={handleClear}
                data-testid="clear-button"
              />
            )}
            <ChevronDownIcon
              size={16}
              className={cn('shrink-0 opacity-50', open && 'rotate-180')}
            />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: triggerWidth ? `${triggerWidth}px` : 'auto' }}
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder ?? t('common.searchPlaceholder')}
          />
          <CommandList ref={listRef}>
            <CommandEmpty>
              <NoData />
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value?.toString()}
                  className="truncate"
                  onSelect={handleSelect}
                  data-value={option.value}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 flex-shrink-0',
                      _value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <TruncatedText text={option.label} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
