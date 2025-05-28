'use client';

import { Pagination } from '@/components/ui/pagination';
import { useSubjectStore } from '../stores/useSubjectStore';
import { SubjectTable } from './SubjectTable';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { useShallow } from 'zustand/react/shallow';
import { ICommonListQuery } from '@/utils/interfaces';
export function SubjectList() {
  const { totalItems, subjectGetListQuery, setSubjectGetListQuery, setOpenSubjectFormDialog, setSelectedSubject } = useSubjectStore(useShallow((s) => ({
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
          <Button size="sm" onClick={() => {setOpenSubjectFormDialog(true); setSelectedSubject(null)}}>学科を追加</Button>
        </div>
      </Pagination>
    </div>
  );
}
