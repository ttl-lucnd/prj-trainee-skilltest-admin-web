import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { PencilIcon, TrashIcon } from '@/components/icons';
import { NumberCell } from '@/components/table/NumberCell';
import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { compact } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSubjectStore } from '../stores/useSubjectStore';
import { ISubject } from '../interfaces';
import { IAdminAccount } from '@/features/admin-account/interfaces';
import { authService } from '@/features/auth/services/auth.service';
import Image from 'next/image';
import { AdminRole } from '@/features/admin-account/constants';

export function SubjectTable() {
  const t = useTranslations();
  const {
    subjectList,
    loading,
    subjectGetListQuery,
    getSubjectList,
    resetState,
    setOpenSubjectFormDialog,
    setOpenDeleteSubjectDialog,
    setSelectedSubject,
    setOpenImageDetail,
    setSelectedImage
  } = useSubjectStore(
    useShallow((state) => ({
      subjectList: state.subjectList,
      loading: state.loading,
      subjectGetListQuery: state.subjectGetListQuery,
      getSubjectList: state.getSubjectList,
      resetState: state.resetState,
      setOpenSubjectFormDialog: state.setOpenSubjectFormDialog,
      setOpenDeleteSubjectDialog: state.setOpenDeleteSubjectDialog,
      setSelectedSubject: state.setSelectedSubject,
      setOpenImageDetail: state.setOpenImageDetail,
      setSelectedImage: state.setSelectedImage,
    })),
  );

  const [profile, setProfile] = useState<IAdminAccount>();

  useEffect(() => {
    const getProfile = async () => {
      const response = await authService.getProfile();
      if(response.success) {
        setProfile(response.data.profile);
      }
    }
    getProfile();
    getSubjectList();
    return () => {
      resetState();
    };
  }, []);

  const nameCell = useCallback(
    ({ row }: Readonly<CellContext<ISubject, unknown>>) => {
      return <TruncatedText text={row.original.name} />;
    },
    [],
  );

  const monthlyFeeCell = useCallback(
    ({ row }: Readonly<CellContext<ISubject, unknown>>) => {
      return <TruncatedText text={t('subjects.price',{price: row.original.monthlyFee ?? 0})} />;
    },
    [t],
  );

  const logoCell = useCallback(
    ({ row }: Readonly<CellContext<ISubject, unknown>>) => {
      return row.original.logo 
      ? 
        <div className="flex gap-4">
          <button
            type="button"
            className="w-[45px] h-[45px] border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={() => {
              setOpenImageDetail(true);
              setSelectedImage(row.original.logo);
            }}
          >
              <Image
            src={row.original.logo}
            width={45}
            height={45}
            alt="subject-logo"
          />
          </button>
        </div>
      : <TruncatedText text={'---'} />;
    },
    [setSelectedImage, setOpenImageDetail],
  );

  const imageCell = useCallback(
    ({ row }: Readonly<CellContext<ISubject, unknown>>) => {
      return row.original.image 
      ? 
        <div className="flex gap-4">
          <button
            type="button"
            className="w-[45px] h-[45px] border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={() => {
              setOpenImageDetail(true);
              setSelectedImage(row.original.image);
            }}
          >
              <Image 
            src={row.original.image}
            width={45}
            height={45}
            alt="subject-image"
          />
          </button>
        </div>
      : <TruncatedText text={'---'} />;
    },
    [setSelectedImage, setOpenImageDetail],
  );

  const SubjectActions = useCallback(
    ({ row }: Readonly<CellContext<ISubject, unknown>>) => {
      return (
        <div className="flex gap-4">
          <span
            onPointerDown={() => {
              setOpenSubjectFormDialog(true);
              setSelectedSubject(row.original);
            }}
            className="cursor-pointer"
          >
            <PencilIcon size={22} />
          </span>
          <button
            hidden={profile?.role !== AdminRole.SUPPER_ADMIN}
            onClick={() => {
              setOpenDeleteSubjectDialog(true);
              setSelectedSubject(row.original);
            }}
            className="cursor-pointer"
          >
            <TrashIcon size={22} />
          </button>
        </div>
      );
    },
    [profile, setOpenSubjectFormDialog, setOpenDeleteSubjectDialog, setSelectedSubject],
  );

  const columns: ColumnDef<ISubject>[] = useMemo(() => {
    return compact([
      {
        header: t('common.number'),
        accessorKey: 'index',
        cell: (props: CellContext<ISubject, unknown>) =>
          NumberCell({
            ...props,
            page: subjectGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: subjectGetListQuery.limit,
          }),
        size: 30,
      },
      {
        header: t('subjects.table.subject'),
        accessorKey: 'name',
        cell: nameCell,
        size: 150,
      },
      {
        header: t('subjects.table.monthlyFee'),
        accessorKey: 'monthlyFee',
        cell: monthlyFeeCell,
        size: 150,
      },{
        header: t('subjects.table.logo'),
        accessorKey: 'logo',
        cell: logoCell,
        size: 150,
      },{
        header: t('subjects.table.image'),
        accessorKey: 'image',
        cell: imageCell,
        size: 150,
      },{
        header: t('subjects.table.action'),
        id: 'actions',
        size: 60,
        cell: SubjectActions,
      }
    ]);
  }, [
    t,
    nameCell,
    monthlyFeeCell,
    logoCell,
    imageCell,
    SubjectActions,
  ]);

  return <DataTable 
    columns={columns} 
    data={subjectList} 
    loading={loading}
    rowClassName={'h-16'} 
    headerClassName={'bg-[#FBFDFF]'}
  />;
}
