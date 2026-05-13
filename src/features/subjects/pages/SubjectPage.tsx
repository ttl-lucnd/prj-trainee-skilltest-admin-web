'use client';

import { SubjectList } from '../components/subject/SubjectList';
import { SubjectFilterForm } from '../components/subject/SubjectFilterForm';
import { SubjectForm } from '../components/subject/SubjectForm';
import { SubjectImageDetail } from '../components/subject/SubjectImageDetail';
import { SubjectDeleteDialog } from '../components/subject/SubjectDeleteDialog';
import { SubjectMessageDialog } from '../components/subject/SubjectMessageDialog';
export function SubjectPage() {
  return (
    <>
      <SubjectFilterForm />
      <SubjectList />
      <SubjectDeleteDialog />
      <SubjectForm />
      <SubjectImageDetail />
      <SubjectMessageDialog />
    </>
  );
}
