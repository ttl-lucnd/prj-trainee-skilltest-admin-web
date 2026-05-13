'use client';

import { AppBreadcrumb } from '@/components/AppBreadcrumb';
import { PackageList } from '../components/package/PackageList';
import { PageRouter } from '@/utils';
import { useSubjectStore } from '../stores/useSubjectStore';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { subjectService } from '../services/subject.service';
import { ISubject } from '../interfaces';
import { IBodyResponse } from '@/utils/interfaces';
import { useHttpErrorHandler } from '@/hooks/useHttpErrorHandler';
import { PackageMessageDialog } from '../components/package/PackageMessageDialog';
import { PackageDeleteDialog } from '../components/package/PackageDeleteDialog';
import { PackageForm } from '../components/package/PackageForm';
import { usePackageStore } from '../stores/usePackageStore';
export function PackagePage() {
  const { checkError } = useHttpErrorHandler();
  const { id } = useParams();
  const { selectedSubject, setSelectedSubject } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject,
      setSelectedSubject: state.setSelectedSubject,
    })),
  );

  const { setPackageGetListQuery } = usePackageStore(
    useShallow((state) => ({
      setPackageGetListQuery: state.setPackageGetListQuery,
    })),
  );

  const getDetail = async () => {
    setPackageGetListQuery({
      subjectId: String(id),
    });
    const response: IBodyResponse<ISubject> = await subjectService._getDetail(String(id));
    if (!response.success) {
      checkError(response);
    } else {
      setSelectedSubject(response.data);
      document.title = response.data.name;
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  return (
    <>
      <div className="flex mt-0.5 mb-[16px] items-center h-10">
        <AppBreadcrumb
          items={[
            { label: 'sidebar.subject_management', href: PageRouter.SUBJECT_MANAGEMENT },
            {
              label: selectedSubject?.name ?? '',
              isKeepOrigin: true,
              href: `${PageRouter.SUBJECT_MANAGEMENT}/${selectedSubject?.id}`,
            },
          ]}
        />
      </div>
      <PackageList />
      <PackageForm />
      <PackageMessageDialog />
      <PackageDeleteDialog />
    </>
  );
}
