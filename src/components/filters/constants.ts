import { FilterContentProps } from "./types";

const filtersWithInitialState: FilterContentProps = {
  price: {
    title: "Preço",
    items: [
      {
        id: 1,
        label: "de R$0 até R$30",
        checked: false,
        rangeValue: {
          max: 30,
        },
      },
      {
        id: 2,
        label: "de R$31 até R$50",
        checked: false,
        rangeValue: {
          min: 31,
          max: 50,
        },
      },
      {
        id: 3,
        label: "de R$51 até R$100",
        checked: false,
        rangeValue: {
          min: 51,
          max: 100,
        },
      },
      {
        id: 4,
        label: "Mais de R$100",
        checked: false,
        rangeValue: {
          min: 100,
        },
      },
    ],
  },
  availableItems: {
    title: "Disponível para venda?",
    checked: true,
  },
  availableFormats: {
    title: "Formatos disponíveis",
    items: [
      {
        label: "PDF",
        checked: false,
      },
      {
        label: "Epub",
        checked: false,
      },
    ],
  },
};

export default filtersWithInitialState;
