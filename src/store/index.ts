import { create } from "zustand";

import { SearchFilters, VolumeData } from "../types";
import { FilterContentProps } from "../components/filters/types";

interface BookStore {
  isLoading: boolean;
  volumes: VolumeData[];
  suggestions: VolumeData[];
  currentVolume: VolumeData;
  currentPage: number;
  filters: SearchFilters;
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
  setFilters(label: keyof BookStore["filters"], value: unknown): void;
  resetFilters(): void;
  setShelf(shelf: keyof BookStore["shelves"], volumes: VolumeData[]): void;
}

const initialState = {
  isLoading: false,
  volumes: [],
  suggestions: [],
  currentVolume: <VolumeData>{},
  currentPage: 1,
  filters: {
    price: {},
    availableFormats: [],
    availableItems: false,
  },
  shelves: {
    action: [],
    adventure: [],
    fiction: [],
  },
};

const useStore = create<BookStore>()((set) => ({
  ...initialState,

  setLoading: (loading) => set(() => ({ isLoading: loading })),

  setVolumes: (volumes) => set(() => ({ volumes })),

  setSuggestions: (suggestions) => set(() => ({ suggestions })),

  setCurrentVolume: (currentVolume) => set(() => ({ currentVolume })),

  setCurrentPage: (page: number) => set(() => ({ currentPage: page })),

  setFilters: (label, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [label]: value,
      },
    })),

  resetFilters: () => {
    set(() => ({
      filters: initialState.filters,
    }));
  },

  setShelf: (shelf, volumes) =>
    set((state) => ({
      shelves: {
        ...state.shelves,
        [shelf]: volumes,
      },
    })),
}));

export default useStore;
