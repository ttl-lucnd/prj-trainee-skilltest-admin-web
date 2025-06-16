import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { PencilIcon, TrashIcon } from '@/components/icons';
import { NumberCell } from '@/components/table/NumberCell';
import { DEFAULT_FIRST_PAGE } from '@/utils/constants';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { compact } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSubjectStore } from '../stores/useSubjectStore';
import { ISubject } from '../interfaces';
import Image from 'next/image';
import { AdminRole } from '@/features/admin-account/constants';
import { cn } from '@/lib/utils';

export function SubjectTable() {
  const t = useTranslations();
  const {
    profile,
    subjectList,
    loading,
    subjectGetListQuery,
    getSubjectList,
    resetState,
    setOpenSubjectFormDialog,
    setOpenDeleteSubjectDialog,
    setSelectedSubject,
    setOpenImageDetail,
    setSelectedImage,
    getProfile,
    setOpenSubjectMessageDialog,
  } = useSubjectStore(
    useShallow((state) => ({
      profile: state.profile,
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
      getProfile:state.getProfile,
      setOpenSubjectMessageDialog: state.setOpenSubjectMessageDialog,
    })),
  );

  useEffect(() => {
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
      const isDisable = profile?.role !== AdminRole.SUPPER_ADMIN;
      return (
        <div className="flex gap-4">
          <button
            onClick={() => {
              setOpenSubjectFormDialog(true);
              setSelectedSubject(row.original);
            }}
          className={cn(
              !isDisable && 'hover:bg-primary-2',
              "flex size-[30px] rounded-full items-center justify-center group/edit"
            )}
            disabled={isDisable}
          >
            <PencilIcon size={22}
              className={cn(
                isDisable ? 'text-[#CECECE]'
                : 'cursor-pointer group-hover/edit:text-white')
              }
            />
          </button>
          <button
            onClick={() => {
              setSelectedSubject(row.original);
              if(row.original?.haveQuestion || row.original?.haveVocabulary) {
              setOpenSubjectMessageDialog(true);
              } else {
              setOpenDeleteSubjectDialog(true);
              }
            }}
            className={cn(
              !isDisable && 'hover:bg-destructive',
              "flex size-[30px] rounded-full items-center justify-center group/delete"
            )}
            disabled={isDisable}
          >
            <TrashIcon size={22} 
              className={cn(
                isDisable ? 'text-[#CECECE]'
                : 'cursor-pointer group-hover/delete:text-white')
              }
            />
          </button>
        </div>
      );
    },
    [profile, setOpenSubjectFormDialog, setOpenDeleteSubjectDialog, setSelectedSubject, setOpenSubjectMessageDialog],
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
        size: 50,
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
        size: 80,
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
