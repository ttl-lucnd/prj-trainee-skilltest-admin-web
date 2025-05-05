import { create } from 'zustand';

// State types
interface States {
  currentPath: string;
  previousPath: string;
}

// Action types
interface Actions {
  setCurrentPath: (path: string) => void;
  resetState: () => void;
}

const initialState: States = {
  currentPath: '',
  previousPath: '',
};

// useAdminStore
export const useGlobalStore = create<States & Actions>((set, get) => ({
  // States
  ...initialState,
  // Actions
  setCurrentPath: (path: string) => {
    const { currentPath } = get();
    set({ previousPath: currentPath });
    set({ currentPath: path });
  },
  resetState: () => set({ ...initialState }),
}));
