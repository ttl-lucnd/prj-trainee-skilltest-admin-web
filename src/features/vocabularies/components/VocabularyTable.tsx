import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { TrashIcon } from '@/components/icons';
import { NumberCell } from '@/components/table/NumberCell';
import { DEFAULT_FIRST_PAGE, OrderDirection } from '@/utils/constants';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { compact } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { IVocabulary, TranslateLanguages, VocabularyOrderBy } from '../interfaces';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { SortableHeader } from '@/components/table/SortableHeader';
import Image from 'next/image';
import { useUpdateUrlWithQuery } from '@/utils/url';

function MeaningCellFactory(lang: TranslateLanguages) {
  const Cell = ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => (
    <TruncatedText text={row.original.vocabulary[lang] ?? ''} />
  );
  Cell.displayName = `MeaningCell_${lang}`;
  return Cell;
}

function DescriptionCellFactory(lang: TranslateLanguages) {
  const Cell = ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => (
    <TruncatedText text={row.original.description[lang] ?? ''} />
  );
  Cell.displayName = `DescriptionCell_${lang}`;
  return Cell;
}

export function VocabularyTable() {
  const t = useTranslations();
  const {
    vocabularyList,
    loading,
    vocabularyGetListQuery,
    getVocabularyList,
    resetState,
    setOpenDeleteVocabularyDialog,
    setSelectedVocabulary,
    setVocabularyGetListQuery,
    setOpenImageDetail,
  } = useVocabularyStore(
    useShallow((state) => ({
      vocabularyList: state.vocabularyList,
      loading: state.loading,
      vocabularyGetListQuery: state.vocabularyGetListQuery,
      getVocabularyList: state.getVocabularyList,
      resetState: state.resetState,
      setOpenDeleteVocabularyDialog: state.setOpenDeleteVocabularyDialog,
      setSelectedVocabulary: state.setSelectedVocabulary,
      setVocabularyGetListQuery: state.setVocabularyGetListQuery,
      setOpenImageDetail: state.setOpenImageDetail,
    })),
  );

    const [isSorting, setIsSorting] = useState(false);

  const {
    getQueryFromUrl: getVocabularyQueryFromUrl,
    updateUrlWithQuery: updateVocabularyUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    getVocabularyList();
    return () => {
      resetState();
    };
  }, []);

  const handleSort = useCallback(
    async (orderBy: string, orderDirection: OrderDirection | null) => {
      if (isSorting) return;
      setIsSorting(true);
      try {
        const data = orderDirection ? { orderBy, orderDirection } : {};
        const query = getVocabularyQueryFromUrl();
        const newQuery = {
          ...query,
          orderBy: VocabularyOrderBy.VOCABULARY,
          orderDirection: OrderDirection.ASC,
          ...data,
        };

        setVocabularyGetListQuery(newQuery, { reloadList: false });
        updateVocabularyUrlWithQuery(newQuery);
        await getVocabularyList();
      } catch {
        setIsSorting(false);
      } finally {
        setIsSorting(false);
      }
    },
    [
      isSorting,
      getVocabularyQueryFromUrl,
      setVocabularyGetListQuery,
      updateVocabularyUrlWithQuery,
      getVocabularyList,
    ]
  );

  const vocabularyCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return <TruncatedText text={row.original.vocabulary.originalLanguage} />;
    },
    [],
  );

  const pronunciationCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return <TruncatedText text={row.original.pronunciation} />;
    },
    [],
  );

  const meaningCell = (lang: TranslateLanguages) => MeaningCellFactory(lang);
  const descriptionCell = (lang: TranslateLanguages) => DescriptionCellFactory(lang);

  const subjectCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return (
        <TruncatedText text={row.original.subject?.name ?? ''}/>
      );
    },
    [],
  );

  const imageCell = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return row.original.image 
      ? 
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
      : <TruncatedText text={'---'} />;
    },
    [setOpenImageDetail, setSelectedVocabulary],
  );

  const VocabularyActions = useCallback(
    ({ row }: Readonly<CellContext<IVocabulary, unknown>>) => {
      return (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setOpenDeleteVocabularyDialog(true);
              setSelectedVocabulary(row.original);
            }}
            className="cursor-pointer"
          >
            <TrashIcon size={22} />
          </button>
        </div>
      );
    },
    [setOpenDeleteVocabularyDialog, setSelectedVocabulary],
  );

  const translateCol: any[] = Object.entries(TranslateLanguages).flatMap(([key, lang]) => {
    return [
      {
      header: (props: { column: any }) => (
        <SortableHeader
          column={props.column}
          title={t(`vocabularies.table.meaning_${lang}`)}
          onSortChange={(orderDirection: any) =>
            handleSort(VocabularyOrderBy[`MEANING_${key}` as keyof typeof VocabularyOrderBy], orderDirection)
          }
          disabled={isSorting}
        />
      ),
      accessorKey: `meaning_${lang}`,
      enableSorting: true,
      cell: meaningCell(lang),
      size: 200,
    },
    {
      header: t(`vocabularies.table.description_${lang}`),
      accessorKey: `description_${lang}`,
      enableSorting: true,
      cell: descriptionCell(lang),
      size: 200,
    },
    ]
  });


  const customTableCol: any = [
          {
        header: t('common.number'),
        accessorKey: 'index',
        cell: (props: any) =>
          NumberCell({
            ...props,
            page: vocabularyGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: vocabularyGetListQuery.limit,
          }),
        size: 50,
      },
      {
        header: (props: { column: any }) => (
          <SortableHeader column={props.column} title={t('vocabularies.table.vocabulary') } 
            onSortChange={ (orderDirection) => handleSort(VocabularyOrderBy.VOCABULARY, orderDirection)}
            disabled={isSorting}
          />
        ),
        accessorKey: 'vocabulary',
        cell: vocabularyCell,
        size: 200,
      },
      {
        header: (props: { column: any }) => (
          <SortableHeader column={props.column} title={t('vocabularies.table.pronunciation') } 
            onSortChange={ (orderDirection) => handleSort(VocabularyOrderBy.PRONUNCIATION, orderDirection)}
            disabled={isSorting}
          />
        ),
        accessorKey: 'pronunciation',
        enableSorting: true,
        cell: pronunciationCell,
        size: 200,
      },
      ...translateCol,
  ] 

  const columns: ColumnDef<IVocabulary>[] = useMemo(() => {
    return compact([
      ...customTableCol,
      {
        header: t('vocabularies.table.subject'),
        accessorKey: 'subject',
        enableSorting: true,
        cell: subjectCell,
        size: 150,
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
        size: 80,
        cell: VocabularyActions,
      },
    ]);
  }, [
    t,
    isSorting,
    customTableCol,
    vocabularyCell,
    descriptionCell,
    subjectCell,
    VocabularyActions,
    handleSort,
    imageCell,
    pronunciationCell,
    meaningCell,
  ]);

  return <DataTable 
    columns={columns} 
    data={vocabularyList} 
    loading={loading} 
    rowClassName={'h-16'} 
    headerClassName={'bg-[#FBFDFF]'}
    // columnPinning={{right: ['actions']}}
  />;
}
