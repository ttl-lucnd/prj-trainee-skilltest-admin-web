import { CellContext } from '@tanstack/react-table';
import { DEFAULT_FIRST_PAGE, DEFAULT_LIMIT } from '@/utils';

interface NumberCellProps extends CellContext<any, unknown> {
  page?: number;
  limit?: number;
}

export function NumberCell({
  row,
  page = DEFAULT_FIRST_PAGE,
  limit = DEFAULT_LIMIT,
}: Readonly<NumberCellProps>) {
  return <div className="text-start">{(page - 1) * limit + row.index + 1}</div>;
}
