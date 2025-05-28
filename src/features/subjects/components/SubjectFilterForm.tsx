'use client';

import { InputText } from '@/components/form/input';
import { Form } from '@/components/ui/form';
import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { useSubjectStore } from '../stores/useSubjectStore';
export function SubjectFilterForm() {
  const t = useTranslations();
  const [isFiltering, setIsFiltering] = useState(false);

  const { setSubjectGetListQuery, getSubjectList } = useSubjectStore(
    useShallow((s) => ({
      setSubjectGetListQuery: s.setSubjectGetListQuery,
      getSubjectList: s.getSubjectList,
    })),
  );
  const form = useForm();

  const {
    getQueryFromUrl: getSubjectAccountQueryFromUrl,
    updateUrlWithQuery: updateSubjectAccountUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    const query = getSubjectAccountQueryFromUrl();
    form.reset(query);
    setSubjectGetListQuery(query, { reloadList: false });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      setIsFiltering(true);
      const query = {
        ...data,
        createdByIamUserIds: data.createdByIamUserIds?.map((item: string) =>
          Number(item),
        ),
        page: DEFAULT_FIRST_PAGE,
      };
      setSubjectGetListQuery(query, { reloadList: false });
      updateSubjectAccountUrlWithQuery(query);
      await getSubjectList();
    } catch {
      setIsFiltering(false);
    } finally {
      setIsFiltering(false);
    }
  };

  return (
    <Form {...form}>
      <form className="flex gap-2.5 items-end justify-end mb-5" onSubmit={form.handleSubmit(onSubmit)}>
        <InputText
          name="keyword"
          size="md"
          placeholder={t('adminAccount.form.search')}
          className="max-w-[282px]"
          label=""
          control={form.control}
          disabled={isFiltering}
          suffixIcon={<SearchIcon size={22} />}
          onSuffixIconClick={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
