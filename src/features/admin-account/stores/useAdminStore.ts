import { DEFAULT_GET_LIST_QUERY } from '@/utils/constants';
import { create } from 'zustand';
import { adminService } from '../services/admin.service';
import { IAdminAccount } from '../interfaces';
import { ICommonListQuery } from '@/utils/interfaces';
import { authService } from '@/features/auth/services/auth.service';

// State types
interface States {
  profile: IAdminAccount | null;
  isOpenAdminFormDialog: boolean;
  isOpenDeleteAdminDialog: boolean;
  adminGetListQuery: ICommonListQuery;
  totalItems: number;
  adminList: IAdminAccount[];
  loading: boolean;
  selectedAdmin: IAdminAccount | null;
}

// Action types
interface Actions {
  getProfile: () => Promise<void>
  setOpenAdminFormDialog: (open: boolean) => void;
  setOpenDeleteAdminDialog: (open: boolean) => void;
  setAdminGetListQuery: (
    query: ICommonListQuery,
    opt?: { reloadList?: boolean },
  ) => void;
  setLoading: (loading: boolean) => void;
  setAdminList: (adminList: IAdminAccount[]) => void;
  setTotalItems: (totalItems: number) => void;
  getAdminList: () => Promise<void>;
  setSelectedAdmin: (admin: IAdminAccount | null) => void;
  resetState: () => void;
}

const initialState: States = {
  profile: null,
  isOpenAdminFormDialog: false,
  isOpenDeleteAdminDialog: false,
  adminGetListQuery: {
    ...DEFAULT_GET_LIST_QUERY,
    limit: 10,
  },
  totalItems: 0,
  adminList: [],
  loading: false,
  selectedAdmin: null,
};

// useAdminStore
export const useAdminStore = create<States & Actions>((set, get) => ({
  // States
  ...initialState,
  // Actions
  getProfile: async () => {
    try {
      const response = await authService.getProfile();
      set(() => ({
        profile: response?.data?.profile ?? null,
      }));
    } catch {
    }
  },
  setOpenAdminFormDialog: (open: boolean) => set({ isOpenAdminFormDialog: open }),
  setOpenDeleteAdminDialog: (open: boolean) => set({ isOpenDeleteAdminDialog: open }),
  setAdminGetListQuery: (query: ICommonListQuery, opt?: { reloadList?: boolean }) => {
    set((state) => ({
      adminGetListQuery: { ...state.adminGetListQuery, ...query },
    }));
    const { reloadList = true } = opt ?? {};

    if (reloadList) {
      get().getAdminList();
    }
  },
  setLoading: (loading: boolean) => set({ loading }),
  setAdminList: (adminList: IAdminAccount[]) => set({ adminList }),
  setTotalItems: (totalItems: number) => set({ totalItems }),
  getAdminList: async () => {
    try {
      set(() => ({ loading: true }));
      const response = await adminService.getAdminList(get().adminGetListQuery);
      set(() => ({
        adminList: response?.data?.items ?? [],
        totalItems: response?.data?.totalItems ?? 0,
      }));
    } catch {
      set(() => ({ loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  setSelectedAdmin: (admin: IAdminAccount | null) => set({ selectedAdmin: admin }),
  resetState: () => set({ ...initialState }),
}));
