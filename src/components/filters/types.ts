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
    slug: string;
  }[];
};
