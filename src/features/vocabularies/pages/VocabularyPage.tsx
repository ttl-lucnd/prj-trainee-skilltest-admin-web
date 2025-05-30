'use client';

import { VocabularyList } from '../components/VocabularyList';
import { VocabularyFilterForm } from '../components/VocabularyFilterForm';
import { VocabularyDeleteDialog } from '../components/VocabularyDeleteDialog';
import { VocabularySettingForm } from '../components/VocabularySettingForm';
import { VocabularySyncDataDialog } from '../components/VocabularySyncDataDialog';
import { VocabularyImageDetail } from '../components/VocabularyImageDetail';
export function VocabularyPage() {
  
  return (
    <>
      <VocabularyFilterForm />
      <VocabularyList />
      <VocabularyDeleteDialog />
      <VocabularySettingForm />
      <VocabularySyncDataDialog/>
      <VocabularyImageDetail />
    </>
  );
}
