import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { PencilIcon, TrashIcon } from '@/components/icons';
import { NumberCell } from '@/components/table/NumberCell';
import { DEFAULT_FIRST_PAGE, OrderDirection } from '@/utils/constants';
import {
  CellContext,
  ColumnDef,
  ColumnSort,
  HeaderContext,
  SortingState,
} from '@tanstack/react-table';
import { compact } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  IVocabulary,
  TranslatedContent,
  TranslateLanguages,
  VocabularyOrderBy,
} from '../interfaces';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { SortableHeader } from '@/components/table/SortableHeader';
import Image from 'next/image';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { cn } from '@/lib/utils';
import { SYNC_DATA_STATUS } from '@/features/common/constants';
import { Checkbox } from '@/components/ui/checkbox';

function createMeaningCell(lang: TranslateLanguages) {
  const Cell = ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => (
    <TruncatedText text={row.original.vocabulary[lang] ?? ''} />
  );
  Cell.displayName = `MeaningCell_${lang}`;
  return Cell;
}

function createDescriptionCell(
  lang: TranslateLanguages,
  setOpenDescriptionDetail: (open: boolean) => void,
  setSelectedDescription: (text: string) => void,
) {
  const Cell = ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
    const text = row.original?.description[lang as keyof TranslatedContent] ?? '';
    return (
      <div className="flex gap-4">
        <button
          type="button"
          className="overflow-hidden flex items-center cursor-pointer"
          onClick={() => {
            setOpenDescriptionDetail(true);
            setSelectedDescription(text);
          }}
        >
          <span className={cn('block w-full overflow-hidden text-ellipsis break-words')}>
            {text}
          </span>
        </button>
      </div>
    );
  };
  Cell.displayName = `DescriptionCell_${lang}`;
  return Cell;
}

function createMeaningSortHeader(
  lang: TranslateLanguages,
  t: ReturnType<typeof useTranslations>,
) {
  const MeaningSortHeader = ({ column }: { column: any }) => (
    <SortableHeader column={column} title={t(`vocabularies.table.meaning_${lang}`)} />
  );
  MeaningSortHeader.displayName = `MeaningSortHeader_${lang}`;
  return MeaningSortHeader;
}

export function VocabularyTable() {
  const t = useTranslations();
  const {
    vocabularySetting,
    selectedVocabularyIds,
    vocabularyList,
    loading,
    vocabularyGetListQuery,
    resetState,
    setOpenDeleteVocabularyDialog,
    setSelectedVocabulary,
    setVocabularyGetListQuery,
    setOpenImageDetail,
    setOpenDescriptionDetail,
    setSelectedDescription,
    setOpenVocabularyFormDialog,
    setSelectedVocabularyIds,
  } = useVocabularyStore(
    useShallow((state) => ({
      vocabularySetting: state.vocabularySetting,
      selectedVocabularyIds: state.selectedVocabularyIds,
      vocabularyList: state.vocabularyList,
      loading: state.loading,
      vocabularyGetListQuery: state.vocabularyGetListQuery,
      resetState: state.resetState,
      setOpenDeleteVocabularyDialog: state.setOpenDeleteVocabularyDialog,
      setSelectedVocabulary: state.setSelectedVocabulary,
      setVocabularyGetListQuery: state.setVocabularyGetListQuery,
      setOpenImageDetail: state.setOpenImageDetail,
      setOpenDescriptionDetail: state.setOpenDescriptionDetail,
      setSelectedDescription: state.setSelectedDescription,
      setOpenVocabularyFormDialog: state.setOpenVocabularyFormDialog,
      setSelectedVocabularyIds: state.setSelectedVocabularyIds,
    })),
  );

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'VOCABULARY_ORIGINALLANGUAGE', desc: false },
  ]);
  const isDisable = useMemo(
    () =>
      vocabularySetting?.status === SYNC_DATA_STATUS.PENDING ||
      vocabularySetting?.status === SYNC_DATA_STATUS.TRANSLATING,
    [vocabularySetting],
  );

  const {
    getQueryFromUrl: getVocabularyQueryFromUrl,
    updateUrlWithQuery: updateVocabularyUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    const query = getVocabularyQueryFromUrl();
    setSorting([
      {
        id:
          (query?.orderBy as string)?.toUpperCase()?.replace('.', '_') ??
          'VOCABULARY_ORIGINALLANGUAGE',
        desc: query?.orderDirection === OrderDirection.DESC,
      },
    ]);
    return () => {
      resetState();
    };
  }, []);

  const handleSortingChange = useCallback(
    (sort?: ColumnSort) => {
      const newQuery = {
        orderBy:
          VocabularyOrderBy[
            (sort?.id as keyof typeof VocabularyOrderBy) ?? 'VOCABULARY_ORIGINALLANGUAGE'
          ],
        orderDirection: sort?.desc ? OrderDirection.DESC : OrderDirection.ASC,
      };

      setVocabularyGetListQuery(
        {
          ...vocabularyGetListQuery,
          ...newQuery,
        },
        { reloadList: true },
      );
      updateVocabularyUrlWithQuery(newQuery);
    },
    [vocabularyGetListQuery, setVocabularyGetListQuery, updateVocabularyUrlWithQuery],
  );

  const vocabularyCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return <TruncatedText text={row.original?.vocabulary?.originalLanguage ?? ''} />;
    },
    [],
  );

  const pronunciationCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return <TruncatedText text={row.original.pronunciation ?? ''} />;
    },
    [],
  );

  const originalDescriptionCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      const text = row.original?.description?.originalLanguage ?? '';
      return (
        <div className="flex gap-4">
          <button
            type="button"
            className="overflow-hidden flex items-center cursor-pointer"
            onClick={() => {
              setOpenDescriptionDetail(true);
              setSelectedDescription(text);
            }}
          >
            <span
              className={cn('block w-full overflow-hidden text-ellipsis break-words')}
            >
              {text}
            </span>
          </button>
        </div>
      );
    },
    [setSelectedDescription, setOpenDescriptionDetail],
  );

  const subjectCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return <TruncatedText text={row.original.subject?.name ?? ''} />;
    },
    [],
  );

  const imageCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return row.original.image ? (
        <div className="flex gap-4">
          <button
            type="button"
            className="w-[45px] h-[45px] border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={() => {
              setOpenImageDetail(true);
              setSelectedVocabulary(row.original);
            }}
          >
            <Image
              src={row.original.image}
              width={45}
              height={45}
              alt="vocabulary-image"
            />
          </button>
        </div>
      ) : (
        <TruncatedText text={'---'} />
      );
    },
    [setOpenImageDetail, setSelectedVocabulary],
  );

  const VocabularyActions = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      const disableAction = isDisable || selectedVocabularyIds.includes(row.original.id);
      return (
        <div className="flex gap-4">
          <button
            onClick={() => {
              setOpenVocabularyFormDialog(true);
              setSelectedVocabulary(row.original);
            }}
            className={cn(
              !disableAction && 'hover:bg-primary-2',
              'flex size-[30px] rounded-full items-center justify-center group/edit',
            )}
            disabled={disableAction}
          >
            <PencilIcon
              size={22}
              className={cn(
                disableAction
                  ? 'text-[#CECECE]'
                  : 'cursor-pointer group-hover/edit:text-white',
              )}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenDeleteVocabularyDialog(true);
              setSelectedVocabulary(row.original);
            }}
            disabled={disableAction}
            className={cn(
              !disableAction && 'hover:bg-destructive',
              'flex size-[30px] rounded-full items-center justify-center group/delete',
            )}
          >
            <TrashIcon
              size={22}
              className={cn(
                disableAction
                  ? 'text-[#CECECE]'
                  : 'cursor-pointer group-hover/delete:text-white',
              )}
            />
          </button>
        </div>
      );
    },
    [
      isDisable,
      selectedVocabularyIds,
      setOpenDeleteVocabularyDialog,
      setOpenVocabularyFormDialog,
      setSelectedVocabulary,
    ],
  );

  const translateCol = useMemo((): ColumnDef<IVocabulary>[] => {
    const headers = Object.entries(TranslateLanguages).flatMap(([key, lang]) => [
      {
        header: createMeaningSortHeader(lang, t),
        accessorKey: `VOCABULARY_${key}`,
        enableSorting: true,
        cell: createMeaningCell(lang),
        size: 200,
      },
      {
        header: t(`vocabularies.table.description_${lang}`),
        accessorKey: `description_${lang}`,
        enableSorting: true,
        cell: createDescriptionCell(
          lang,
          setOpenDescriptionDetail,
          setSelectedDescription,
        ),
        size: 200,
      },
    ]);

    return headers;
  }, [
    createDescriptionCell,
    createMeaningCell,
    createMeaningSortHeader,
    setSelectedDescription,
    setOpenDescriptionDetail,
  ]);

  const vocabularySortHeader = (props: { column: any }) => (
    <SortableHeader column={props.column} title={t('vocabularies.table.vocabulary')} />
  );

  const pronunciationSortHeader = (props: { column: any }) => (
    <SortableHeader column={props.column} title={t('vocabularies.table.pronunciation')} />
  );

  const SelectCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return (
        <div className="flex gap-4">
          <Checkbox
            disabled={isDisable}
            checked={selectedVocabularyIds.includes(row.original.id)}
            onCheckedChange={(value) => {
              if (value) {
                const newSelectedQuestionIds = [
                  ...selectedVocabularyIds,
                  row.original.id,
                ];
                setSelectedVocabularyIds(newSelectedQuestionIds);
              } else {
                const newSelectedQuestionIds = selectedVocabularyIds.filter(
                  (id) => id !== row.original.id,
                );
                setSelectedVocabularyIds(newSelectedQuestionIds);
              }
              row.toggleSelected(!!value);
            }}
            aria-label="Select row"
          />
        </div>
      );
    },
    [isDisable, selectedVocabularyIds, setSelectedVocabularyIds],
  );

  const SelectHeader = useCallback(
    ({ table }: HeaderContext<IVocabulary, unknown>) => {
      return (
        <div className="flex gap-4">
          <Checkbox
            disabled={isDisable || vocabularyList.length === 0}
            checked={
              selectedVocabularyIds.length === vocabularyList.length &&
              selectedVocabularyIds.length > 0
            }
            onCheckedChange={(value) => {
              if (value) {
                const newSelectedQuestionIds = vocabularyList.map((item) => item.id);
                setSelectedVocabularyIds(newSelectedQuestionIds);
              } else {
                setSelectedVocabularyIds([]);
              }
              table.toggleAllPageRowsSelected(!!value);
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
    [isDisable, selectedVocabularyIds, vocabularyList, setSelectedVocabularyIds],
  );

  const columns: ColumnDef<IVocabulary>[] = useMemo(() => {
    return compact([
      {
        id: 'select',
        header: SelectHeader,
        cell: SelectCell,
        size: 60,
      },
      {
        header: () => <div className="text-center">{t('common.number')}</div>,
        accessorKey: 'index',
        cell: (props: any) =>
          NumberCell({
            ...props,
            page: vocabularyGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: vocabularyGetListQuery.limit,
          }),
        size: 80,
      },
      {
        enableSorting: true,
        header: vocabularySortHeader,
        accessorKey: 'VOCABULARY_ORIGINALLANGUAGE',
        cell: vocabularyCell,
        size: 120,
      },
      {
        header: pronunciationSortHeader,
        accessorKey: 'PRONUNCIATION',
        enableSorting: true,
        cell: pronunciationCell,
        size: 120,
      },
      {
        header: t('vocabularies.table.description'),
        accessorKey: 'description',
        enableSorting: true,
        cell: originalDescriptionCell,
        size: 150,
      },
      ...translateCol,
      {
        header: t('vocabularies.table.subject'),
        accessorKey: 'subject',
        cell: subjectCell,
        size: 120,
      },
      {
        header: t('vocabularies.table.image'),
        accessorKey: 'image',
        cell: imageCell,
        size: 100,
      },
      {
        header: t('vocabularies.table.action'),
        id: 'actions',
        size: 120,
        cell: VocabularyActions,
      },
    ]);
  }, [
    t,
    translateCol,
    vocabularyCell,
    subjectCell,
    VocabularyActions,
    imageCell,
    pronunciationCell,
    vocabularySortHeader,
    pronunciationSortHeader,
    originalDescriptionCell,
    SelectCell,
    SelectHeader,
  ]);

  return (
    <DataTable
      columns={columns}
      data={vocabularyList}
      loading={loading}
      rowClassName={'h-16'}
      headerClassName={'bg-[#FBFDFF]'}
      onSortingChange={handleSortingChange}
      sorting={sorting}
      setSorting={setSorting}
      enableMultiRowSelection={true}
    />
  );
}
