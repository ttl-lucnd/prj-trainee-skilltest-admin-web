import { DEFAULT_GET_LIST_QUERY } from '@/utils/constants';
import { create } from 'zustand';
import { subscriptionService } from '../services/subscription.service';
import { ISubscription } from '../interfaces';
import { ICommonListQuery } from '@/utils/interfaces';
import { ISubject } from '@/features/subjects/interfaces';

// State types
interface States {
  subscriptionGetListQuery: ICommonListQuery;
  totalItems: number;
  subscriptionList: ISubscription[];
  loading: boolean;
  selectedSubject: ISubject | null;
}

// Action types
interface Actions {
  setSubscriptionGetListQuery: (
    query: ICommonListQuery,
    opt?: { reloadList?: boolean },
  ) => void;
  setLoading: (loading: boolean) => void;
  setSubscriptionList: (subscriptionList: ISubscription[]) => void;
  setTotalItems: (totalItems: number) => void;
  getSubscriptionList: () => Promise<void>;
  resetState: () => void;
  setSelectedSubject: (subject: ISubject | null) => void;
}

const initialState: States = {
  subscriptionGetListQuery: {
    ...DEFAULT_GET_LIST_QUERY,
  },
  totalItems: 0,
  subscriptionList: [],
  loading: false,
  selectedSubject: null,
};

// useSubscriptionStore
export const useSubscriptionStore = create<States & Actions>((set, get) => ({
  // States
  ...initialState,
  // Actions
  setSubscriptionGetListQuery: (query: ICommonListQuery, opt?: { reloadList?: boolean }) => {
    set((state) => ({
      subscriptionGetListQuery: { ...state.subscriptionGetListQuery, ...query },
    }));
    const { reloadList = true } = opt ?? {};

    if (reloadList) {
      get().getSubscriptionList();
    }
  },
  setLoading: (loading: boolean) => set({ loading }),
  setSubscriptionList: (subscriptionList: ISubscription[]) => set({ subscriptionList }),
  setTotalItems: (totalItems: number) => set({ totalItems }),
  getSubscriptionList: async () => {
    try {
      set(() => ({ loading: true }));
      const response = await subscriptionService.getSubscriptionList(get().subscriptionGetListQuery);
      set(() => ({
        subscriptionList: response?.data?.items ?? [],
        totalItems: response?.data?.totalItems ?? 0,
      }));
    } catch {
      set(() => ({ loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  resetState: () => set({ ...initialState }),
  setSelectedSubject: (subject: ISubject | null) => set({ selectedSubject: subject }),
}));
