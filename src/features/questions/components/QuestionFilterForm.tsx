'use client';

import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { questionFilterYupResolver } from '../schema';
import { useQuestionStore } from '../stores/useQuestionStore';
import { MultiSelectField } from '@/components/form/multi-select';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils';
import { BasicFilterForm } from '@/components/BasicFilterForm';
export function QuestionFilterForm() {
  const t = useTranslations();
  const [isFiltering, setIsFiltering] = useState(false);

  const { subjectDropdownList, arrangeDropdownList, questionSetting, setQuestionGetListQuery, getQuestionList, getQuestionSetting } = useQuestionStore(
    useShallow((s) => ({
      subjectDropdownList: s.subjectDropdownList,
      arrangeDropdownList: s.arrangeDropdownList,
      questionSetting: s.questionSetting,
      setQuestionGetListQuery: s.setQuestionGetListQuery,
      getQuestionList: s.getQuestionList,
      getQuestionSetting: s.getQuestionSetting
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
    getQuestionSetting();
  }, []);

  const onSubmit = async (data: any) => {
    if(isFiltering) return;
    setIsFiltering(true);
    try {
      
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

  const syncDataInfo = () => {
    return <div className='flex flex-col mb-2 max-w-full flex-1'>
      {questionSetting?.lastSyncDataAt &&
      <div className='flex flex-wrap'>
        {t('common.sync_data_at')}
        <p className='text-[#E9034E]'>{dayjs(questionSetting?.lastSyncDataAt ?? "").format(t('common.sync_data_at_format'))}</p>
      </div>
      }
      {questionSetting?.status && <p className='text-[#E9034E]'>{t(`common.sync_data_status.${questionSetting.status}`)}</p>}
    </div>
  }

  return (
    <div className={cn(
      'flex flex-wrap w-full items-start gap-2.5 mb-5',
      questionSetting? 'justify-between' : 'justify-end'
    )}>
    {questionSetting && syncDataInfo()}
    <BasicFilterForm
      form={form}
      onSubmit={(data) => onSubmit(data)}
      searchBtn={true}
      isFiltering={isFiltering}
    >
      <MultiSelectField
        className="w-[200px] h-[40px]"
        options={subjectDropdownList.map(item => ({
          label: item.name,
          value: item.id,
        }))}
        name='subjectIds'
        placeholder={t('questions.filter.subject')}
        control={form.control}
      />
      <MultiSelectField
        className="w-[170px] h-[40px]"
        options={arrangeDropdownList.map(item => ({
          label: `${item}`,
          value: `${item}`,
        }))}
        name='arranges'
        placeholder={t('questions.filter.arrange')}
        control={form.control}
      />
    </BasicFilterForm>
    </div>
  );
}
