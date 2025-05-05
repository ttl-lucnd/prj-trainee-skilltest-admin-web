import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { PencilIcon, TrashIcon } from '@/components/icons';
import { NumberCell } from '@/components/table/NumberCell';
import dayjs from '@/plugins/dayjs';
import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { compact } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { IAdminAccount } from '../interfaces';
import { useAdminStore } from '../stores/useAdminStore';

export function AdminAccountTable() {
  const t = useTranslations();
  const {
    adminList,
    loading,
    adminGetListQuery,
    getAdminList,
    resetState,
    setOpenAdminFormDialog,
    setOpenDeleteAdminDialog,
    setSelectedAdmin,
  } = useAdminStore(
    useShallow((state) => ({
      adminList: state.adminList,
      loading: state.loading,
      adminGetListQuery: state.adminGetListQuery,
      getAdminList: state.getAdminList,
      resetState: state.resetState,
      setOpenAdminFormDialog: state.setOpenAdminFormDialog,
      setOpenDeleteAdminDialog: state.setOpenDeleteAdminDialog,
      setSelectedAdmin: state.setSelectedAdmin,
    })),
  );
  useEffect(() => {
    getAdminList();
    return () => {
      resetState();
    };
  }, []);

  const createdAtCell = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return <TruncatedText text={dayjs(row.original.createdAt).fmYYYYMMDDHHmmss()} />;
    },
    [],
  );

  const nameCell = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return <TruncatedText text={row.original.name} />;
    },
    [],
  );

  const lastLoginCell = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return (
        <TruncatedText
          text={
            row.original.iamUser?.lastLoginAt
              ? dayjs(row.original.iamUser.lastLoginAt).fmYYYYMMDDHHmmss()
              : '--'
          }
        />
      );
    },
    [],
  );

  const allowedIpCell = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return <TruncatedText text={row.original.allowedIps?.join(', ') ?? '--'} />;
    },
    [],
  );

  const updatedAtCell = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return (
        <TruncatedText
          text={
            row.original.updatedAt
              ? dayjs(row.original.updatedAt).fmYYYYMMDDHHmmss()
              : '--'
          }
        />
      );
    },
    [],
  );

  const updatedByCell = useCallback(
    ({ row }: Readonly<CellContext<IAdminAccount, unknown>>) => {
      return <TruncatedText text={row.original.updatedByAccount?.name ?? '--'} />;
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
    [setOpenAdminFormDialog, setOpenDeleteAdminDialog, setSelectedAdmin],
  );

  const columns: ColumnDef<IAdminAccount>[] = useMemo(() => {
    return compact([
      {
        header: t('common.number'),
        accessorKey: 'index',
        cell: (props) =>
          NumberCell({
            ...props,
            page: adminGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: adminGetListQuery.limit,
          }),
        size: 72,
      },
      {
        header: t('adminAccount.table.created_at'),
        accessorKey: 'createdAt',
        cell: createdAtCell,
        size: 178,
      },
      {
        header: t('adminAccount.table.staff_name'),
        accessorKey: 'name',
        cell: nameCell,
        size: 150,
      },
      {
        header: "",
        id: 'actions',
        size: 100,
        cell: AdminActions,
      },
    ]);
  }, [
    t,
    createdAtCell,
    nameCell,
    lastLoginCell,
    allowedIpCell,
    updatedAtCell,
    updatedByCell,
    AdminActions,
  ]);

  return <DataTable columns={columns} data={adminList} loading={loading} />;
}
