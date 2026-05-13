'use client';

import { Pagination } from '@/components/ui/pagination';
import { usePackageStore } from '../../stores/usePackageStore';
import { PackageTable } from './PackageTable';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { useShallow } from 'zustand/react/shallow';
import { ICommonListQuery } from '@/utils/interfaces';
import { AdminRole } from '@/features/admin-account/constants';
import { useSubjectStore } from '../../stores/useSubjectStore';
export function PackageList() {
  const {
    totalItems,
    packageGetListQuery,
    setPackageGetListQuery,
    setOpenPackageFormDialog,
    setSelectedPackage,
  } = usePackageStore(
    useShallow((s) => ({
      totalItems: s.totalItems,
      packageGetListQuery: s.packageGetListQuery,
      setPackageGetListQuery: s.setPackageGetListQuery,
      setOpenPackageFormDialog: s.setOpenPackageFormDialog,
      setSelectedPackage: s.setSelectedPackage,
    })),
  );

  const { profile } = useSubjectStore(
    useShallow((s) => ({
      profile: s.profile,
    })),
  );

  const { updateUrlWithQuery: updatePackagePageUrlWithQuery } = useUpdateUrlWithQuery();

  const setPackagePageGetListQuery = (query: ICommonListQuery) => {
    setPackageGetListQuery(query);
    updatePackagePageUrlWithQuery(query);
  };

  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className="flex">
        <PackageTable />
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={packageGetListQuery.page}
        itemsPerPage={packageGetListQuery.limit}
        onPageChange={(page) => setPackagePageGetListQuery({ page })}
      >
        <div className="flex items-center justify-end">
          <Button
            disabled={profile?.role !== AdminRole.SUPPER_ADMIN}
            size="lg"
            onClick={() => {
              setOpenPackageFormDialog(true);
              setSelectedPackage(null);
            }}
          >
            パッケージを追加
          </Button>
        </div>
      </Pagination>
    </div>
  );
}
