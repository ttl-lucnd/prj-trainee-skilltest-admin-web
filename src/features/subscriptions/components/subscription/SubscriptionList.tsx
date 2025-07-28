'use client';

import { Pagination } from '@/components/ui/pagination';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { useShallow } from 'zustand/react/shallow';
import { ICommonListQuery } from '@/utils/interfaces';
import { useSubscriptionStore } from '../../stores/useSubscriptionStore';
import { SubscriptionTable } from './SubscriptionTable';
export function SubscriptionList() {
  const { totalItems, subscriptionGetListQuery, setSubscriptionGetListQuery } =
    useSubscriptionStore(
      useShallow((s) => ({
        totalItems: s.totalItems,
        subscriptionGetListQuery: s.subscriptionGetListQuery,
        setSubscriptionGetListQuery: s.setSubscriptionGetListQuery,
      })),
    );

  const { updateUrlWithQuery: updateSubscriptionPageUrlWithQuery } =
    useUpdateUrlWithQuery();

  const setSubscriptionPageGetListQuery = (query: ICommonListQuery) => {
    setSubscriptionGetListQuery(query);
    updateSubscriptionPageUrlWithQuery(query);
  };

  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className="flex">
        <SubscriptionTable />
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={subscriptionGetListQuery.page}
        itemsPerPage={subscriptionGetListQuery.limit}
        onPageChange={(page) => setSubscriptionPageGetListQuery({ page })}
      />
    </div>
  );
}
