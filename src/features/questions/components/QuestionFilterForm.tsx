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
import { questionFilterYupResolver } from '../schema';
import { useQuestionStore } from '../stores/useQuestionStore';
import { MultiSelectField } from '@/components/form/multi-select';
export function QuestionFilterForm() {
  const t = useTranslations();
  const [isFiltering, setIsFiltering] = useState(false);

  const { subjectDropdownList, arrangeDropdownList, setQuestionGetListQuery, getQuestionList } = useQuestionStore(
    useShallow((s) => ({
      subjectDropdownList: s.subjectDropdownList,
      arrangeDropdownList: s.arrangeDropdownList,
      setQuestionGetListQuery: s.setQuestionGetListQuery,
      getQuestionList: s.getQuestionList,
    })),
  );
  const form = useForm({
    resolver: questionFilterYupResolver,
  });

  const {
    getQueryFromUrl: getQuestionQueryFromUrl,
    updateUrlWithQuery: updateQuestionUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    const query = getQuestionQueryFromUrl();
    form.reset(query);
    setQuestionGetListQuery(query, { reloadList: false });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      setIsFiltering(true);
      const query = {
        ...data,
        page: DEFAULT_FIRST_PAGE,
      };
      setQuestionGetListQuery(query, { reloadList: false });
      updateQuestionUrlWithQuery(query);
      await getQuestionList();
    } catch {
      setIsFiltering(false);
    } finally {
      setIsFiltering(false);
    }
  };

  return (
    <Form {...form}>
      <form className="flex gap-2.5 items-start justify-end mb-5" onSubmit={form.handleSubmit(onSubmit)}>
        <MultiSelectField
          className="max-w-[200px] h-[40px]"
          options={subjectDropdownList.map(item => ({
            label: item.name,
            value: item.id,
          }))}
          name='subjectIds'
          placeholder={t('questions.filter.subject')}
          control={form.control}
        />
        <MultiSelectField
          className="max-w-[200px] h-[40px]"
          options={arrangeDropdownList.map(item => ({
            label: `${item}`,
            value: `${item}`,
          }))}
          name='arranges'
          placeholder={t('questions.filter.arrange')}
          control={form.control}
        />
        <InputText
          name="keyword"
          size="md"
          placeholder={t('common.searchPlaceholder')}
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
