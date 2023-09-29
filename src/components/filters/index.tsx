import React, { ChangeEvent } from "react";

import useStore from "@/store";
import { Format } from "@/types";

import filtersWithInitialState from "./constants";
import * as S from "./styles";

const Filter: React.FC = () => {
  const { priceLabels, formatLabels, availableLabels } =
    filtersWithInitialState;

  const {
    filters,
    areFiltersEmpty,
    setAvailabilityFilters,
    setPriceFilters,
    setFormatFilters,
    resetFilters,
  } = useStore((state) => state);

  const { price, availableFormats, availableItems } = filters;

  const onChangePriceFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const priceMapped = priceLabels.items.find(
      ({ id }) => id === Number(target.value)
    );

    setPriceFilters({ id: priceMapped?.id, ...priceMapped?.rangeValue! });
  };

  const onChangeFormatFilter = ({
    target: { name, checked },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormatFilters(name as keyof Format, checked);
  };

  const onChangeAvailabilityFilter = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    setAvailabilityFilters(target.checked);
  };

  const renderPriceFilters = (
    <S.FilterContent>
      <ul>
        {priceLabels.items.map(({ id, label }) => (
          <li key={id}>
            <input
              name="price"
              type="radio"
              checked={id === price?.id}
              onChange={onChangePriceFilter}
              value={id}
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </S.FilterContent>
  );

  const renderFormatFilters = (
    <S.FilterContent>
      <ul>
        {formatLabels.items.map(({ label, slug }, index) => (
          <li key={index}>
            <input
              name={slug}
              type="checkbox"
              checked={availableFormats[slug as keyof Format]}
              onChange={onChangeFormatFilter}
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </S.FilterContent>
  );

  return (
    <S.Content>
      <S.ContentTitle>Filtrar resultados</S.ContentTitle>
      {!areFiltersEmpty() && (
        <S.Button onClick={resetFilters}>Limpar Filtros</S.Button>
      )}

      <S.FilterTitle>{priceLabels.title}</S.FilterTitle>
      {renderPriceFilters}

      <S.FilterTitle>{formatLabels.title}</S.FilterTitle>
      {renderFormatFilters}

      <S.FilterContent>
        <input
          type="checkbox"
          id="availableItems"
          name="availableItems"
          checked={availableItems}
          onChange={onChangeAvailabilityFilter}
        />
        <label htmlFor="availableItems">{availableLabels.title}</label>
      </S.FilterContent>
    </S.Content>
  );
};

export default Filter;
