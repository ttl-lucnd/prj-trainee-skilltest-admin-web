'use client';

import { Pagination } from '@/components/ui/pagination';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { VocabularyTable } from './VocabularyTable';
import { IVocabularyGetListQuery } from '../interfaces';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
export function VocabularyList() {
  const t = useTranslations();
  const { totalItems, vocabularyGetListQuery, setVocabularyGetListQuery, setOpenSettingFormDialog, getSubjectDropdown, setOpenSyncDataDialog } = useVocabularyStore(useShallow((s) => ({
    totalItems: s.totalItems,
    vocabularyGetListQuery: s.vocabularyGetListQuery,
    setVocabularyGetListQuery: s.setVocabularyGetListQuery,
    setOpenSettingFormDialog: s.setOpenSettingFormDialog,
    setOpenSyncDataDialog: s.setOpenSyncDataDialog,
    getSubjectDropdown: s.getSubjectDropdown,
  })));

  const { updateUrlWithQuery: updateVocabularyUrlWithQuery } = useUpdateUrlWithQuery();

  const setGetListQuery = (query: IVocabularyGetListQuery) => {
    setVocabularyGetListQuery(query);
    updateVocabularyUrlWithQuery(query);
  };

  useEffect(() => {
    getSubjectDropdown();
  }, [])

  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className="flex">
        <VocabularyTable />
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={vocabularyGetListQuery.page}
        itemsPerPage={vocabularyGetListQuery.limit}
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
