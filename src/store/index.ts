import { create } from "zustand";

interface BookStore {
  volumes: unknown[];
  currentVolume: unknown;
  currentPage: number;
  filters: unknown;
  setVolumes(volumes: unknown[]): void;
  setCurrentVolume(volume: unknown): void;
  setCurrentPage(page: number): void;
  setFilters(filters: unknown): void;
}

const useStore = create<BookStore>()((set) => ({
  volumes: [],
  currentVolume: {},
  currentPage: 1,
  filters: {},
  setVolumes: (volumes) => set((state) => ({ ...state, volumes })),
  setCurrentVolume: (currentVolume) =>
    set((state) => ({ ...state, currentVolume })),
  setCurrentPage: (page: number) =>
    set((state) => ({ ...state, currentPage: page })),
  setFilters: (filters) => set((state) => ({ ...state, filters })),
}));

export default useStore;
