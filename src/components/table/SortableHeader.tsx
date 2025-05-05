import { Column } from '@tanstack/react-table';
import { ArrowSquareUpActiveIcon, ArrowSquareUpIcon } from '../icons';
import { cn } from '@/lib/utils';
import { OrderDirection } from '@/utils';

interface SortableHeaderProps {
  column: Column<any, unknown>;
  title: string;
  className?: string;
}

export function SortableHeader({
  column,
  title,
  className,
}: Readonly<SortableHeaderProps>) {
  return (
    <button
      className={cn('w-full flex items-center gap-2', className)}
      onClick={() => column.toggleSorting()}
      data-testid="sortable-header-button"
    >
      {title}
      <span className="flex flex-col gap-0.5 items-center">
        <SortIcon
          isActive={column.getIsSorted() === OrderDirection.ASC.toLowerCase()}
          onClick={(e) => {
            e.stopPropagation();
            if (column.getIsSorted() === OrderDirection.ASC.toLowerCase()) {
              column.clearSorting();
            } else {
              column.toggleSorting(false);
            }
          }}
        />
        <SortIcon
          isActive={column.getIsSorted() === OrderDirection.DESC.toLowerCase()}
          className="rotate-180"
          onClick={(e) => {
            e.stopPropagation();
            if (column.getIsSorted() === OrderDirection.DESC.toLowerCase()) {
              column.clearSorting();
            } else {
              column.toggleSorting(true);
            }
          }}
        />
      </span>
    </button>
  );
}

interface SortIconProps {
  isActive: boolean;
  onClick: (e: React.PointerEvent) => void;
  className?: string;
}

function SortIcon({ isActive, onClick, className }: Readonly<SortIconProps>) {
  return (
    <span onPointerDown={onClick} className={className}>
      {isActive ? (
        <ArrowSquareUpActiveIcon />
      ) : (
        <ArrowSquareUpIcon className="text-primary-3" />
      )}
    </span>
  );
}
