import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { NumberCell } from '@/components/table/NumberCell';
import { DATE_TIME_FORMAT, DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { compact } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSaleDetailStore } from '../../stores/useSaleDetailStore';
import { IndexHeader } from '@/components/table/IndexHeader';
import { ISaleDetail } from '../../interfaces';
import dayjs from 'dayjs';

export function SaleDetailTable() {
  const t = useTranslations();

  const { saleDetailList, loading, saleDetailGetListQuery, resetState } =
    useSaleDetailStore(
      useShallow((state) => ({
        saleDetailList: state.saleDetailList,
        loading: state.loading,
        saleDetailGetListQuery: state.saleDetailGetListQuery,
        resetState: state.resetState,
      })),
    );

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  const emailCell = useCallback(
    ({ row }: Readonly<CellContext<ISaleDetail, unknown>>) => {
      return <TruncatedText text={row.original?.email ?? '-'} />;
    },
    [],
  );

  const nameCell = useCallback(({ row }: Readonly<CellContext<ISaleDetail, unknown>>) => {
    return <TruncatedText text={row.original?.package?.name ?? '-'} />;
  }, []);

  const platformCell = useCallback(
    ({ row }: Readonly<CellContext<ISaleDetail, unknown>>) => {
      return (
        <TruncatedText
          text={t(`common.subscriptionPlatform.${row.original?.platform ?? ''}`)}
        />
      );
    },
    [],
  );

  const productIdCell = useCallback(
    ({ row }: Readonly<CellContext<ISaleDetail, unknown>>) => {
      return <TruncatedText text={row.original?.package?.productId ?? ''} />;
    },
    [],
  );

  const amountCell = useCallback(
    ({ row }: Readonly<CellContext<ISaleDetail, unknown>>) => {
      return (
        <TruncatedText
          text={t('subjects.price', {
            price: (row.original?.amount ?? 0).toLocaleString(),
          })}
        />
      );
    },
    [],
  );

  const durationCell = useCallback(
    ({ row }: Readonly<CellContext<ISaleDetail, unknown>>) => {
      const startDate = dayjs(row.original?.actionAt).startOf('day')
      const endDate = dayjs(row.original?.endDate).add(1,'day').startOf('day')
      return (
        <TruncatedText
          text={`${endDate.diff(startDate, 'day')}${t('common.date.day')}`}
        />
      );
    },
    [],
  );

  const startDateCell = useCallback(
    ({ row }: Readonly<CellContext<ISaleDetail, unknown>>) => {
      return (
        <TruncatedText
          text={dayjs(row.original?.actionAt).format(DATE_TIME_FORMAT.JA_YYYY_MM_DD)}
        />
      );
    },
    [],
  );

  const endDateCell = useCallback(
    ({ row }: Readonly<CellContext<ISaleDetail, unknown>>) => {
      const endDate = dayjs(row.original?.endDate).add(1,'day').startOf('day')
      return (
        <TruncatedText
          text={endDate.format(DATE_TIME_FORMAT.JA_YYYY_MM_DD)}
        />
      );
    },
    [],
  );

  const columns: ColumnDef<ISaleDetail>[] = useMemo(() => {
    return compact([
      {
        header: (props: HeaderContext<ISaleDetail, unknown>) =>
          IndexHeader({
            ...props,
            text: t('common.number'),
          }),
        accessorKey: 'index',
        cell: (props: CellContext<ISaleDetail, unknown>) =>
          NumberCell({
            ...props,
            page: saleDetailGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: saleDetailGetListQuery.limit,
          }),
        size: 80,
      },
      {
        header: t('subscriptions.saleTable.email'),
        accessorKey: 'email',
        cell: emailCell,
        size: 275,
      },
      {
        header: t('subscriptions.saleTable.name'),
        accessorKey: 'name',
        cell: nameCell,
        size: 180,
      },
      {
        header: t('subscriptions.saleTable.platform'),
        accessorKey: 'platform',
        cell: platformCell,
        size: 180,
      },
      {
        header: t('subscriptions.saleTable.productId'),
        accessorKey: 'productId',
        cell: productIdCell,
        size: 180,
      },
      {
        header: t('subscriptions.saleTable.amount'),
        accessorKey: 'amount',
        cell: amountCell,
        size: 180,
      },
      {
        header: t('subscriptions.saleTable.duration'),
        accessorKey: 'duration',
        cell: durationCell,
        size: 180,
      },
      {
        header: t('subscriptions.saleTable.startDate'),
        accessorKey: 'startDate',
        cell: startDateCell,
        size: 180,
      },
      {
        header: t('subscriptions.saleTable.endDate'),
        accessorKey: 'endDate',
        cell: endDateCell,
        size: 180,
      },
    ]);
  }, [
    t,
    IndexHeader,
    NumberCell,
    emailCell,
    nameCell,
    platformCell,
    productIdCell,
    amountCell,
    durationCell,
    startDateCell,
    endDateCell,
  ]);

  return (
    <DataTable
      columns={columns}
      data={saleDetailList}
      loading={loading}
      rowClassName={'h-16'}
      headerClassName={'bg-[#FBFDFF]'}
    />
  );
}
