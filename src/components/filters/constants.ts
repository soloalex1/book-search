import { FilterContentProps } from "./types";

const filtersWithInitialState: FilterContentProps = {
  priceLabels: {
    title: "Preço",
    items: [
      {
        id: 1,
        label: "de R$0 até R$30",
        rangeValue: {
          max: 30,
        },
      },
      {
        id: 2,
        label: "de R$31 até R$50",
        rangeValue: {
          min: 31,
          max: 50,
        },
      },
      {
        id: 3,
        label: "de R$51 até R$100",
        rangeValue: {
          min: 51,
          max: 100,
        },
      },
      {
        id: 4,
        label: "Mais de R$100",
        rangeValue: {
          min: 100,
        },
      },
    ],
  },
  availableLabels: {
    title: "Somente volumes disponíveis",
    checked: true,
  },
  formatLabels: {
    title: "Formatos disponíveis",
    items: [
      {
        label: "PDF",
        slug: "pdf",
      },
      {
        label: "ePUB",
        slug: "epub",
      },
    ],
  },
};

export default filtersWithInitialState;
