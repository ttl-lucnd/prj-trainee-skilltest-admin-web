import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { PencilIcon, TrashIcon } from '@/components/icons';
import { NumberCell } from '@/components/table/NumberCell';
import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { compact } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { IAdminAccount } from '../interfaces';
import { useAdminStore } from '../stores/useAdminStore';
import { AdminRole } from '../constants';

export function AdminAccountTable() {
  const t = useTranslations();
  const {
    profile,
    adminList,
    loading,
    adminGetListQuery,
    getAdminList,
    resetState,
    setOpenAdminFormDialog,
    setOpenDeleteAdminDialog,
    setSelectedAdmin,
    getProfile,
  } = useAdminStore(
    useShallow((state) => ({
      profile: state.profile,
      adminList: state.adminList,
      loading: state.loading,
      adminGetListQuery: state.adminGetListQuery,
      getAdminList: state.getAdminList,
      resetState: state.resetState,
      setOpenAdminFormDialog: state.setOpenAdminFormDialog,
      setOpenDeleteAdminDialog: state.setOpenDeleteAdminDialog,
      setSelectedAdmin: state.setSelectedAdmin,
      getProfile: state.getProfile,
    })),
  );

  useEffect(() => {
    getProfile();
    getAdminList();
    return () => {
      resetState();
    };
  }, []);

  const emailCell = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return <TruncatedText text={row.original.email} />;
    },
    [],
  );

  const nameCell = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return <TruncatedText text={row.original.name} />;
    },
    [],
  );

  const AdminActions = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return (
        <div className="flex gap-4">
          <span
            onPointerDown={() => {
              setOpenAdminFormDialog(true);
              setSelectedAdmin(row.original);
            }}
            className="cursor-pointer"
          >
            <PencilIcon size={22} />
          </span>
          <button
            hidden={row.original?.id === profile?.id}
            onClick={() => {
              setOpenDeleteAdminDialog(true);
              setSelectedAdmin(row.original);
            }}
            className="cursor-pointer"
          >
            <TrashIcon size={22} />
          </button>
        </div>
      );
    },
    [profile, setOpenAdminFormDialog, setOpenDeleteAdminDialog, setSelectedAdmin],
  );

  const columns: ColumnDef<IAdminAccount>[] = useMemo(() => {
    const headerList: any[] = [
      {
        header: t('common.number'),
        accessorKey: 'index',
        cell: (props: CellContext<IAdminAccount, unknown>) =>
          NumberCell({
            ...props,
            page: adminGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: adminGetListQuery.limit,
          }),
        size: 30,
      },
      {
        header: t('adminAccount.table.email'),
        accessorKey: 'email',
        cell: emailCell,
        size: 200,
      },
      {
        header: t('adminAccount.table.staff_name'),
        accessorKey: 'name',
        cell: nameCell,
        size: 200,
      },
    ];

    if(profile?.role === AdminRole.SUPPER_ADMIN) {
      headerList.push({
        header: t('adminAccount.table.action'),
        id: 'actions',
        size: 60,
        cell: AdminActions,
      })
    }

    return compact(headerList);
  }, [
    t,
    profile,
    emailCell,
    nameCell,
    AdminActions,
  ]);

  return <DataTable 
    columns={columns} 
    data={adminList} 
    loading={loading}
    rowClassName={'h-16'} 
    headerClassName={'bg-[#FBFDFF]'}
  />;
}
