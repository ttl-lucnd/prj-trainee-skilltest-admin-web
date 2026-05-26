import { DEFAULT_GET_LIST_QUERY } from '@/utils/constants';
import { create } from 'zustand';
import { packageService } from '../services/package.service';
import { IPackage } from '../interfaces';
import { ICommonListQuery } from '@/utils/interfaces';

// State types
interface States {
    isOpenPackageFormDialog: boolean;
    isOpenDeletePackageDialog: boolean;
    isOpenPackageMessageDialog: boolean;
    packageGetListQuery: ICommonListQuery & { subjectId?: string };
    totalItems: number;
    packageList: IPackage[];
    loading: boolean;
    selectedPackage: IPackage | null;
}

// Action types
interface Actions {
    setOpenPackageFormDialog: (open: boolean) => void;
    setOpenDeletePackageDialog: (open: boolean) => void;
    setOpenPackageMessageDialog: (open: boolean) => void;
    setPackageGetListQuery: (
        query: ICommonListQuery & { subjectId?: string },
        opt?: { reloadList?: boolean },
    ) => void;
    setLoading: (loading: boolean) => void;
    setPackageList: (packageList: IPackage[]) => void;
    setTotalItems: (totalItems: number) => void;
    getPackageList: () => Promise<void>;
    setSelectedPackage: (subscriptionPackage: IPackage | null) => void;
    resetState: () => void;
}

const initialState: States = {
    isOpenPackageFormDialog: false,
    isOpenDeletePackageDialog: false,
    isOpenPackageMessageDialog: false,
    packageGetListQuery: {
        ...DEFAULT_GET_LIST_QUERY,
    },
    totalItems: 0,
    packageList: [],
    loading: false,
    selectedPackage: null,
};

// usePackageStore
export const usePackageStore = create<States & Actions>((set, get) => ({
    // States
    ...initialState,
    // Actions
    setOpenPackageFormDialog: (open: boolean) => set({ isOpenPackageFormDialog: open }),
    setOpenDeletePackageDialog: (open: boolean) => set({ isOpenDeletePackageDialog: open }),
    setOpenPackageMessageDialog: (open: boolean) => set({ isOpenPackageMessageDialog: open }),
    setPackageGetListQuery: (query: ICommonListQuery & { subjectId?: string }, opt?: { reloadList?: boolean }) => {
        set((state) => ({
            packageGetListQuery: { ...state.packageGetListQuery, ...query },
        }));
        const { reloadList = true } = opt ?? {};

        if (reloadList) {
            get().getPackageList();
        }
    },
    setLoading: (loading: boolean) => set({ loading }),
    setPackageList: (packageList: IPackage[]) => set({ packageList }),
    setTotalItems: (totalItems: number) => set({ totalItems }),
    getPackageList: async () => {
        try {
            set(() => ({ loading: true }));
            const response = await packageService.getPackageList(get().packageGetListQuery);
            set(() => ({
                packageList: response?.data?.items ?? [],
                totalItems: response?.data?.totalItems ?? 0,
            }));
        } catch {
            set(() => ({ loading: false }));
        } finally {
            set(() => ({ loading: false }));
        }
    },
    setSelectedPackage: (subscriptionPackage: IPackage | null) => set({ selectedPackage: subscriptionPackage }),
    resetState: () => set({ ...initialState }),
}));
