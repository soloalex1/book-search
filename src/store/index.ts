import { create } from "zustand";

import { VolumeData } from "../types";

interface BookStore {
  volumes: VolumeData[];
  suggestions: VolumeData[];
  currentVolume: VolumeData;
  currentPage: number;
  filters: unknown;

  setVolumes(volumes: VolumeData[]): void;
  setSuggestions(suggestions: VolumeData[]): void;
  setCurrentVolume(volume: VolumeData): void;
  setCurrentPage(page: number): void;
  setFilters(filters: unknown): void;
}

const useStore = create<BookStore>()((set) => ({
  volumes: [],
  suggestions: [],
  currentVolume: <VolumeData>{},
  currentPage: 1,
  filters: {},

  setVolumes: (volumes) => set((state) => ({ ...state, volumes })),

  setSuggestions: (suggestions) => set((state) => ({ ...state, suggestions })),

  setCurrentVolume: (currentVolume) =>
    set((state) => ({ ...state, currentVolume })),

  setCurrentPage: (page: number) =>
    set((state) => ({ ...state, currentPage: page })),

  setFilters: (filters) => set((state) => ({ ...state, filters })),
}));

export default useStore;
