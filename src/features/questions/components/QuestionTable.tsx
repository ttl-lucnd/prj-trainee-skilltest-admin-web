import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { TrashIcon } from '@/components/icons';
import { NumberCell } from '@/components/table/NumberCell';
import { DEFAULT_FIRST_PAGE, DEFAULT_ORDER_BY, DEFAULT_ORDER_DIRECTION } from '@/utils/constants';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { compact } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { IQuestion, IQuestionGetListQuery, QuestionOrderBy } from '../interfaces';
import { useQuestionStore } from '../stores/useQuestionStore';
import { SortableHeader } from '@/components/table/SortableHeader';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { CircleIcon } from '@/components/icons/circle';
import { XCrossIcon } from '@/components/icons/x-cross';
import { useUpdateUrlWithQuery } from '@/utils/url';

export function QuestionTable() {
  const t = useTranslations();
  const {
    questionList,
    loading,
    questionGetListQuery,
    getQuestionList,
    resetState,
    setOpenDeleteQuestionDialog,
    setSelectedQuestion,
    setOpenImageDetail,
    setQuestionGetListQuery,
  } = useQuestionStore(
    useShallow((state) => ({
      questionList: state.questionList,
      loading: state.loading,
      questionGetListQuery: state.questionGetListQuery,
      getQuestionList: state.getQuestionList,
      resetState: state.resetState,
      setOpenDeleteQuestionDialog: state.setOpenDeleteQuestionDialog,
      setSelectedQuestion: state.setSelectedQuestion,
      setOpenImageDetail: state.setOpenImageDetail,
      setQuestionGetListQuery: state.setQuestionGetListQuery,
    })),
  );

    const [isSorting, setIsSorting] = useState(false);

  const {
    getQueryFromUrl: getQuestionQueryFromUrl,
    updateUrlWithQuery: updateQuestionUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    getQuestionList();
    return () => {
      resetState();
    };
  }, []);

  const handleSort = async (data: IQuestionGetListQuery = {}) => {
    if(isSorting) return;
    try {
      setIsSorting(true);
      const query = getQuestionQueryFromUrl();
      const newQuery = {
        ...query,
        orderBy: DEFAULT_ORDER_BY,
        orderDirection: DEFAULT_ORDER_DIRECTION,
        ...data,
      }

      setQuestionGetListQuery(newQuery, { reloadList: false });
      updateQuestionUrlWithQuery(newQuery);
      await getQuestionList();
    } catch {
      setIsSorting(false);
    } finally {
      setIsSorting(false);
    }
  };

  const questionCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return <TruncatedText text={row.original.question} />;
    },
    [],
  );

  const descriptionCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return <TruncatedText text={row.original.description} />;
    },
    [],
  );

  const subjectCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return (
        <TruncatedText text={row.original.subject.name}/>
      );
    },
    [],
  );

  const arrangeCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return <TruncatedText text={`${row.original.arrange}`} />;
    },
    [],
  );

  const originalCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      if(row.original.original) {
        return <Badge variant={'success'}>True</Badge>
      }
        return <Badge variant={'error'}>False</Badge>
    },
    [],
  );

  const imageCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return row.original.image 
      ? 
        <div className="flex gap-4">
          <button
            type="button"
            className="w-[45px] h-[45px] border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={() => {
              setOpenImageDetail(true);
              setSelectedQuestion(row.original);
            }}
          >
              <Image 
            src={row.original.image}
            width={45}
            height={45}
            alt="question-image"
          />
          </button>
        </div>
      : <TruncatedText text={'---'} />;
    },
    [],
  );

  const answerCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return row.original.answer ? <CircleIcon size={16}/> : <XCrossIcon size={16}/>
    },
    [],
  );

  const QuestionActions = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setOpenDeleteQuestionDialog(true);
              setSelectedQuestion(row.original);
            }}
            className="cursor-pointer"
          >
            <TrashIcon size={22} />
          </button>
        </div>
      );
    },
    [setOpenDeleteQuestionDialog, setSelectedQuestion],
  );

  const columns: ColumnDef<IQuestion>[] = useMemo(() => {
    return compact([
      {
        header: t('common.number'),
        accessorKey: 'index',
        cell: (props) =>
          NumberCell({
            ...props,
            page: questionGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: questionGetListQuery.limit,
          }),
        size: 50,
      },
      {
        header: t('questions.table.question'),
        accessorKey: 'question',
        cell: questionCell,
        size: 180,
      },
      {
        header: t('questions.table.description'),
        accessorKey: 'description',
        cell: descriptionCell,
        size: 180,
      },
      {
        header: ({ column }) => (
          <SortableHeader column={column} title={t('questions.table.subject') } 
          onSortChange={ async (orderDirection) => {
            const query = orderDirection ? {
              orderBy: QuestionOrderBy.SUBJECT,
              orderDirection,
            }: {}
            await handleSort(query);
          }}
          />
        ),
        accessorKey: 'subject',
        enableSorting: true,
        cell: subjectCell,
        size: 180,
      },
      {
        enableSorting: true,
        header: ({ column }) => (
          <SortableHeader column={column} title={t('questions.table.arrange')} 
            onSortChange={ async (orderDirection) => {
            const query = orderDirection ? {
              orderBy: QuestionOrderBy.ARRANGE,
              orderDirection,
            }: {}
            await handleSort(query);
          }}
          />
        ),
        accessorKey: 'arrange',
        cell: arrangeCell,
        size: 100,
      },
      {
        header: t('questions.table.original'),
        accessorKey: 'original',
        cell: originalCell,
        size: 100,
      },
      {
        header: t('questions.table.image'),
        accessorKey: 'image',
        cell: imageCell,
        size: 80,
      },
      {
        header: t('questions.table.answer'),
        accessorKey: 'answer',
        cell: answerCell,
        size: 50,
      },
      {
        header: t('questions.table.action'),
        id: 'actions',
        size: 50,
        cell: QuestionActions,
      },
    ]);
  }, [
    t,
    questionCell,
    descriptionCell,
    subjectCell,
    arrangeCell,
    originalCell,
    imageCell,
    answerCell,
    QuestionActions,
  ]);

  return <DataTable 
    columns={columns} 
    data={questionList} 
    loading={loading} 
    rowClassName={'h-16'} 
    headerClassName={'bg-[#FBFDFF]'}
    customRowClassName={() => '!bg-white'}
  />;
}
