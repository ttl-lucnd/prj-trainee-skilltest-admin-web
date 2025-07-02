'use client';

import { Pagination } from '@/components/ui/pagination';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { VocabularyTable } from './VocabularyTable';
import { IVocabularyGetListQuery } from '../interfaces';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SYNC_DATA_STATUS } from '@/features/common/constants';
import { IBodyResponse } from '@/utils/interfaces';
import { vocabularyService } from '../services/vocabulary.service';
import { toast } from '@/hooks/use-toast';
export function VocabularyList() {
  const t = useTranslations();
  const { totalItems, vocabularyGetListQuery, selectedVocabularyIds, loading, vocabularySetting,
    setVocabularyGetListQuery, 
    setOpenSettingFormDialog, 
    getSubjectDropdown, 
    setOpenSyncDataDialog,
    setOpenBulkDeleteDialog,
    getSetting,
  } = useVocabularyStore(useShallow((s) => ({
    selectedVocabularyIds: s.selectedVocabularyIds,
    loading: s.loading,
    vocabularySetting: s.vocabularySetting,
    totalItems: s.totalItems,
    vocabularyGetListQuery: s.vocabularyGetListQuery,
    setVocabularyGetListQuery: s.setVocabularyGetListQuery,
    setOpenSettingFormDialog: s.setOpenSettingFormDialog,
    setOpenSyncDataDialog: s.setOpenSyncDataDialog,
    getSubjectDropdown: s.getSubjectDropdown,
    setOpenBulkDeleteDialog: s.setOpenBulkDeleteDialog,
    getSetting: s.getVocabularySetting,
  })));

  const { updateUrlWithQuery: updateVocabularyUrlWithQuery } = useUpdateUrlWithQuery();
  const isDisable = useMemo(() => vocabularySetting?.status === SYNC_DATA_STATUS.PENDING || vocabularySetting?.status === SYNC_DATA_STATUS.TRANSLATING
  , [vocabularySetting]);

  const setGetListQuery = (query: IVocabularyGetListQuery) => {
    setVocabularyGetListQuery(query);
    updateVocabularyUrlWithQuery(query);
  };

  useEffect(() => {
    getSubjectDropdown();
  }, [])

  const [isTranslating, setIsTranslating] = useState(false);

  const handleDeleteVocabulary = async () => {
    if(isTranslating) return;
    setIsTranslating(true);

    try {
      const response: IBodyResponse<any> = await vocabularyService.translate();
      await getSetting();
      if(response.success) {
        toast({
          title: t('common.messages.data_translate'),
          variant: 'success',
        })
      }else {
        toast({
          title: t('common.messages.error'),
          variant:'destructive',
        })
      }
    }catch {
      toast({
        title: t('common.sync_data_status.server_error'),
        variant:'destructive',
      })
    }finally {
      setIsTranslating(false);
    }
  }

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
        {selectedVocabularyIds.length > 0 
          ? <Button 
            key={'bulk-delete'} size="lg" variant={'destructive'} 
            disabled={loading || isDisable} 
            onClick={() => setOpenBulkDeleteDialog(true)}
          >{`${t('common.buttons.bulk_delete')}(${selectedVocabularyIds.length})`}</Button>
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
          <Button 
            key={'translate-data'} size="lg" variant={'success'}
            disabled={loading || isDisable} 
            onClick={() => handleDeleteVocabulary()}
          >{t('common.buttons.translate')}</Button>
          </>
        }
        </div>
      </Pagination>
    </div>
  );
}
