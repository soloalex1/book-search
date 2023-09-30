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
  description: string;
};

export type FormatFilter = {
  title: string;
  items: {
    label: string;
    slug: string;
  }[];
};
