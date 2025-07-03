import { DEFAULT_GET_LIST_QUERY, OrderDirection } from '@/utils/constants';
import { create } from 'zustand';
import { IQuestion, IQuestionGetListQuery } from '../interfaces';
import { questionService } from '../services/question.service';
import { ISubjectDropdown, ISyncSettingDetail } from '@/features/common/interface';
import { commonService } from '@/features/common/service/dropdown.service';

// State types
interface States {
  isOpenSettingFormDialog: boolean;
  isOpenDeleteQuestionDialog: boolean;
  isOpenImageDetail: boolean;
  isOpenSyncDataDialog: boolean;
  isOpenQuestionFormDialog: boolean;
  isOpenBulkDeleteDialog: boolean;
  questionGetListQuery: IQuestionGetListQuery;
  totalItems: number;
  questionList: IQuestion[];
  loading: boolean;
  subjectDropdownList: ISubjectDropdown[];
  arrangeDropdownList: number[];
  selectedQuestion: IQuestion | null;
  selectedQuestionIds: string[];
  questionSetting: ISyncSettingDetail | null;
}

// Action types
interface Actions {
  setOpenSettingFormDialog: (open: boolean) => void;
  setOpenDeleteQuestionDialog: (open: boolean) => void;
  setOpenImageDetail: (open: boolean) => void;
  setOpenSyncDataDialog: (open: boolean) => void;
  setOpenQuestionFormDialog: (open: boolean) => void;
  setOpenBulkDeleteDialog: (open: boolean) => void;
  setQuestionGetListQuery: (
    query: IQuestionGetListQuery,
    opt?: { reloadList?: boolean },
  ) => void;
  setLoading: (loading: boolean) => void;
  setQuestionList: (questionList: IQuestion[]) => void;
  setTotalItems: (totalItems: number) => void;
  getQuestionList: () => Promise<void>;
  getSubjectDropdown: () => Promise<void>;
  getArrangeDropdown: () => Promise<void>;

  setSubjectDropdownList: (subjectDropdownList?: ISubjectDropdown[]) => void;
  setArrangeDropdownList: (arrangeDropdownList?: number[]) => void;
  setSelectedQuestion: (admin: IQuestion | null) => void;
  getQuestionSetting: () => Promise<void>;
  resetState: () => void;
  setSelectedQuestionIds: (selectedQuestionIds: string[]) => void;
}

const initialState: States = {
  isOpenSettingFormDialog: false,
  isOpenDeleteQuestionDialog: false,
  isOpenImageDetail: false,
  isOpenSyncDataDialog: false,
  isOpenQuestionFormDialog: false,
  isOpenBulkDeleteDialog: false,
  questionGetListQuery: {
    ...DEFAULT_GET_LIST_QUERY,
    orderBy: 'arrange',
    orderDirection: OrderDirection.ASC,
  },
  totalItems: 0,
  questionList: [],
  loading: false,
  subjectDropdownList: [],
  arrangeDropdownList: [],
  selectedQuestion: null,
  questionSetting: null,
  selectedQuestionIds: [],
};

// useAdminStore
export const useQuestionStore = create<States & Actions>((set, get) => ({
  // States
  ...initialState,
  // Actions
  setOpenSettingFormDialog: (open: boolean) => set({ isOpenSettingFormDialog: open }),
  setOpenDeleteQuestionDialog: (open: boolean) => set({ isOpenDeleteQuestionDialog: open }),
  setOpenImageDetail: (open: boolean) => set({ isOpenImageDetail: open }),
  setOpenSyncDataDialog: (open: boolean) => set({ isOpenSyncDataDialog: open }),
  setOpenQuestionFormDialog: (open: boolean) => set({ isOpenQuestionFormDialog: open }),
  setOpenBulkDeleteDialog: (open: boolean) => set({ isOpenBulkDeleteDialog: open }),
  setQuestionGetListQuery: (query: IQuestionGetListQuery, opt?: { reloadList?: boolean }) => {
    set((state) => ({
      questionGetListQuery: { ...state.questionGetListQuery, ...query },
    }));
    const { reloadList = true } = opt ?? {};

    if (reloadList) {
      get().getQuestionList();
    }
  },
  setLoading: (loading: boolean) => set({ loading }),
  setQuestionList: (questionList: IQuestion[]) => set({ questionList }),
  setTotalItems: (totalItems: number) => set({ totalItems }),
  getQuestionList: async () => {
    try {
      set(() => ({ loading: true, selectedQuestionIds: [], }));
      const response = await questionService.getQuestionList(get().questionGetListQuery);
      set(() => ({
        questionList: response?.data?.items ?? [],
        totalItems: response?.data?.totalItems ?? 0,
      }));
    } catch {
      set(() => ({ loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  getSubjectDropdown: async () => {
    const response = await commonService.getSubjectDropdown();
    set(() => ({
      subjectDropdownList: response?.data?.items ?? [],
    }));
  },
  getArrangeDropdown: async () => {
    const response = await commonService.getArrangeDropdown();
    set(() => ({
      arrangeDropdownList: response?.data?.items ?? [],
    }));
  },
  setSubjectDropdownList: (subjectDropdownList: ISubjectDropdown[] = []) => set({ subjectDropdownList }),
  setArrangeDropdownList: (arrangeDropdownList: number[] = []) => set({ arrangeDropdownList }),
  setSelectedQuestion: (selectedQuestion: IQuestion | null) => set({ selectedQuestion }),
  getQuestionSetting: async () => {
    const response = await questionService.getQuestionSetting();
    set(() => ({
      questionSetting: response?.data ?? null,
    }));
  },
  resetState: () => set({ ...initialState }),
  setSelectedQuestionIds: (selectedQuestionIds: string[]) => set({ selectedQuestionIds }),
}));
