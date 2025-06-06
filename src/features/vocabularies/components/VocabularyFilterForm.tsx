'use client';

import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { vocabularyFilterYupResolver } from '../schema';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { MultiSelectField } from '@/components/form/multi-select';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { BasicFilterForm } from '@/components/BasicFilterForm';
export function VocabularyFilterForm() {
  const t = useTranslations();
  const [isFiltering, setIsFiltering] = useState(false);

  const { subjectDropdownList, vocabularySetting, setVocabularyGetListQuery, getVocabularyList, getVocabularySetting } = useVocabularyStore(
    useShallow((s) => ({
      vocabularySetting: s.vocabularySetting,
      subjectDropdownList: s.subjectDropdownList,
      setVocabularyGetListQuery: s.setVocabularyGetListQuery,
      getVocabularyList: s.getVocabularyList,
      getVocabularySetting: s.getVocabularySetting,
    })),
  );
  const form = useForm({
    resolver: vocabularyFilterYupResolver,
  });

  const {
    getQueryFromUrl: getVocabularyQueryFromUrl,
    updateUrlWithQuery: updateVocabularyUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    const query = getVocabularyQueryFromUrl();
    form.reset(query);
    setVocabularyGetListQuery(query, { reloadList: false });
    getVocabularySetting();
  }, []);

  const onSubmit = async (data: any) => {
    if(isFiltering) return;
    setIsFiltering(true);
    try {
      
      const query = {
        ...data,
        page: DEFAULT_FIRST_PAGE,
      };
      setVocabularyGetListQuery(query, { reloadList: false });
      updateVocabularyUrlWithQuery(query);
      await getVocabularyList();
    } catch {
      setIsFiltering(false);
    } finally {
      setIsFiltering(false);
    }
  };

   const syncDataInfo = () => {
      return <div className='flex flex-col min-w-[200px] mb-2'>
        {vocabularySetting?.lastSyncDataAt &&
        <div className='flex flex-wrap'>
          {t('common.sync_data_at')}
          <p className='text-[#E9034E]'>{dayjs(vocabularySetting?.lastSyncDataAt ?? "").format(t('common.sync_data_at_format'))}</p>
        </div>
        }
        {vocabularySetting?.status && <p className='text-[#E9034E]'>{t(`common.sync_data_status.${vocabularySetting.status}`)}</p>}
      </div>
    }

  return (
    <div className={cn(
      'flex flex-wrap w-full items-start gap-10 mb-5',
      vocabularySetting? 'justify-between' : 'justify-end'
    )}>
    {vocabularySetting && syncDataInfo()}
    <BasicFilterForm
      form={form}
      onSubmit={(data) => onSubmit(data)}
      searchBtn={true}
      isFiltering={isFiltering}
    >
      <MultiSelectField
        className="w-[183px] h-[40px]"
        options={subjectDropdownList.map(item => ({
          label: item.name,
          value: item.id,
        }))}
        name='subjectIds'
        placeholder={t('vocabularies.filter.subject')}
        control={form.control}
      />
    </BasicFilterForm>
    </div>
  );
}
