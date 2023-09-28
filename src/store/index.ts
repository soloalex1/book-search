import { create } from "zustand";

import { VolumeData } from "../types";
import { FilterContentProps } from "../components/filters/types";

interface BookStore {
  isLoading: boolean;
  volumes: VolumeData[];
  suggestions: VolumeData[];
  currentVolume: VolumeData;
  currentPage: number;
  filters: FilterContentProps;
  shelves: {
    action: VolumeData[];
    adventure: VolumeData[];
    fiction: VolumeData[];
  };

  setLoading(loading: boolean): void;
  setVolumes(volumes: VolumeData[]): void;
  setSuggestions(suggestions: VolumeData[]): void;
  setCurrentVolume(volume: VolumeData): void;
  setCurrentPage(page: number): void;
  setFilters(filters: Partial<FilterContentProps>): void;
  setShelf(shelf: keyof BookStore["shelves"], volumes: VolumeData[]): void;
}

const useStore = create<BookStore>()((set) => ({
  isLoading: false,
  volumes: [],
  suggestions: [],
  currentVolume: <VolumeData>{},
  currentPage: 1,
  filters: <FilterContentProps>{},
  shelves: {
    action: [],
    adventure: [],
    fiction: [],
  },

  setLoading: (loading) => set(() => ({ isLoading: loading })),

  setVolumes: (volumes) => set(() => ({ volumes })),

  setSuggestions: (suggestions) => set(() => ({ suggestions })),

  setCurrentVolume: (currentVolume) => set(() => ({ currentVolume })),

  setCurrentPage: (page: number) => set(() => ({ currentPage: page })),

  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        filters,
      },
    })),

  setShelf: (shelf, volumes) =>
    set((state) => ({
      shelves: {
        ...state.shelves,
        [shelf]: volumes,
      },
    })),
}));

export default useStore;
