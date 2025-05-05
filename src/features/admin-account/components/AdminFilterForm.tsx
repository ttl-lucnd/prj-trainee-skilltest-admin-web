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
import { adminFilterYupResolver } from '../schema';
import { useAdminStore } from '../stores/useAdminStore';
export function AdminFilterForm() {
  const t = useTranslations();
  const [isFiltering, setIsFiltering] = useState(false);

  const { setAdminGetListQuery, getAdminList } = useAdminStore(
    useShallow((s) => ({
      setAdminGetListQuery: s.setAdminGetListQuery,
      getAdminList: s.getAdminList,
    })),
  );
  const form = useForm({
    resolver: adminFilterYupResolver,
  });

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
    try {
      setIsFiltering(true);
      const query = {
        ...data,
        createdByIamUserIds: data.createdByIamUserIds?.map((item: string) =>
          Number(item),
        ),
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
    <Form {...form}>
      <form className="flex gap-2.5 items-start" onSubmit={form.handleSubmit(onSubmit)}>
        <InputText
          name="name"
          size="sm"
          placeholder={t('adminAccount.form.search')}
          className="max-w-[200px]"
          label=""
          control={form.control}
          disabled={isFiltering}
          suffixIcon={<SearchIcon size={22} />}
        />
      </form>
    </Form>
  );
}
