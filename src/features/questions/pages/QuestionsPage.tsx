'use client';

import { QuestionList } from '../components/QuestionList';
import { QuestionFilterForm } from '../components/QuestionFilterForm';
import { QuestionDeleteDialog } from '../components/QuestionDeleteDialog';
import { QuestionImageDetail } from '../components/QuestionImageDetail';
import { SyncDataDialog } from '@/components/SyncDataDialog';
import { useQuestionStore } from '../stores/useQuestionStore';
import { useShallow } from 'zustand/react/shallow';
import { questionService } from '../services/question.service';
import { SyncSettingForm } from '@/components/SyncSettingForm';
export function QuestionsPage() {
  
  const { 
    isOpenSyncDataDialog, 
    isOpenSettingFormDialog, 
    setOpenSettingFormDialog,
    setOpenSyncDataDialog, 
    getQuestionSetting,
  } = useQuestionStore(
    useShallow((state) => ({
      isOpenSyncDataDialog: state.isOpenSyncDataDialog,
      isOpenSettingFormDialog: state.isOpenSettingFormDialog,
      setOpenSettingFormDialog: state.setOpenSettingFormDialog,
      setOpenSyncDataDialog: state.setOpenSyncDataDialog,
      getQuestionSetting: state.getQuestionSetting,
    })),
  );

  return (
    <>
      <QuestionFilterForm />
      <QuestionList />
      <QuestionDeleteDialog />
      <QuestionImageDetail />
      <SyncDataDialog 
        isOpenSyncDataDialog={isOpenSyncDataDialog}
        setOpenSyncDataDialog={data => setOpenSyncDataDialog(data)}
        getSetting={() => getQuestionSetting()}
        handleSync={() => questionService.syncData()}
      />
      <SyncSettingForm
        isOpenSettingFormDialog={isOpenSettingFormDialog}
        setOpenSettingFormDialog={data => setOpenSettingFormDialog(data)}
        handleUpdate={(data) => questionService.updateQuestionSetting(data)}
        getSetting={() => questionService.getQuestionSetting()}
      />
    </>
  );
}
