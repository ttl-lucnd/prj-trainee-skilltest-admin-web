import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { NumberCell } from '@/components/table/NumberCell';
import { DEFAULT_FIRST_PAGE, PageRouter, SubscriptionPlatform } from '@/utils/constants';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  HeaderContext,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSubscriptionStore } from '../../stores/useSubscriptionStore';
import { ISubscription, SubscriptionSummary } from '../../interfaces';
import { IndexHeader } from '@/components/table/IndexHeader';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { compact } from 'lodash';

export function SubscriptionTable() {
  const t = useTranslations();

  const {
    subscriptionList,
    loading,
    subscriptionGetListQuery,
    getSubscriptionList,
    resetState,
  } = useSubscriptionStore(
    useShallow((state) => ({
      subscriptionList: state.subscriptionList,
      loading: state.loading,
      subscriptionGetListQuery: state.subscriptionGetListQuery,
      getSubscriptionList: state.getSubscriptionList,
      resetState: state.resetState,
    })),
  );

  useEffect(() => {
    getSubscriptionList();
    return () => {
      resetState();
    };
  }, []);

  const nameCell = useCallback(
    ({ row }: Readonly<CellContext<ISubscription, unknown>>) => {
      return (
        <Link
          href={`${PageRouter.SUBSCRIPTION_MANAGEMENT}/${row.original.id}`}
          className="cursor-pointer text-primary-2"
        >
          <TruncatedText text={row.original.name} />
        </Link>
      );
    },
    [],
  );
  interface SaleCellProps extends CellContext<ISubscription, unknown> {
    platform: SubscriptionPlatform;
    saleField: SubscriptionSummary;
  }

  const saleCell = useCallback(
    ({ row, platform, saleField }: Readonly<SaleCellProps>) => {
      return loading ? (
        <div className="flex items-center justify-center">
          <Skeleton className="h-5 w-24" />
        </div>
      ) : (
        <TruncatedText
          text={t('subjects.price', {
            price: (row?.original?.[platform]?.[saleField] ?? 0).toLocaleString(),
          })}
        />
      );
    },
    [loading],
  );

  const columnHelper = createColumnHelper<ISubscription>();

  const columns: ColumnDef<ISubscription>[] = useMemo(() => {
    return compact([
      columnHelper.display({
        id: 'index',
        header: (props: HeaderContext<ISubscription, unknown>) =>
          IndexHeader({
            ...props,
            text: t('common.number'),
          }),
        cell: (props: CellContext<ISubscription, unknown>) =>
          NumberCell({
            ...props,
            page: subscriptionGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: subscriptionGetListQuery.limit,
          }),
        meta: {
          rowSpan: 2,
          width: 80,
        },
      }),
      columnHelper.display({
        id: 'name',
        header: t('subscriptions.table.name'),
        cell: nameCell,
        meta: {
          rowSpan: 2,
          width: 250,
        },
      }),
      ...Object.values(SubscriptionPlatform).map((platform) =>
        columnHelper.group({
          id: platform,
          header: t(`subscriptions.title.${platform}`),
          meta: {
            headerClassName: `${platform === 'apple' ? 'bg-[#BCD5F9]' : 'bg-[#C7BCF9]'} text-center outline outline-1 outline-[#CBD5E1]`,
            width: 600,
          },

          columns: [
            ...Object.values(SubscriptionSummary).map((saleField, index) =>
              columnHelper.display({
                id: `${platform}_${saleField}`,
                header: t(`subscriptions.table.${saleField}`),
                cell: (props: CellContext<ISubscription, unknown>) =>
                  saleCell({ ...props, platform, saleField }),
                meta: {
                  headerClassName: 'outline outline-1 outline-[#CBD5E1]',
                  cellClassName: index === 0 ? 'border-l-2' : '',
                  width: 120,
                },
              }),
            ),
          ],
        }),
      ),
    ]);
  }, [t, columnHelper, IndexHeader, NumberCell, nameCell, saleCell]);

  return (
    <DataTable
      columns={columns}
      data={subscriptionList}
      loading={loading}
      rowClassName={'h-16'}
      headerClassName={'bg-[#FBFDFF]'}
    />
  );
}
