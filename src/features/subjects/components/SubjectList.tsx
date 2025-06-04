'use client';

import { Pagination } from '@/components/ui/pagination';
import { useSubjectStore } from '../stores/useSubjectStore';
import { SubjectTable } from './SubjectTable';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { useShallow } from 'zustand/react/shallow';
import { ICommonListQuery } from '@/utils/interfaces';
import { AdminRole } from '@/features/admin-account/constants';
export function SubjectList() {
  const {profile, totalItems, subjectGetListQuery, setSubjectGetListQuery, setOpenSubjectFormDialog, setSelectedSubject } = useSubjectStore(useShallow((s) => ({
    profile: s.profile,
    totalItems: s.totalItems,
    subjectGetListQuery: s.subjectGetListQuery,
    setSubjectGetListQuery: s.setSubjectGetListQuery,
    setOpenSubjectFormDialog: s.setOpenSubjectFormDialog,
    setSelectedSubject: s.setSelectedSubject,
  })));

  const { updateUrlWithQuery: updateSubjectAccountUrlWithQuery } = useUpdateUrlWithQuery();

  const setSubjectAccountGetListQuery = (query: ICommonListQuery) => {
    setSubjectGetListQuery(query);
    updateSubjectAccountUrlWithQuery(query);
  };

  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className="flex">
        <SubjectTable />
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={subjectGetListQuery.page}
        itemsPerPage={subjectGetListQuery.limit}
        onPageChange={(page) => setSubjectAccountGetListQuery({ page })}
      >
        <div className="flex items-center justify-end">
          <Button 
          disabled={profile?.role !== AdminRole.SUPPER_ADMIN}
          size="lg" 
          onClick={() => {setOpenSubjectFormDialog(true); setSelectedSubject(null)}}
          >学科を追加</Button>
        </div>
      </Pagination>
    </div>
  );
}
