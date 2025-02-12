import { create } from "zustand";

interface ICategoryStore {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const useCategory = create<ICategoryStore>((set) => ({
  currentIndex: 1,
  setCurrentIndex: (index) => set({ currentIndex: index }),
}));
