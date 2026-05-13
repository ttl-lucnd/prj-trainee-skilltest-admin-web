'use client';

import { DEFAULT_FIRST_PAGE, PageRouter } from '@/utils/constants';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { useSubscriptionStore } from '../../stores/useSubscriptionStore';
import { BasicFilterForm } from '@/components/BasicFilterForm';
import { AppBreadcrumb } from '@/components/AppBreadcrumb';
export function SubscriptionFilterForm() {
  const [isFiltering, setIsFiltering] = useState(false);

  const { setSubscriptionGetListQuery, getSubscriptionList } = useSubscriptionStore(
    useShallow((s) => ({
      setSubscriptionGetListQuery: s.setSubscriptionGetListQuery,
      getSubscriptionList: s.getSubscriptionList,
    })),
  );
  const form = useForm();

  const {
    getQueryFromUrl: getSubscriptionQueryFromUrl,
    updateUrlWithQuery: updateSubscriptionUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    const query = getSubscriptionQueryFromUrl();
    form.reset(query);
    setSubscriptionGetListQuery(query, { reloadList: false });
  }, []);

  const onSubmit = async (data: any) => {
    if (isFiltering) return;
    setIsFiltering(true);
    try {
      const query = {
        ...data,
        createdByIamUserIds: data.createdByIamUserIds?.map((item: string) =>
          Number(item),
        ),
        page: DEFAULT_FIRST_PAGE,
      };
      setSubscriptionGetListQuery(query, { reloadList: false });
      updateSubscriptionUrlWithQuery(query);
      await getSubscriptionList();
    } catch {
      setIsFiltering(false);
    } finally {
      setIsFiltering(false);
    }
  };

  return (
    <div className="flex h-auto mt-0.5 mb-[16px] items-center">
      <AppBreadcrumb
        items={[
          {
            label: 'sidebar.subscription_management',
            href: PageRouter.SUBSCRIPTION_MANAGEMENT,
          },
        ]}
      />
      <BasicFilterForm
        form={form}
        onSubmit={(data) => onSubmit(data)}
        isFiltering={isFiltering}
      />
    </div>
  );
}
