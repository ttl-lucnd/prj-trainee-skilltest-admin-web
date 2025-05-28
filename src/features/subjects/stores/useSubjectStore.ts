import { DEFAULT_GET_LIST_QUERY } from '@/utils/constants';
import { create } from 'zustand';
import { subjectService } from '../services/subject.service';
import { ISubject } from '../interfaces';
import { ICommonListQuery } from '@/utils/interfaces';

// State types
interface States {
  isOpenSubjectFormDialog: boolean;
  isOpenDeleteSubjectDialog: boolean;
  isOpenImageDetail: boolean;
  subjectGetListQuery: ICommonListQuery;
  totalItems: number;
  subjectList: ISubject[];
  loading: boolean;
  selectedSubject: ISubject | null;
  selectedImage: string | null;
}

// Action types
interface Actions {
  setOpenSubjectFormDialog: (open: boolean) => void;
  setOpenDeleteSubjectDialog: (open: boolean) => void;
  setOpenImageDetail: (open: boolean) => void;
  setSubjectGetListQuery: (
    query: ICommonListQuery,
    opt?: { reloadList?: boolean },
  ) => void;
  setLoading: (loading: boolean) => void;
  setSubjectList: (subjectList: ISubject[]) => void;
  setTotalItems: (totalItems: number) => void;
  getSubjectList: () => Promise<void>;
  setSelectedSubject: (subject: ISubject | null) => void;
  setSelectedImage: (url: string | null) => void;
  resetState: () => void;
}

const initialState: States = {
  isOpenSubjectFormDialog: false,
  isOpenDeleteSubjectDialog: false,
  isOpenImageDetail: false,
  subjectGetListQuery: {
    ...DEFAULT_GET_LIST_QUERY,
  },
  totalItems: 0,
  subjectList: [],
  loading: false,
  selectedSubject: null,
  selectedImage: null
};

// useSubjectStore
export const useSubjectStore = create<States & Actions>((set, get) => ({
  // States
  ...initialState,
  // Actions
  setOpenSubjectFormDialog: (open: boolean) => set({ isOpenSubjectFormDialog: open }),
  setOpenDeleteSubjectDialog: (open: boolean) => set({ isOpenDeleteSubjectDialog: open }),
  setOpenImageDetail: (open: boolean) => set({ isOpenImageDetail: open }),
  setSubjectGetListQuery: (query: ICommonListQuery, opt?: { reloadList?: boolean }) => {
    set((state) => ({
      subjectGetListQuery: { ...state.subjectGetListQuery, ...query },
    }));
    const { reloadList = true } = opt ?? {};

    if (reloadList) {
      get().getSubjectList();
    }
  },
  setLoading: (loading: boolean) => set({ loading }),
  setSubjectList: (subjectList: ISubject[]) => set({ subjectList }),
  setTotalItems: (totalItems: number) => set({ totalItems }),
  getSubjectList: async () => {
    try {
      set(() => ({ loading: true }));
      const response = await subjectService.getSubjectList(get().subjectGetListQuery);
      set(() => ({
        subjectList: response?.data?.items ?? [],
        totalItems: response?.data?.totalItems ?? 0,
      }));
    } catch {
      set(() => ({ loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  setSelectedSubject: (subject: ISubject | null) => set({ selectedSubject: subject }),
  setSelectedImage: (url: string | null) => set({ selectedImage: url }),
  resetState: () => set({ ...initialState }),
}));
