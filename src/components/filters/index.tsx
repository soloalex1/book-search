import React, { useMemo, ChangeEvent } from "react";

import filtersWithInitialState from "./constants";

import useStore from "../../store";

import * as S from "./styles";

const Filter: React.FC = () => {
  const { priceLabels, formatLabels, availableLabels } =
    filtersWithInitialState;

  const { filters, setAvailabilityFilters, setPriceFilters, resetFilters } =
    useStore((state) => state);

  const { price, availableFormats, availableItems } = filters;

  const hasFilters = useMemo(() => {
    return filters.availableItems;
  }, [filters]);

  const onChangePriceFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const priceMapped = priceLabels.items.find(
      ({ id }) => id === Number(target.value)
    );

    setPriceFilters({ id: priceMapped?.id, ...priceMapped?.rangeValue! });
  };

  const onChangeFormatFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const action = {
      label: target.name,
      value: target.checked ? target.name : "",
    };
    console.log(action);
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
              checked={id === filters.price?.id}
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
        {formatLabels.items.map((option, index) => (
          <li key={index}>
            <input
              name={option.label.toLowerCase()}
              type="checkbox"
              checked={false}
              onChange={onChangeFormatFilter}
            />
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </S.FilterContent>
  );

  return (
    <S.Content>
      <S.ContentTitle>Filtrar resultados</S.ContentTitle>
      {hasFilters && <S.Button onClick={resetFilters}>Limpar Filtros</S.Button>}

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
