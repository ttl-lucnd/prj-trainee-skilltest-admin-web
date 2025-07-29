'use client';

import { DEFAULT_FIRST_PAGE, PageRouter, SubscriptionPlatform } from '@/utils/constants';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { useSaleDetailStore } from '../../stores/useSaleDetailStore';
import { BasicFilterForm } from '@/components/BasicFilterForm';
import { AppBreadcrumb } from '@/components/AppBreadcrumb';
import { useParams } from 'next/navigation';
import { useHttpErrorHandler } from '@/hooks/useHttpErrorHandler';
import { useSubscriptionStore } from '../../stores/useSubscriptionStore';
import { IBodyResponse } from '@/utils/interfaces';
import { ISubject } from '@/features/subjects/interfaces';
import { subjectService } from '@/features/subjects/services/subject.service';
import { MultiSelectField } from '@/components/form/multi-select';
import { useTranslations } from 'next-intl';
import { DateRangePickerField } from '@/components/form/date-range-picker';

export function SaleDetailFilterForm() {
  const t = useTranslations();
  const [isFiltering, setIsFiltering] = useState(false);

  const { setSaleDetailGetListQuery, getSaleDetailList } = useSaleDetailStore(
    useShallow((s) => ({
      setSaleDetailGetListQuery: s.setSaleDetailGetListQuery,
      getSaleDetailList: s.getSaleDetailList,
    })),
  );

  const { checkError } = useHttpErrorHandler();
  const { id } = useParams();
  const { selectedSubject, setSelectedSubject } = useSubscriptionStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject,
      setSelectedSubject: state.setSelectedSubject,
    })),
  );

  const getDetail = async () => {
    setSaleDetailGetListQuery({
      subjectId: String(id),
    });
    const response: IBodyResponse<ISubject> = await subjectService._getDetail(String(id));
    if (!response.success) {
      checkError(response);
    } else {
      setSelectedSubject(response.data);
      document.title = response.data.name;
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  const form = useForm();
  const {
    getQueryFromUrl: getSaleDetailQueryFromUrl,
    updateUrlWithQuery: updateSaleDetailUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    const query = getSaleDetailQueryFromUrl();
    const { startDate, endDate, ...params } = query;
    form.reset({
      ...params,
      dateRange:
        !startDate && !endDate
          ? undefined
          : {
              from: startDate,
              to: endDate,
            },
    });

    setSaleDetailGetListQuery(query, { reloadList: false });
  }, []);

  const onSubmit = async (data: any) => {
    if (isFiltering) return;
    setIsFiltering(true);
    try {
      const { dateRange, ...params } = data;
      const query: Record<string, unknown> = {
        ...params,
        page: DEFAULT_FIRST_PAGE,
      };

      query.startDate = dateRange ? (dateRange.from as Date).toISOString() : undefined;
      query.endDate = dateRange ? (dateRange.to as Date).toISOString() : undefined;

      setSaleDetailGetListQuery(query, { reloadList: false });
      updateSaleDetailUrlWithQuery(query);
      await getSaleDetailList();
    } catch {
      setIsFiltering(false);
    } finally {
      setIsFiltering(false);
    }
  };

  return (
    <div className="flex h-auto mt-0.5 mb-[16px] items-center gap-5">
      <AppBreadcrumb
        items={[
          {
            label: 'sidebar.subscription_management',
            href: PageRouter.SUBSCRIPTION_MANAGEMENT,
          },
          {
            label: selectedSubject?.name ?? '',
            isKeepOrigin: true,
            href: `${PageRouter.SUBSCRIPTION_MANAGEMENT}/${selectedSubject?.id}`,
          },
        ]}
      />
      <BasicFilterForm
        form={form}
        onSubmit={(data) => onSubmit(data)}
        searchBtn={true}
        isFiltering={isFiltering}
      >
        <MultiSelectField
          className="w-[170px] h-[40px]"
          options={Object.values(SubscriptionPlatform).map((item) => ({
            label: t(`common.subscriptionPlatform.${item}`),
            value: `${item}`,
          }))}
          name="platform"
          placeholder={t('subscriptions.filter.platform')}
          control={form.control}
        />
        <DateRangePickerField
          className="min-w-[310px] h-[40px]"
          name="dateRange"
          placeholder={t('subscriptions.filter.dateRange')}
          control={form.control}
          allowClear={true}
          dateFormat={'yyyy年MM月dd日'}
        />
      </BasicFilterForm>
    </div>
  );
}
