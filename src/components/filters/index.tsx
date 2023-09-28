import React, { ChangeEvent } from "react";
import * as S from "./styles";

import { FilterProps } from "./types";
import filtersWithInitialState from "./constants";

import useStore from "../../store";

const Filter: React.FC<FilterProps> = ({
  mainTitle,
  hasSelectedFilters,
  dispatch,
}) => {
  const { priceLabels, formatLabels, availableLabels } =
    filtersWithInitialState;

  const {
    filters: { price, availableFormats, availableItems },
    resetFilters,
  } = useStore((state) => state);

  const handleToggleCheckbox = () => {
    console.log("click");
  };

  const onChangeFormatFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(target.name, target.checked);
  };

  const onChangeAvailabilityFilter = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    dispatch(target.name, target.checked);
  };

  const renderPriceFilters = (
    <S.FilterContent>
      <ul>
        {priceLabels.items.map((option) => (
          <li key={option.id}>
            <input
              name="price"
              type="radio"
              checked={option.checked}
              onChange={() => handleToggleCheckbox()}
            />
            <span>{option.label}</span>
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
              checked={option.checked}
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
      <S.ContentTitle>{mainTitle}</S.ContentTitle>
      {hasSelectedFilters && (
        <S.Button onClick={resetFilters}>Limpar Filtros</S.Button>
      )}

      <S.FilterTitle>{priceLabels.title}</S.FilterTitle>
      {renderPriceFilters}

      <S.FilterTitle>{formatLabels.title}</S.FilterTitle>
      {renderFormatFilters}

      <S.FilterContent>
        <input
          id="availableItems"
          type="checkbox"
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
