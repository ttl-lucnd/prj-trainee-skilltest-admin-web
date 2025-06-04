import * as React from 'react';

import { cn } from '@/lib/utils';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    isRoundedAll?: boolean;
    isBorderForm?: boolean;
    isBorderFormBottom?: boolean;
    showScrollbar?: boolean;
    containerRef?: React.RefObject<HTMLDivElement | null>;
    containerClassName?: string;
  }
>(
  (
    {
      className,
      isRoundedAll = true,
      isBorderForm = true,
      isBorderFormBottom = false,
      showScrollbar = false,
      containerRef,
      containerClassName,
      ...props
    }: {
      className?: string;
      isRoundedAll?: boolean;
      isBorderForm?: boolean;
      isBorderFormBottom?: boolean;
      showScrollbar?: boolean;
      containerRef?: React.RefObject<HTMLDivElement | null>;
      containerClassName?: string;
    },
    ref: React.ForwardedRef<HTMLTableElement>,
  ) => (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-white',
        isBorderForm && 'border-form',
        isRoundedAll && 'rounded-xl',
        isBorderFormBottom && 'border-form-bottom',
      )}
    >
      <div
        className={cn(
          'max-h-[calc(100vh-200px)] overflow-auto',
          !showScrollbar && 'scrollbar-hide',
          containerClassName,
        )}
        ref={containerRef}
      >
        <table
          ref={ref}
          className={cn('w-full caption-bottom text-sm table-fixed', className)}
          {...props}
        />
      </div>
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('sticky top-0 bg-white z-10 w-full h-[52px] shadow-[0_1px_0_0_#9BA5B7]', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { onClick?: () => void }
>(({ className, onClick, ...props }, ref) => (
  <tr
    ref={ref}
    onClick={() => {
      onClick?.();
    }}
    className={cn(
      'border-b transition-colors data-[state=selected]:bg-muted border-main-primary-3',
      // "tbody & hover:bg-main-secondary-2",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { width?: string | number }
>(({ className, width, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'py-3 px-4 leading-snug text-left align-middle font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0 text-textDefaultColor whitespace-nowrap',
      className,
    )}
    style={{ width }}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & { ellipsis?: boolean }
>(({ className, ellipsis = true, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0 ',
      ellipsis && 'overflow-hidden text-ellipsis whitespace-nowrap',
      className,
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
