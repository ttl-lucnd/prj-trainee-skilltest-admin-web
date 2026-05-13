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
import { QuestionForm } from '../components/QuestionForm';
import { BulkDeleteForm } from '@/components/BulkDeleteForm';
import { useTranslations } from 'next-intl';
export function QuestionsPage() {
  const t = useTranslations();
  const { 
    isOpenSyncDataDialog, 
    isOpenSettingFormDialog, 
    isOpenBulkDeleteDialog,
    selectedQuestionIds,
    setOpenBulkDeleteDialog,
    setOpenSettingFormDialog,
    setOpenSyncDataDialog, 
    getQuestionSetting,
    getQuestionList,
  } = useQuestionStore(
    useShallow((state) => ({
      isOpenSyncDataDialog: state.isOpenSyncDataDialog,
      isOpenSettingFormDialog: state.isOpenSettingFormDialog,
      isOpenBulkDeleteDialog: state.isOpenBulkDeleteDialog,
      selectedQuestionIds: state.selectedQuestionIds,
      setOpenBulkDeleteDialog: state.setOpenBulkDeleteDialog,
      setOpenSettingFormDialog: state.setOpenSettingFormDialog,
      setOpenSyncDataDialog: state.setOpenSyncDataDialog,
      getQuestionSetting: state.getQuestionSetting,
      getQuestionList:state.getQuestionList,
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
      <QuestionForm/>
      <BulkDeleteForm
        title={t('questions.delete.bulkDeleteTitle')}
        deleteBtn={`${t('common.buttons.bulk_delete')}(${selectedQuestionIds.length})`}
        isOpen={isOpenBulkDeleteDialog}
        setOpen={setOpenBulkDeleteDialog}
        handleDelete={() => questionService.bulkDelete(selectedQuestionIds)}
        getData={getQuestionList}
      />
    </>
  );
}
