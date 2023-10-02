import { isEqual } from "lodash";
import { create } from "zustand";

import { devtools, persist, createJSONStorage } from "zustand/middleware";

import {
  SearchFilters,
  VolumeData,
  VolumeQuery,
  Price,
  Format,
} from "../types";

type BookStore = {
  query: string;
  isLoading: boolean;
  volumes: VolumeQuery;
  suggestions: VolumeData[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
  filters: SearchFilters;

  shelves: {
    action: VolumeData[];
    adventure: VolumeData[];
    fiction: VolumeData[];
  };

  setQuery(query: string): void;
  setLoading(isLoading: boolean): void;
  setVolumes(volumes: VolumeQuery, resetPage?: boolean): void;
  getFilteredVolumes(filters: (item: VolumeData) => boolean): VolumeData[];
  setSuggestions(suggestions: VolumeData[]): void;
  setCurrentPage(page: number): void;
  setItemsPerPage(items: number): void;
  setPriceFilters(price: Price): void;
  setFormatFilters(label: keyof Format, value: boolean): void;
  setAvailabilityFilters(value: boolean): void;
  hasPriceFilter(): boolean;
  hasFormatFilter(): boolean;
  areFiltersEmpty(): boolean;
  resetFilters(): void;
  setShelf(shelf: keyof BookStore["shelves"], volumes: VolumeData[]): void;
};

const initialState = {
  query: "",
  isLoading: false,
  volumes: {
    totalItems: 0,
    items: [],
  },
  filteredVolumes: [],
  suggestions: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 40,
  },
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
      (set, get) => ({
        ...initialState,

        setQuery: (query) => set(() => ({ query })),

        setLoading: (isLoading) => set(() => ({ isLoading })),

        setVolumes: (volumes, resetPage = false) =>
          set((state) => ({
            volumes,
            pagination: {
              ...state.pagination,
              currentPage: resetPage ? 1 : state.pagination.currentPage,
            },
          })),

        getFilteredVolumes: (filters) =>
          get().areFiltersEmpty()
            ? get().volumes.items
            : get().volumes.items.filter((item) => filters(item)),

        hasPriceFilter: () =>
          !isEqual(get().filters.price, initialState.filters.price),

        hasFormatFilter: () =>
          !isEqual(
            get().filters.availableFormats,
            initialState.filters.availableFormats
          ),

        areFiltersEmpty: () => isEqual(get().filters, initialState.filters),

        setSuggestions: (suggestions) => set(() => ({ suggestions })),

        setCurrentPage: (page: number) =>
          set((state) => ({
            pagination: { ...state.pagination, currentPage: page },
          })),

        setItemsPerPage: (itemsPerPage: number) =>
          set((state) => ({
            pagination: { ...state.pagination, itemsPerPage },
          })),

        setPriceFilters: (price: Price) =>
          set((state) => ({
            filters: {
              ...state.filters,
              price,
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
          set((state) => ({
            filters: initialState.filters,
            filteredVolumes: state.volumes.items,
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
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          query: state.query,
          shelves: state.shelves,
          volumes: state.volumes,
        }),
      }
    )
  )
);

export default useStore;
