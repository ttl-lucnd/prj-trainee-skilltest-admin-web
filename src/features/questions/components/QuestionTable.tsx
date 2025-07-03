import { TruncatedText } from '@/components/TruncateText';
import { DataTable } from '@/components/data-table';
import { PencilIcon, TrashIcon } from '@/components/icons';
import { NumberCell } from '@/components/table/NumberCell';
import { DEFAULT_FIRST_PAGE, OrderBy, OrderDirection } from '@/utils/constants';
import { CellContext, ColumnDef, ColumnSort, HeaderContext, SortingState } from '@tanstack/react-table';
import { compact } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { IQuestion } from '../interfaces';
import { useQuestionStore } from '../stores/useQuestionStore';
import { SortableHeader } from '@/components/table/SortableHeader';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { CircleIcon } from '@/components/icons/circle';
import { XCrossIcon } from '@/components/icons/x-cross';
import { useUpdateUrlWithQuery } from '@/utils/url';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { SYNC_DATA_STATUS } from '@/features/common/constants';

export function QuestionTable() {
  const t = useTranslations();
  const {
    questionSetting,
    questionList,
    loading,
    questionGetListQuery,
    selectedQuestionIds,
    getQuestionList,
    resetState,
    setOpenDeleteQuestionDialog,
    setSelectedQuestion,
    setOpenImageDetail,
    setQuestionGetListQuery,
    setOpenQuestionFormDialog,
    setSelectedQuestionIds,
  } = useQuestionStore(
    useShallow((state) => ({
      questionSetting: state.questionSetting,
      questionList: state.questionList,
      loading: state.loading,
      questionGetListQuery: state.questionGetListQuery,
      selectedQuestionIds: state.selectedQuestionIds,
      getQuestionList: state.getQuestionList,
      resetState: state.resetState,
      setOpenDeleteQuestionDialog: state.setOpenDeleteQuestionDialog,
      setSelectedQuestion: state.setSelectedQuestion,
      setOpenImageDetail: state.setOpenImageDetail,
      setQuestionGetListQuery: state.setQuestionGetListQuery,
      setOpenQuestionFormDialog: state.setOpenQuestionFormDialog,
      setSelectedQuestionIds: state.setSelectedQuestionIds,
    })),
  );

  const [sorting, setSorting] = useState<SortingState>([{id: 'arrange', desc: false}])
  const isDisable = useMemo(() => questionSetting?.status === SYNC_DATA_STATUS.PENDING, [questionSetting]);

  const {
    getQueryFromUrl: getQuestionQueryFromUrl,
    updateUrlWithQuery: updateQuestionUrlWithQuery,
  } = useUpdateUrlWithQuery();

  useEffect(() => {
    const query = getQuestionQueryFromUrl();
    setSorting([{
      id: query?.orderBy as string ?? 'arrange', 
      desc: query?.orderDirection === OrderDirection.DESC
    }])
    getQuestionList();
    return () => {
      resetState();
    };
  }, []);

    const handleSortingChange = useCallback(
    (sort?: ColumnSort) => {
      const newQuery = {
        orderBy: sort?.id ?? OrderBy.CREATED_AT,
        orderDirection: sort?.desc ? OrderDirection.DESC : OrderDirection.ASC,
      };

      setQuestionGetListQuery({
        ...questionGetListQuery,
        ...newQuery,
      }, { reloadList: true });
      updateQuestionUrlWithQuery(newQuery);
    },
    [questionGetListQuery, setQuestionGetListQuery, updateQuestionUrlWithQuery],
  );

  const questionCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return <TruncatedText text={row.original?.question ?? ''} />;
    },
    [],
  );

  const descriptionCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return <TruncatedText text={row.original?.description ?? ''} />;
    },
    [],
  );

  const subjectCell = useCallback(
    ({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
      return (
        <TruncatedText text={row.original?.subject?.name ?? ''}/>
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
    [setOpenImageDetail, setSelectedQuestion],
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
            onClick={() => {
              setOpenQuestionFormDialog(true);
              setSelectedQuestion(row.original);
            }}
          className={cn(
              !isDisable && 'hover:bg-primary-2',
              "flex size-[30px] rounded-full items-center justify-center group/edit"
            )}
          >
            <PencilIcon size={22}
              className={cn(
                isDisable ? 'text-[#CECECE]'
                : 'cursor-pointer group-hover/edit:text-white')
              }
            />
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenDeleteQuestionDialog(true);
              setSelectedQuestion(row.original);
            }}
            className={cn(
              !isDisable && 'hover:bg-destructive',
              "flex cursor-pointer size-[30px] rounded-full items-center justify-center group/delete"
            )}
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
    [isDisable, setOpenDeleteQuestionDialog, setOpenQuestionFormDialog, setSelectedQuestion],
  );

  const SelectCell = useCallback(({ row }: Readonly<CellContext<IQuestion, unknown>>) => {
    return (
      <div className="flex gap-4">
      <Checkbox
        disabled={isDisable}
        checked={selectedQuestionIds.includes(row.original.id)}
        onCheckedChange={(value) => {
          if (value) {
            const newSelectedQuestionIds = [
              ...selectedQuestionIds,
              row.original.id,
            ];
            setSelectedQuestionIds(newSelectedQuestionIds);
          } else {
            const newSelectedQuestionIds = selectedQuestionIds.filter(
              (id) => id !== row.original.id,
            );
            setSelectedQuestionIds(newSelectedQuestionIds);
          }
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
      </div>
    );
  },[isDisable, selectedQuestionIds, setSelectedQuestionIds])

    const SelectHeader = useCallback(({ table }: HeaderContext<IQuestion, unknown>) => {
    return (
      <div className="flex gap-4">
      <Checkbox
        disabled={isDisable || questionList.length === 0}
        checked={selectedQuestionIds.length === questionList.length && selectedQuestionIds.length > 0}
        onCheckedChange={(value) => {
          if (value) {
            const newSelectedQuestionIds = questionList.map(item => item.id);
            setSelectedQuestionIds(newSelectedQuestionIds);
          } else {
            setSelectedQuestionIds([]);
          }
          table.toggleAllPageRowsSelected(!!value)
        }}
        aria-label="Select all"
      />
      </div>
    );
  },[isDisable, selectedQuestionIds, questionList, setSelectedQuestionIds])

  const columns: ColumnDef<IQuestion>[] = useMemo(() => {
    return compact([
      {
        id: 'select',
        header: SelectHeader,
        cell: SelectCell,
        size: 60,
      },
      {
        header: t('common.number'),
        accessorKey: 'index',
        cell: (props) =>
          NumberCell({
            ...props,
            page: questionGetListQuery.page ?? DEFAULT_FIRST_PAGE,
            limit: questionGetListQuery.limit,
          }),
        size: 80,
      },
      {
        header: t('questions.table.question'),
        accessorKey: 'question',
        cell: questionCell,
        size: 150,
      },
      {
        header: t('questions.table.description'),
        accessorKey: 'description',
        cell: descriptionCell,
        size: 180,
      },
      {
        header: t('questions.table.subject'),
        accessorKey: 'subject',
        cell: subjectCell,
        size: 150,
      },
      {
        enableSorting: true,
        header: ({ column }) => (
          <SortableHeader column={column} title={t('questions.table.arrange')} 
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
        size: 100,
      },
      {
        header: t('questions.table.answer'),
        accessorKey: 'answer',
        cell: answerCell,
        size: 100,
      },
      {
        header: t('questions.table.action'),
        id: 'actions',
        size: 120,
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
    SelectCell,
    SelectHeader,
  ]);

  return <DataTable 
    columns={columns} 
    data={questionList} 
    loading={loading} 
    rowClassName={'h-16'} 
    headerClassName={'bg-[#FBFDFF]'}
    onSortingChange={handleSortingChange}
    sorting={sorting}
    setSorting={setSorting}
    enableMultiRowSelection={true}
  />;
}
