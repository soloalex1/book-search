import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

import { SearchFilters, VolumeData, Price, Format } from "../types";

interface BookStore {
  query: string;
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

  setQuery(query: string): void;
  setLoading(isLoading: boolean): void;
  setVolumes(volumes: VolumeData[]): void;
  setSuggestions(suggestions: VolumeData[]): void;
  setCurrentVolume(volume: VolumeData): void;
  setCurrentPage(page: number): void;
  setPriceFilters(price: Price): void;
  setFormatFilters(label: keyof Format, value: boolean): void;
  setAvailabilityFilters(value: boolean): void;
  resetFilters(): void;
  setShelf(shelf: keyof BookStore["shelves"], volumes: VolumeData[]): void;
}

const initialState = {
  query: "",
  isLoading: false,
  volumes: [],
  suggestions: [],
  currentVolume: <VolumeData>{},
  currentPage: 1,
  filters: {
    price: {},
    availableFormats: {
      epub: false,
      pdf: false,
    },
    availableItems: false,
  },
  shelves: {
    action: [],
    adventure: [],
    fiction: [],
  },
};

const useStore = create<BookStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setQuery: (query) => set(() => ({ query })),

        setLoading: (isLoading) => set(() => ({ isLoading })),

        setVolumes: (volumes) => set(() => ({ volumes })),

        setSuggestions: (suggestions) => set(() => ({ suggestions })),

        setCurrentVolume: (currentVolume) => set(() => ({ currentVolume })),

        setCurrentPage: (page: number) => set(() => ({ currentPage: page })),

        setPriceFilters: (price: Price) =>
          set((state) => ({
            filters: {
              ...state.filters,
              price: {
                ...state.filters.price,
                ...price,
              },
            },
          })),

        setFormatFilters: (label, value) =>
          set((state) => ({
            filters: {
              ...state.filters,
              availableFormats: {
                ...state.filters.availableFormats,
                [label]: value,
              },
            },
          })),

        setAvailabilityFilters: (value) =>
          set((state) => ({
            filters: {
              ...state.filters,
              availableItems: value,
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
      }),
      {
        name: "booksStore",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useStore;
