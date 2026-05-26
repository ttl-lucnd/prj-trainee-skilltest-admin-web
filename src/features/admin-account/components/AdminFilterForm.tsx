'use client';

import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { useAdminStore } from '../stores/useAdminStore';
import { BasicFilterForm } from '@/components/BasicFilterForm';
export function AdminFilterForm() {
  const [isFiltering, setIsFiltering] = useState(false);

  const { setAdminGetListQuery, getAdminList } = useAdminStore(
    useShallow((s) => ({
      setAdminGetListQuery: s.setAdminGetListQuery,
      getAdminList: s.getAdminList,
    })),
  );
  const form = useForm();

  const {
    getQueryFromUrl: getAdminAccountQueryFromUrl,
    updateUrlWithQuery: updateAdminAccountUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    const query = getAdminAccountQueryFromUrl();
    form.reset(query);
    setAdminGetListQuery(query, { reloadList: false });
  }, []);

  const onSubmit = async (data: any) => {
    if (isFiltering) return;
    setIsFiltering(true);
    try {
      const query = {
        ...data,
        page: DEFAULT_FIRST_PAGE,
      };
      setAdminGetListQuery(query, { reloadList: false });
      updateAdminAccountUrlWithQuery(query);
      await getAdminList();
    } catch {
      setIsFiltering(false);
    } finally {
      setIsFiltering(false);
    }
  };

  return (
    <BasicFilterForm
      className="mt-0.5 mb-[16px]"
      form={form}
      onSubmit={(data) => onSubmit(data)}
    />
  );
}
