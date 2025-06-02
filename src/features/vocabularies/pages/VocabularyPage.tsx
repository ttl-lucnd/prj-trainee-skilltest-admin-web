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
export function VocabularyPage() {
  const { 
    isOpenSyncDataDialog, 
    isOpenSettingFormDialog, 
    setOpenSettingFormDialog,
    setOpenSyncDataDialog, 
    getVocabularySetting,
  } = useVocabularyStore(
    useShallow((state) => ({
      isOpenSyncDataDialog: state.isOpenSyncDataDialog,
      isOpenSettingFormDialog: state.isOpenSettingFormDialog,
      setOpenSettingFormDialog: state.setOpenSettingFormDialog,
      setOpenSyncDataDialog: state.setOpenSyncDataDialog,
      getVocabularySetting: state.getVocabularySetting,
    })),
  );
  
  return (
    <>
      <VocabularyFilterForm />
      <VocabularyList />
      <VocabularyDeleteDialog />
      <VocabularyImageDetail />
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
    </>
  );
}
