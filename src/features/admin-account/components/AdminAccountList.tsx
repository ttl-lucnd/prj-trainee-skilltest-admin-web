'use client';

import { Pagination } from '@/components/ui/pagination';
import { useAdminStore } from '../stores/useAdminStore';
import { AdminAccountTable } from './AdminAccountTable';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { useShallow } from 'zustand/react/shallow';
import { ICommonListQuery } from '@/utils/interfaces';
import { AdminRole } from '@/features/admin-account/constants';
export function AdminAccountList() {
  const { profile, totalItems, adminGetListQuery, setAdminGetListQuery, setOpenAdminFormDialog, setSelectedAdmin } = useAdminStore(useShallow((s) => ({
    profile: s.profile,
    totalItems: s.totalItems,
    adminGetListQuery: s.adminGetListQuery,
    setAdminGetListQuery: s.setAdminGetListQuery,
    setOpenAdminFormDialog: s.setOpenAdminFormDialog,
    setSelectedAdmin: s.setSelectedAdmin,
  })));

  const { updateUrlWithQuery: updateAdminAccountUrlWithQuery } = useUpdateUrlWithQuery();

  const setAdminAccountGetListQuery = (query: ICommonListQuery) => {
    setAdminGetListQuery(query);
    updateAdminAccountUrlWithQuery(query);
  };

  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className="flex">
        <AdminAccountTable />
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={adminGetListQuery.page}
        itemsPerPage={adminGetListQuery.limit}
        onPageChange={(page) => setAdminAccountGetListQuery({ page })}
      >
        <div className="flex items-center justify-end">
          <Button 
          hidden={profile?.role !== AdminRole.SUPPER_ADMIN}
          size="lg" 
          onClick={() => {setOpenAdminFormDialog(true); setSelectedAdmin(null)}}
          >管理者を追加</Button>
        </div>
      </Pagination>
    </div>
  );
}
