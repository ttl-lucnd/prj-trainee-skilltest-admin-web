'use client';

import { Pagination } from '@/components/ui/pagination';
import { useQuestionStore } from '../stores/useQuestionStore';
import { QuestionTable } from './QuestionTable';
import { IQuestionGetListQuery } from '../interfaces';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { SYNC_DATA_STATUS } from '@/features/common/constants';
export function QuestionList() {
  const t = useTranslations();
  const { totalItems, questionGetListQuery, selectedQuestionIds, loading, questionSetting,
    setQuestionGetListQuery, 
    setOpenSettingFormDialog, 
    getSubjectDropdown, 
    getArrangeDropdown, 
    setOpenSyncDataDialog,
    setOpenBulkDeleteDialog,
  } = useQuestionStore(useShallow((s) => ({
    loading: s.loading,
    totalItems: s.totalItems,
    questionGetListQuery: s.questionGetListQuery,
    selectedQuestionIds: s.selectedQuestionIds,
    questionSetting: s.questionSetting,
    setQuestionGetListQuery: s.setQuestionGetListQuery,
    setOpenSettingFormDialog: s.setOpenSettingFormDialog,
    setOpenSyncDataDialog: s.setOpenSyncDataDialog,
    getSubjectDropdown: s.getSubjectDropdown,
    getArrangeDropdown: s.getArrangeDropdown,
    setOpenBulkDeleteDialog: s.setOpenBulkDeleteDialog,
  })));

  const { updateUrlWithQuery: updateQuestionUrlWithQuery } = useUpdateUrlWithQuery();
  const isDisable = useMemo(() => questionSetting?.status === SYNC_DATA_STATUS.PENDING, [questionSetting]);

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
        {selectedQuestionIds.length > 0 
          ? <Button 
            key={'bulk-delete'} size="lg" variant={'destructive'} 
            disabled={loading || isDisable} 
            onClick={() => setOpenBulkDeleteDialog(true)}
          >{`${t('common.buttons.bulk_delete')}(${selectedQuestionIds.length})`}</Button>
          : <>
          <Button 
            key={'setting-url'} size="lg" variant={'outline'}
            disabled={loading || isDisable}
            onClick={() => setOpenSettingFormDialog(true)}
          >{t('common.buttons.setting_url')}</Button>
          <Button 
            key={'sync-data'} size="lg" 
            disabled={loading || isDisable} 
            onClick={() => setOpenSyncDataDialog(true)}
          >{t('common.buttons.sync_data')}</Button>
          </>
        }
        </div>
      </Pagination>
    </div>
  );
}
