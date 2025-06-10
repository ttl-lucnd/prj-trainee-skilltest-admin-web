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
import { cn } from '@/lib/utils';

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
      return <TruncatedText text={row.original.email} className={row.original.role === AdminRole.SUPPER_ADMIN ? 'text-[#E9034E]' : ''}/>;
    },
    [],
  );

  const nameCell = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return <TruncatedText text={row.original.name} className={row.original.role === AdminRole.SUPPER_ADMIN ? 'text-[#E9034E]' : ''}/>;
    },
    [],
  );

  const AdminActions = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      
      const isDisableDelete = row.original.role === AdminRole.SUPPER_ADMIN || row.original.role === profile?.role;
      const isSupAdmin = profile?.id === row.original.id && profile.role === AdminRole.SUPPER_ADMIN;
      const isDisableEdit = isDisableDelete && !isSupAdmin;
      return (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setOpenAdminFormDialog(true);
              setSelectedAdmin(row.original);
            }}
            className={cn(
              !isDisableEdit && 'hover:bg-primary-2',
              "flex cursor-pointer size-[30px] rounded-full items-center justify-center group/edit"
            )}
            disabled={isDisableEdit}
          >
            <PencilIcon size={22}
              className={cn(
                isDisableEdit ? 'text-[#CECECE]'
                : 'group-hover/edit:text-white')
              }
            />
          </button>
          <button
            onClick={() => {
              setOpenDeleteAdminDialog(true);
              setSelectedAdmin(row.original);
            }}
            className={cn(
              !isDisableDelete && 'hover:bg-destructive',
              "flex cursor-pointer size-[30px] rounded-full items-center justify-center group/delete"
            )}
            disabled={isDisableDelete}
          >
            <TrashIcon size={22} 
              className={cn(
                isDisableDelete ? 'text-[#CECECE]'
                : 'group-hover/delete:text-white')
              }
            />
          </button>
        </div>
      );
    },
    [profile, setOpenAdminFormDialog, setOpenDeleteAdminDialog, setSelectedAdmin],
  );

  const columns: ColumnDef<IAdminAccount>[] = useMemo(() => {
    return compact([
      {
        header: t('common.number'),
        accessorKey: 'index',
        cell: (props: CellContext<IAdminAccount, unknown>) =>
          NumberCell({
            ...props,
            page: adminGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: adminGetListQuery.limit,
          }),
        size: 50,
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
      },{
        header: t('adminAccount.table.action'),
        id: 'actions',
        size: 60,
        cell: AdminActions,
      }
    ]);
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
