export type FilterProps = {
  mainTitle: string;
  filters: FilterContentProps;
  dispatch: React.Dispatch<React.SetStateAction<boolean>>;
  hasSelectedFilters: boolean;
  resetFilters: () => void;
};

export type FilterContentProps = {
  price: PriceFilter;
  availableItems: AvailableFilter;
  availableFormats: FormatFilter;
};

type PriceFilter = {
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

type AvailableFilter = {
  title: string;
  checked: boolean;
};

type FormatFilter = {
  title: string;
  items: {
    label: string;
    checked: boolean;
  }[];
};
