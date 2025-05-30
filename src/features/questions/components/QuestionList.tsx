'use client';

import { Pagination } from '@/components/ui/pagination';
import { useQuestionStore } from '../stores/useQuestionStore';
import { QuestionTable } from './QuestionTable';
import { IQuestionGetListQuery } from '../interfaces';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
export function QuestionList() {
  const t = useTranslations();
  const { totalItems, questionGetListQuery, setQuestionGetListQuery, setOpenSettingFormDialog, getSubjectDropdown, getArrangeDropdown, setOpenSyncDataDialog } = useQuestionStore(useShallow((s) => ({
    totalItems: s.totalItems,
    questionGetListQuery: s.questionGetListQuery,
    setQuestionGetListQuery: s.setQuestionGetListQuery,
    setOpenSettingFormDialog: s.setOpenSettingFormDialog,
    setOpenSyncDataDialog: s.setOpenSyncDataDialog,
    getSubjectDropdown: s.getSubjectDropdown,
    getArrangeDropdown: s.getArrangeDropdown,
  })));

  const { updateUrlWithQuery: updateQuestionUrlWithQuery } = useUpdateUrlWithQuery();

  const setGetListQuery = (query: IQuestionGetListQuery) => {
    setQuestionGetListQuery(query);
    updateQuestionUrlWithQuery(query);
  };

  useEffect(() => {
    getArrangeDropdown();
    getSubjectDropdown();
  }, [])

  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className="flex">
        <QuestionTable />
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={questionGetListQuery.page}
        itemsPerPage={questionGetListQuery.limit}
        onPageChange={(page) => setGetListQuery({ page })}
      >
        <div className="flex items-center gap-2.5 justify-end">
          <Button size="lg" variant={'outline'} onClick={() => setOpenSettingFormDialog(true)}>{t('common.buttons.setting_url')}</Button>
          <Button size="lg" onClick={() => setOpenSyncDataDialog(true)}>{t('common.buttons.sync_data')}</Button>
        </div>
      </Pagination>
    </div>
  );
}
