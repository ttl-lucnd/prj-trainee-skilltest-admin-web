'use client';

import { DEFAULT_FIRST_PAGE, DELAY_GET_STATUS } from '@/utils/constants';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { questionFilterYupResolver } from '../schema';
import { useQuestionStore } from '../stores/useQuestionStore';
import { MultiSelectField } from '@/components/form/multi-select';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils';
import { BasicFilterForm } from '@/components/BasicFilterForm';
import { SYNC_DATA_STATUS } from '@/features/common/constants';
import { toast } from '@/hooks/use-toast';
export function QuestionFilterForm() {
  const t = useTranslations();
  const [isFiltering, setIsFiltering] = useState(false);

  const {
    subjectDropdownList,
    arrangeDropdownList,
    questionSetting,
    setQuestionGetListQuery,
    getQuestionList,
    getQuestionSetting,
  } = useQuestionStore(
    useShallow((s) => ({
      subjectDropdownList: s.subjectDropdownList,
      arrangeDropdownList: s.arrangeDropdownList,
      questionSetting: s.questionSetting,
      setQuestionGetListQuery: s.setQuestionGetListQuery,
      getQuestionList: s.getQuestionList,
      getQuestionSetting: s.getQuestionSetting,
    })),
  );
  const form = useForm({
    resolver: questionFilterYupResolver,
  });

  const {
    getQueryFromUrl: getQuestionQueryFromUrl,
    updateUrlWithQuery: updateQuestionUrlWithQuery,
  } = useUpdateUrlWithQuery();

  const prevStatusRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const currentStatus = questionSetting?.status;

    if (currentStatus === SYNC_DATA_STATUS.PENDING) {
      prevStatusRef.current = currentStatus;
      return;
    }
    if (prevStatus !== currentStatus) {
      if (
        currentStatus === SYNC_DATA_STATUS.DRIVE_DENIED &&
        prevStatus === SYNC_DATA_STATUS.PENDING
      ) {
        toast({
          title: t('common.messages.sync_data_error_at', {
            row: (questionSetting?.lastReadRow ?? 0) + 1,
          }),
          variant: 'destructive',
        });
      }
      getQuestionList();
    }

    prevStatusRef.current = currentStatus;
  }, [questionSetting]);

  useEffect(() => {
    const query = getQuestionQueryFromUrl();
    form.reset(query);
    setQuestionGetListQuery(query, { reloadList: false });
  }, []);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    function startInterval() {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => {
        getQuestionSetting();
      }, DELAY_GET_STATUS);
    }

    function stopInterval() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    if (navigator.onLine) {
      getQuestionSetting();
      startInterval();
    }

    function handleOnline() {
      getQuestionSetting();
      startInterval();
    }
    function handleOffline() {
      stopInterval();
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      stopInterval();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [getQuestionSetting]);

  const onSubmit = async (data: any) => {
    if (isFiltering) return;
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

  const syncDataInfo = useMemo(() => {
    return (
      <div className="flex flex-col max-w-full flex-1">
        <div className="flex flex-wrap">
          {t('common.sync_data_at')}
          <p className="text-[#E9034E]">
            {questionSetting?.lastSyncDataAt
              ? dayjs(questionSetting?.lastSyncDataAt ?? '').format(
                  t('common.sync_data_at_format'),
                )
              : t('common.no_sync_data')}
          </p>
        </div>
        {questionSetting?.status && (
          <p className="text-[#E9034E]">
            {t(`common.sync_data_status.${questionSetting.status}`)}
          </p>
        )}
      </div>
    );
  }, [questionSetting]);

  return (
    <div
      className={cn(
        'flex flex-wrap w-full items-start gap-2.5 mt-0.5 mb-[16px]',
        questionSetting ? 'justify-between' : 'justify-end',
      )}
    >
      {syncDataInfo}
      <BasicFilterForm
        form={form}
        onSubmit={(data) => onSubmit(data)}
        searchBtn={true}
        isFiltering={isFiltering}
      >
        <MultiSelectField
          className="w-[200px] h-[40px]"
          options={subjectDropdownList.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          name="subjectIds"
          placeholder={t('questions.filter.subject')}
          control={form.control}
        />
        <MultiSelectField
          className="w-[170px] h-[40px]"
          options={arrangeDropdownList.map((item) => ({
            label: `${item}`,
            value: `${item}`,
          }))}
          name="arranges"
          placeholder={t('questions.filter.arrange')}
          control={form.control}
        />
      </BasicFilterForm>
    </div>
  );
}
