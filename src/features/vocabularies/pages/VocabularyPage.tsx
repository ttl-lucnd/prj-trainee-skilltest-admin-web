'use client';

import { VocabularyList } from '../components/VocabularyList';
import { VocabularyFilterForm } from '../components/VocabularyFilterForm';
import { VocabularyDeleteDialog } from '../components/VocabularyDeleteDialog';
import { VocabularyImageDetail } from '../components/VocabularyImageDetail';
import { SyncDataDialog } from '@/components/SyncDataDialog';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { useShallow } from 'zustand/react/shallow';
import { vocabularyService } from '../services/vocabulary.service';
import { SyncSettingForm } from '@/components/SyncSettingForm';
import { VocabularyDescriptionDetail } from '../components/VocabularyDescriptionDetail';
import { VocabularyForm } from '../components/VocabularyForm';
import { BulkDeleteForm } from '@/components/BulkDeleteForm';
import { useTranslations } from 'next-intl';
export function VocabularyPage() {
  const t = useTranslations();
  const { 
    isOpenSyncDataDialog, 
    isOpenSettingFormDialog, 
    isOpenBulkDeleteDialog,
    selectedVocabularyIds,
    setOpenBulkDeleteDialog,
    setOpenSettingFormDialog,
    setOpenSyncDataDialog, 
    getVocabularySetting,
    getVocabularyList,
  } = useVocabularyStore(
    useShallow((state) => ({
      isOpenBulkDeleteDialog: state.isOpenBulkDeleteDialog,
      selectedVocabularyIds: state.selectedVocabularyIds,
      setOpenBulkDeleteDialog: state.setOpenBulkDeleteDialog,
      isOpenSyncDataDialog: state.isOpenSyncDataDialog,
      isOpenSettingFormDialog: state.isOpenSettingFormDialog,
      setOpenSettingFormDialog: state.setOpenSettingFormDialog,
      setOpenSyncDataDialog: state.setOpenSyncDataDialog,
      getVocabularySetting: state.getVocabularySetting,
      getVocabularyList: state.getVocabularyList,
    })),
  );
  
  return (
    <>
      <VocabularyFilterForm />
      <VocabularyList />
      <VocabularyDeleteDialog />
      <VocabularyImageDetail />
      <VocabularyDescriptionDetail />
      <SyncDataDialog 
        isOpenSyncDataDialog={isOpenSyncDataDialog}
        setOpenSyncDataDialog={(data)=> setOpenSyncDataDialog(data)}
        getSetting={() => getVocabularySetting()}
        handleSync={() => vocabularyService.syncData()}
      />
      <SyncSettingForm 
        isOpenSettingFormDialog={isOpenSettingFormDialog}
        setOpenSettingFormDialog={(data) => setOpenSettingFormDialog(data)}
        handleUpdate={(data) => vocabularyService.updateVocabularySetting(data)}
        getSetting={() => vocabularyService.getVocabularySetting()}
      />
      <VocabularyForm/>
      <BulkDeleteForm
        title={t('questions.delete.bulkDeleteTitle')}
        deleteBtn={`${t('common.buttons.bulk_delete')}(${selectedVocabularyIds.length})`}
        isOpen={isOpenBulkDeleteDialog}
        setOpen={setOpenBulkDeleteDialog}
        handleDelete={() => vocabularyService.bulkDelete(selectedVocabularyIds)}
        getData={getVocabularyList}
      />
    </>
  );
}
