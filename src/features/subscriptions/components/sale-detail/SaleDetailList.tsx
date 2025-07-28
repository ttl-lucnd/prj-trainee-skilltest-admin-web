'use client';

import { Pagination } from '@/components/ui/pagination';
import { useSaleDetailStore } from '../../stores/useSaleDetailStore';
import { SaleDetailTable } from './SaleDetailTable';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { useShallow } from 'zustand/react/shallow';
import { ICommonListQuery } from '@/utils/interfaces';

export function SaleDetailList() {
  const { totalItems, saleDetailGetListQuery, setSaleDetailGetListQuery } =
    useSaleDetailStore(
      useShallow((s) => ({
        totalItems: s.totalItems,
        saleDetailGetListQuery: s.saleDetailGetListQuery,
        setSaleDetailGetListQuery: s.setSaleDetailGetListQuery,
      })),
    );

  const { updateUrlWithQuery: updateSaleDetailPageUrlWithQuery } =
    useUpdateUrlWithQuery();

  const setSaleDetailPageGetListQuery = (query: ICommonListQuery) => {
    setSaleDetailGetListQuery(query);
    updateSaleDetailPageUrlWithQuery(query);
  };

  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className="flex">
        <SaleDetailTable />
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={saleDetailGetListQuery.page}
        itemsPerPage={saleDetailGetListQuery.limit}
        onPageChange={(page) => setSaleDetailPageGetListQuery({ page })}
      />
    </div>
  );
}
