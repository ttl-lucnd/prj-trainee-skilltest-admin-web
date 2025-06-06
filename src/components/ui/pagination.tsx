import React from 'react';
import { Button } from './button';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { DEFAULT_FIRST_PAGE, DEFAULT_LIMIT, ITEMS_PER_PAGE } from '@/utils/constants';

interface PaginationProps {
  readonly totalItems: number;
  readonly itemsPerPage?: number;
  readonly currentPage?: number;
  readonly onPageChange: (page: number) => void;
  readonly onItemsPerPageChange?: (itemsPerPage: number) => void;
  readonly children?: React.ReactNode;
}

interface ItemsCountProps {
  readonly totalItems: number;
}

function ItemsCount({ totalItems }: ItemsCountProps) {
  return <div className="text-[#232625] pr-1 font-[600]">{` ${totalItems} `}</div>;
}

export function Pagination({
  totalItems,
  itemsPerPage = DEFAULT_LIMIT,
  currentPage = DEFAULT_FIRST_PAGE,
  onPageChange,
  onItemsPerPageChange,
  children,
}: PaginationProps) {
  const t = useTranslations('common');
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const totalItemsComponent = t.rich('pagination.items_count', {
    totalItems: () => <ItemsCount totalItems={totalItems} />,
  });

  return (
    <div className="flex items-center justify-between py-4">
      <div className="w-full flex items-center gap-6 justify-between">
        <div className="flex gap-6">
          <div className="flex items-center gap-4">
            <div className="h-8 flex items-center text-[#667085] rounded-[6px] text-[18px]">
              {totalItemsComponent}
            </div>
            {onItemsPerPageChange &&            
              <div className="flex gap-2 text-textDefaultColor">
                {ITEMS_PER_PAGE.map((limit) => (
                  <Button
                    key={limit}
                    variant={itemsPerPage === limit ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onItemsPerPageChange?.(limit)}
                    className={cn(
                      `rounded-[6px] text-body-md`,
                      itemsPerPage === limit && '!text-white',
                    )}
                  >
                    {t(`pagination.items_per_page.${limit}`)}
                  </Button>
                ))}
              </div>
            }
          </div>
          
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sx"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="p-1"
                name="double-left"
              >
                <Image
                  src="/chevron-double-left.svg"
                  alt="double-left"
                  width={22}
                  height={22}
                />
              </Button>
              <Button
                variant="outline"
                size="sx"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1"
                name="left"
              >
                <Image src="/chevron-left.svg" alt="left" width={22} height={22} />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1),
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <div className="px-2 border border-primary-3 bg-white w-8 h-8 flex items-center justify-center rounded-md">
                        ...
                      </div>
                    )}
                    <Button
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sx"
                      onClick={() => onPageChange(page)}
                      className="p-1 w-8 h-8 yt"
                      name={`page-${page}`}
                    >
                      {page}
                    </Button>
                  </React.Fragment>
                ))}

              <Button
                variant="outline"
                size="sx"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1"
                name="right"
              >
                <Image src="/chevron-right.svg" alt="right" width={22} height={22} />
              </Button>
              <Button
                variant="outline"
                size="sx"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1"
                name="double-right"
              >
                <Image
                  src="/chevron-double-right.svg"
                  alt="double-right"
                  width={22}
                  height={22}
                />
              </Button>
            </div>
          
        </div>
        {children}
      </div>
    </div>
  );
}
