'use client';

import { SubjectList } from '../components/SubjectList';
import { SubjectFilterForm } from '../components/SubjectFilterForm';
import { SubjectForm } from '../components/SubjectForm';
import { SubjectImageDetail } from '../components/SubjectImageDetail';
import { SubjectDeleteDialog } from '../components/SubjectDeleteDialog';
export function SubjectPage() {
  
  return (
    <>
      <SubjectFilterForm />
      <SubjectList />
      <SubjectDeleteDialog />
      <SubjectForm />
      <SubjectImageDetail />
    </>
  );
}
