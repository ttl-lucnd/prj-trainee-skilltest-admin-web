import { DEFAULT_GET_LIST_QUERY } from '@/utils/constants';
import { create } from 'zustand';
import { ISaleDetail } from '../interfaces';
import { ICommonListQuery } from '@/utils/interfaces';
import { subscriptionService } from '../services/subscription.service';

// State types
interface States {
  saleDetailGetListQuery: ICommonListQuery & { subjectId?: string };
  totalItems: number;
  saleDetailList: ISaleDetail[];
  loading: boolean;
}

// Action types
interface Actions {
  setSaleDetailGetListQuery: (
    query: ICommonListQuery & { subjectId?: string },
    opt?: { reloadList?: boolean },
  ) => void;
  setLoading: (loading: boolean) => void;
  setSaleDetailList: (saleDetailList: ISaleDetail[]) => void;
  setTotalItems: (totalItems: number) => void;
  getSaleDetailList: () => Promise<void>;
  resetState: () => void;
}

const initialState: States = {
  saleDetailGetListQuery: {
    ...DEFAULT_GET_LIST_QUERY,
  },
  totalItems: 0,
  saleDetailList: [],
  loading: false,
};

// useSaleDetailStore
export const useSaleDetailStore = create<States & Actions>((set, get) => ({
  // States
  ...initialState,
  // Actions
  setSaleDetailGetListQuery: (query: ICommonListQuery & { subjectId?: string }, opt?: { reloadList?: boolean }) => {
    set((state) => ({
      saleDetailGetListQuery: { ...state.saleDetailGetListQuery, ...query },
    }));
    const { reloadList = true } = opt ?? {};

    if (reloadList) {
      get().getSaleDetailList();
    }
  },
  setLoading: (loading: boolean) => set({ loading }),
  setSaleDetailList: (saleDetailList: ISaleDetail[]) => set({ saleDetailList }),
  setTotalItems: (totalItems: number) => set({ totalItems }),
  getSaleDetailList: async () => {
    try {
      set(() => ({ loading: true }));
      const { subjectId, ...query } = get().saleDetailGetListQuery;
      const response = await subscriptionService.getSaleDetailList(String(subjectId), query);
      set(() => ({
        saleDetailList: response?.data?.items ?? [],
        totalItems: response?.data?.totalItems ?? 0,
      }));
    } catch {
      set(() => ({ loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  resetState: () => set({ ...initialState }),
}));
