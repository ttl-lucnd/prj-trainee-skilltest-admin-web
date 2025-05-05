import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  bears: 0,
  removeAllBears: () => set({ bears: 0 }),
}));
