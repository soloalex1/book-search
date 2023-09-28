import { SearchFilters } from "../../types";

export type FilterProps = {
  mainTitle: string;
  filters: SearchFilters;
  dispatch: (label: string, value: unknown) => void;
  hasSelectedFilters: boolean;
  resetFilters: () => void;
};

export type FilterContentProps = {
  priceLabels: PriceFilter;
  availableLabels: AvailableFilter;
  formatLabels: FormatFilter;
};

export type PriceFilter = {
  title: string;
  items: {
    id: number;
    label: string;
    checked: boolean;
    rangeValue: {
      min?: number;
      max?: number;
    };
  }[];
};

export type AvailableFilter = {
  title: string;
  checked: boolean;
};

export type FormatFilter = {
  title: string;
  items: {
    label: string;
    checked: boolean;
  }[];
};
