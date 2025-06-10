'use client';

import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { useSubjectStore } from '../stores/useSubjectStore';
import { BasicFilterForm } from '@/components/BasicFilterForm';
export function SubjectFilterForm() {
  const [isFiltering, setIsFiltering] = useState(false);

  const { setSubjectGetListQuery, getSubjectList } = useSubjectStore(
    useShallow((s) => ({
      setSubjectGetListQuery: s.setSubjectGetListQuery,
      getSubjectList: s.getSubjectList,
    })),
  );
  const form = useForm();

  const {
    getQueryFromUrl: getSubjectQueryFromUrl,
    updateUrlWithQuery: updateSubjectUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    const query = getSubjectQueryFromUrl();
    form.reset(query);
    setSubjectGetListQuery({...query, limit: 10}, { reloadList: false });
  }, []);

  const onSubmit = async (data: any) => {
    if(isFiltering) return;
    setIsFiltering(true);
    try {
      const query = {
        ...data,
        createdByIamUserIds: data.createdByIamUserIds?.map((item: string) =>
          Number(item),
        ),
        page: DEFAULT_FIRST_PAGE,
      };
      setSubjectGetListQuery(query, { reloadList: false });
      updateSubjectUrlWithQuery(query);
      await getSubjectList();
    } catch {
      setIsFiltering(false);
    } finally {
      setIsFiltering(false);
    }
  };

  return (
    <BasicFilterForm 
      form={form}
      onSubmit={(data) => onSubmit(data)}
    />
  );
}
