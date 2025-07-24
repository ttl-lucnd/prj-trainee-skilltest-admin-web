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
import { useSubjectStore } from '../../stores/useSubjectStore';
import { usePackageStore } from '../../stores/usePackageStore';
import { IPackage } from '../../interfaces';
import { AdminRole } from '@/features/admin-account/constants';
import { cn } from '@/lib/utils';

export function PackageTable() {
  const t = useTranslations();
  const { profile, getProfile } = useSubjectStore(
    useShallow((state) => ({
      profile: state.profile,
      getProfile: state.getProfile,
    })),
  );

  const {
    packageList,
    loading,
    packageGetListQuery,
    resetState,
    setOpenPackageFormDialog,
    setOpenDeletePackageDialog,
    setSelectedPackage,
    setOpenPackageMessageDialog,
  } = usePackageStore(
    useShallow((state) => ({
      packageList: state.packageList,
      loading: state.loading,
      packageGetListQuery: state.packageGetListQuery,
      resetState: state.resetState,
      setOpenPackageFormDialog: state.setOpenPackageFormDialog,
      setOpenDeletePackageDialog: state.setOpenDeletePackageDialog,
      setSelectedPackage: state.setSelectedPackage,
      setOpenPackageMessageDialog: state.setOpenPackageMessageDialog,
    })),
  );

  useEffect(() => {
    getProfile();
    return () => {
      resetState();
    };
  }, []);

  const nameCell = useCallback(({ row }: Readonly<CellContext<IPackage, unknown>>) => {
    return <TruncatedText text={row.original.name} />;
  }, []);

  const platformCell = useCallback(
    ({ row }: Readonly<CellContext<IPackage, unknown>>) => {
      return <TruncatedText text={row.original.platform} />;
    },
    [],
  );

  const productIdCell = useCallback(
    ({ row }: Readonly<CellContext<IPackage, unknown>>) => {
      return <TruncatedText text={row.original.productId} />;
    },
    [],
  );

  const priceCell = useCallback(({ row }: Readonly<CellContext<IPackage, unknown>>) => {
    return <TruncatedText text={t('subjects.price', { price: row.original.price })} />;
  }, []);

  const durationCell = useCallback(
    ({ row }: Readonly<CellContext<IPackage, unknown>>) => {
      return (
        <TruncatedText text={`${row.original.durationDays}${t('common.date.day')}`} />
      );
    },
    [],
  );

  const descriptionCell = useCallback(
    ({ row }: Readonly<CellContext<IPackage, unknown>>) => {
      return <TruncatedText text={row.original.description ?? ''} />;
    },
    [],
  );

  const PackageActions = useCallback(
    ({ row }: Readonly<CellContext<IPackage, unknown>>) => {
      const isDisable = profile?.role !== AdminRole.SUPPER_ADMIN;
      return (
        <div className="flex gap-4">
          <button
            onClick={() => {
              setOpenPackageFormDialog(true);
              setSelectedPackage(row.original);
            }}
            className={cn(
              !isDisable && 'hover:bg-primary-2',
              'flex size-[30px] rounded-full items-center justify-center group/edit',
            )}
            disabled={isDisable}
          >
            <PencilIcon
              size={22}
              className={cn(
                isDisable
                  ? 'text-[#CECECE]'
                  : 'cursor-pointer group-hover/edit:text-white',
              )}
            />
          </button>
          <button
            onClick={() => {
              setSelectedPackage(row.original);
              if (!row.original?.canDelete) {
                setOpenPackageMessageDialog(true);
              } else {
                setOpenDeletePackageDialog(true);
              }
            }}
            className={cn(
              !isDisable && 'hover:bg-destructive',
              'flex size-[30px] rounded-full items-center justify-center group/delete',
            )}
            disabled={isDisable}
          >
            <TrashIcon
              size={22}
              className={cn(
                isDisable
                  ? 'text-[#CECECE]'
                  : 'cursor-pointer group-hover/delete:text-white',
              )}
            />
          </button>
        </div>
      );
    },
    [
      profile,
      setOpenPackageFormDialog,
      setOpenDeletePackageDialog,
      setSelectedPackage,
      setOpenPackageMessageDialog,
    ],
  );

  const columns: ColumnDef<IPackage>[] = useMemo(() => {
    return compact([
      {
        header: t('common.number'),
        accessorKey: 'index',
        cell: (props: CellContext<IPackage, unknown>) =>
          NumberCell({
            ...props,
            page: packageGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: packageGetListQuery.limit,
          }),
        size: 80,
      },
      {
        header: t('packages.table.name'),
        accessorKey: 'name',
        cell: nameCell,
        size: 150,
      },
      {
        header: t('packages.table.platform'),
        accessorKey: 'platform',
        cell: platformCell,
        size: 150,
      },
      {
        header: t('packages.table.productId'),
        accessorKey: 'productId',
        cell: productIdCell,
        size: 150,
      },
      {
        header: t('packages.table.price'),
        accessorKey: 'price',
        cell: priceCell,
        size: 150,
      },
      {
        header: t('packages.table.duration'),
        accessorKey: 'duration',
        cell: durationCell,
        size: 150,
      },
      {
        header: t('packages.table.description'),
        accessorKey: 'description',
        cell: descriptionCell,
        size: 200,
      },
      {
        header: t('packages.table.action'),
        id: 'actions',
        size: 120,
        cell: PackageActions,
      },
    ]);
  }, [
    t,
    nameCell,
    platformCell,
    productIdCell,
    priceCell,
    durationCell,
    descriptionCell,
    PackageActions,
  ]);

  return (
    <DataTable
      columns={columns}
      data={packageList}
      loading={loading}
      rowClassName={'h-16'}
      headerClassName={'bg-[#FBFDFF]'}
    />
  );
}
