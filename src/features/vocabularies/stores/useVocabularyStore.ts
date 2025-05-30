import { DEFAULT_GET_LIST_QUERY, OrderDirection } from '@/utils/constants';
import { create } from 'zustand';
import { IVocabulary, IVocabularyGetListQuery, IVocabularySetting, VocabularyOrderBy } from '../interfaces';
import { vocabularyService } from '../services/vocabulary.service';
import { ISubjectDropdown } from '@/features/common/interface';
import { commonService } from '@/features/common/service/dropdown.service';

// State types
interface States {
  isOpenSettingFormDialog: boolean;
  isOpenDeleteVocabularyDialog: boolean;
  isOpenImageDetail: boolean;
  isOpenSyncDataDialog: boolean;
  vocabularyGetListQuery: IVocabularyGetListQuery;
  totalItems: number;
  vocabularyList: IVocabulary[];
  loading: boolean;
  subjectDropdownList: ISubjectDropdown[];
  selectedVocabulary: IVocabulary | null;
  vocabularySetting: IVocabularySetting | null;
}

// Action types
interface Actions {
  setOpenSettingFormDialog: (open: boolean) => void;
  setOpenDeleteVocabularyDialog: (open: boolean) => void;
  setOpenSyncDataDialog: (open: boolean) => void;
  setOpenImageDetail: (open: boolean) => void;
  setVocabularyGetListQuery: (
    query: IVocabularyGetListQuery,
    opt?: { reloadList?: boolean },
  ) => void;
  setLoading: (loading: boolean) => void;
  setVocabularyList: (vocabularyList: IVocabulary[]) => void;
  setTotalItems: (totalItems: number) => void;
  getVocabularyList: () => Promise<void>;
  getSubjectDropdown: () => Promise<void>;

  setSubjectDropdownList: (subjectDropdownList?: ISubjectDropdown[]) => void;
  setSelectedVocabulary: (admin: IVocabulary | null) => void;
  getVocabularySetting: () => Promise<void>;
  resetState: () => void;
}

const initialState: States = {
  isOpenSettingFormDialog: false,
  isOpenDeleteVocabularyDialog: false,
  isOpenImageDetail: false,
  isOpenSyncDataDialog: false,
  vocabularyGetListQuery: {
    ...DEFAULT_GET_LIST_QUERY,
    orderBy: VocabularyOrderBy.VOCABULARY,
    orderDirection: OrderDirection.ASC,
  },
  totalItems: 0,
  vocabularyList: [],
  loading: false,
  subjectDropdownList: [],
  selectedVocabulary: null,
  vocabularySetting: null,
};

// useAdminStore
export const useVocabularyStore = create<States & Actions>((set, get) => ({
  // States
  ...initialState,
  // Actions
  setOpenSettingFormDialog: (open: boolean) => set({ isOpenSettingFormDialog: open }),
  setOpenDeleteVocabularyDialog: (open: boolean) => set({ isOpenDeleteVocabularyDialog: open }),
  setOpenSyncDataDialog: (open: boolean) => set({ isOpenSyncDataDialog: open }),
  setOpenImageDetail: (open: boolean) => set({ isOpenImageDetail: open }),
  setVocabularyGetListQuery: (query: IVocabularyGetListQuery, opt?: { reloadList?: boolean }) => {
    set((state) => ({
      vocabularyGetListQuery: { ...state.vocabularyGetListQuery, ...query },
    }));
    const { reloadList = true } = opt ?? {};

    if (reloadList) {
      get().getVocabularyList();
    }
  },
  setLoading: (loading: boolean) => set({ loading }),
  setVocabularyList: (vocabularyList: IVocabulary[]) => set({ vocabularyList }),
  setTotalItems: (totalItems: number) => set({ totalItems }),
  getVocabularyList: async () => {
    try {
      set(() => ({ loading: true }));
      const response = await vocabularyService.getVocabularyList(get().vocabularyGetListQuery);
      set(() => ({
        vocabularyList: response?.data?.items ?? [],
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

  setSubjectDropdownList: (subjectDropdownList: ISubjectDropdown[] = []) => set({ subjectDropdownList }),
  setSelectedVocabulary: (selectedVocabulary: IVocabulary | null) => set({ selectedVocabulary }),
  getVocabularySetting: async () => {
    const response = await vocabularyService.getVocabularySetting();
    set(() => ({
      vocabularySetting: response?.data ?? null,
    }));
  },
  resetState: () => set({ ...initialState }),
}));
