import { create } from "zustand";

import { VolumeData } from "../types";

interface BookStore {
  isLoading: boolean;
  volumes: VolumeData[];
  suggestions: VolumeData[];
  currentVolume: VolumeData;
  currentPage: number;
  filters: unknown;
  shelves: {
    action: VolumeData[];
    adventure: VolumeData[];
    fiction: VolumeData[];
  };

  setVolumes(volumes: VolumeData[]): void;
  setSuggestions(suggestions: VolumeData[]): void;
  setCurrentVolume(volume: VolumeData): void;
  setCurrentPage(page: number): void;
  setFilters(filters: unknown): void;
  setShelf(shelf: keyof BookStore["shelves"], volumes: VolumeData[]): void;
}

const useStore = create<BookStore>()((set) => ({
  isLoading: false,
  volumes: [],
  suggestions: [],
  currentVolume: <VolumeData>{},
  currentPage: 1,
  filters: {},
  shelves: {
    action: [],
    adventure: [],
    fiction: [],
  },

  setVolumes: (volumes) => set((state) => ({ ...state, volumes })),

  setSuggestions: (suggestions) => set((state) => ({ ...state, suggestions })),

  setCurrentVolume: (currentVolume) =>
    set((state) => ({ ...state, currentVolume })),

  setCurrentPage: (page: number) =>
    set((state) => ({ ...state, currentPage: page })),

  setFilters: (filters) => set((state) => ({ ...state, filters })),

  setShelf: (shelf, volumes) =>
    set((state) => ({
      ...state,
      shelves: {
        ...state.shelves,
        [shelf]: volumes,
      },
    })),
}));

export default useStore;
