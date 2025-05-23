'use client';

import { QuestionList } from '../components/QuestionList';
import { QuestionFilterForm } from '../components/QuestionFilterForm';
import { QuestionDeleteDialog } from '../components/QuestionDeleteDialog';
import { QuestionSettingForm } from '../components/QuestionSettingForm';
import { QuestionImageDetail } from '../components/QuestionImageDetail';
import { QuestionSyncDataDialog } from '../components/QuestionSyncDataDialog';
export function QuestionsPage() {
  
  return (
    <>
      <QuestionFilterForm />
      <QuestionList />
      <QuestionDeleteDialog />
      <QuestionSettingForm />
      <QuestionImageDetail />
      <QuestionSyncDataDialog/>
    </>
  );
}
