'use client';

import { Pagination } from '@/components/ui/pagination';
import { useAdminStore } from '../stores/useAdminStore';
import { AdminAccountTable } from './AdminAccountTable';
import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { IAdminGetListQuery } from '../interfaces';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { useShallow } from 'zustand/react/shallow';
export function AdminAccountList() {
  const { totalItems, adminGetListQuery, setAdminGetListQuery, setOpenAdminFormDialog } = useAdminStore(useShallow((s) => ({
    totalItems: s.totalItems,
    adminGetListQuery: s.adminGetListQuery,
    setAdminGetListQuery: s.setAdminGetListQuery,
    setOpenAdminFormDialog: s.setOpenAdminFormDialog,
  })));

  const { updateUrlWithQuery: updateAdminAccountUrlWithQuery } = useUpdateUrlWithQuery();

  const setAdminAccountGetListQuery = (query: IAdminGetListQuery) => {
    setAdminGetListQuery(query);
    updateAdminAccountUrlWithQuery(query);
  };

  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className="flex-1">
        <AdminAccountTable />
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={adminGetListQuery.page}
        itemsPerPage={adminGetListQuery.limit}
        onPageChange={(page) => setAdminAccountGetListQuery({ page })}
        onItemsPerPageChange={(limit) =>
          setAdminAccountGetListQuery({ limit, page: DEFAULT_FIRST_PAGE })
        }
      >
        <div className="flex items-center justify-end">
          <Button size="sm" onClick={() => setOpenAdminFormDialog(true)}>管理者を追加</Button>
        </div>
      </Pagination>
    </div>
  );
}
