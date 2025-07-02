'use client';

import {
  Column,
  ColumnDef,
  ColumnPinningState,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { CSSProperties, useEffect, useState, forwardRef } from 'react';
import NoData from './NoData';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
declare module '@tanstack/table-core' {
  // @ts-expect-error - Extending @tanstack/table-core types to add custom column metadata properties
  interface ColumnMeta {
    rowSpan?: number;
    colSpan?: number;
  }
}

const getBoxShadow = (column: Column<any>): string | undefined => {
  const isPinned = column.getIsPinned();
  if (isPinned === 'left' && column.getIsLastColumn('left')) {
    return '-4px 0 4px -4px rgba(0,0,0,0.3) inset';
  }
  if (isPinned === 'right' && column.getIsFirstColumn('right')) {
    return '4px 0 4px -4px rgba(0,0,0,0.3) inset';
  }
  return undefined;
};

const getCommonPinningStyles = (
  column: Column<any>,
  shouldShowShadow: boolean,
): CSSProperties => {
  const isPinned = column.getIsPinned();

  return {
    boxShadow: shouldShowShadow ? getBoxShadow(column) : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : column.getSize(),
    zIndex: isPinned ? 1 : undefined,
  };
};

const nearBottomThreshold = 50;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnPinning?: ColumnPinningState;
  loading?: boolean;
  className?: string;
  onRowClick?: (row?: TData) => void;
  rowClassName?: string;
  customRowClassName?: (row: TData) => string;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  enableInfiniteScroll?: boolean;
  onSortingChange?: (sortingState?: ColumnSort) => void;
  totalItems?: number;
  containerClassName?: string;
  showBorderVertical?: boolean;
  headerClassName?: string;
  sorting?: SortingState;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  enableMultiRowSelection?: boolean | ((row: Row<any>) => boolean);
}

export const DataTable = forwardRef<any, DataTableProps<any, any>>(function DataTable(
  {
    columns,
    data,
    columnPinning,
    loading,
    className,
    onRowClick,
    rowClassName,
    customRowClassName,
    hasNextPage,
    onLoadMore,
    enableInfiniteScroll = false,
    onSortingChange,
    totalItems,
    containerClassName,
    showBorderVertical = false,
    headerClassName,
    sorting = [],
    setSorting,
    enableMultiRowSelection,
  },
  ref,
) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [shouldShowShadow, setShouldShowShadow] = useState(true);
  const [rowSelection, setRowSelection] = React.useState({});

  const { inView } = useInView({
    threshold: 0,
    skip: !enableInfiniteScroll || !hasNextPage || loading,
  });

  useEffect(() => {
    if (inView && hasNextPage && !loading && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasNextPage, loading, onLoadMore]);

  const tableData = React.useMemo(() => {
    if (loading && !enableInfiniteScroll) {
      const itemCount = totalItems ? Math.min(totalItems, 10) : 10;
      // Initial loading - show only skeletons
      return Array(itemCount).fill({ isLoadingRow: true });
    } else if (loading && enableInfiniteScroll) {
      // Infinite scroll loading - show current data + skeletons
      return [...data, ...Array(10).fill({ isLoadingRow: true })];
    }
    // Normal state - show only data
    return data;
  }, [loading, data]);

  const tableColumns = React.useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: (props: any) => {
              if (props.row.original.isLoadingRow) {
                // Render skeleton for loading rows
                return (
                  <Skeleton className="h-5 w-full bg-grey-3" data-testid="skeleton" />
                );
              }
              // Render normal cell for data rows
              return flexRender(column.cell, props);
            },
          }))
        : columns,
    [loading, columns],
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    onRowSelectionChange: (updatedRowSelection) => {
      setRowSelection(updatedRowSelection);
    },
    state: {
      columnPinning: columnPinning ?? {
        left: [],
        right: [],
      },
      sorting: sorting,
      rowSelection,
    },
    onSortingChange: (updatedSorting) => {
      setSorting?.(updatedSorting);
      const newSorting =
        typeof updatedSorting === 'function' ? updatedSorting(sorting) : updatedSorting;
      onSortingChange?.(newSorting?.[0]);
    },
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: enableMultiRowSelection,
  });

  // Forward the table instance through the ref
  React.useImperativeHandle(ref, () => table, [table]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        const tableWidth = table.getTotalSize();

        if (containerWidth >= tableWidth) {
          table.setColumnPinning({ left: [], right: [] });
          setShouldShowShadow(false);
        } else if (columnPinning) {
          table.setColumnPinning(columnPinning);
          setShouldShowShadow(true);
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [table, columnPinning]);

  // Handle scroll loading
  const handleScroll = React.useCallback(
    (event: Event) => {
      const target = event.target as HTMLDivElement;
      const { scrollHeight, scrollTop, clientHeight } = target;

      // Check if scrolled to bottom (with a small threshold)
      const isNearBottom = scrollHeight - scrollTop - clientHeight < nearBottomThreshold;

      if (isNearBottom && !loading && hasNextPage && onLoadMore) {
        onLoadMore();
      }
    },
    [loading, hasNextPage, onLoadMore],
  );

  // Add scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={cn('overflow-auto', className)}>
      <Table
        showScrollbar={true}
        containerRef={containerRef}
        containerClassName={containerClassName}
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const rowSpan = header.column.columnDef.meta?.rowSpan;
                if (
                  !header.isPlaceholder &&
                  rowSpan !== undefined &&
                  header.id === header.column.id
                ) {
                  return null;
                }

                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    rowSpan={rowSpan}
                    style={{
                      ...getCommonPinningStyles(header.column, shouldShowShadow),
                    }}
                    className={cn(
                      'bg-white',
                      headerClassName,
                      showBorderVertical &&
                        header.index !== headerGroup.headers.length - 1 &&
                        'border-r border-[#CBD5E1]',
                    )}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('group', rowClassName)}
                  onClick={() => {
                    onRowClick?.(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'bg-white',
                        'group-hover:bg-accent',
                        customRowClassName?.(row.original),
                        showBorderVertical &&
                          cell.column.getSize() !== 0 &&
                          'border-r border-[#CBD5E1]',
                      )}
                      style={{ ...getCommonPinningStyles(cell.column, shouldShowShadow) }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {/* Loading indicator */}
              {loading && data.length > 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-12 text-center">
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <NoData />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
});
