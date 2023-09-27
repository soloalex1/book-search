import React from "react";
import * as S from "./styles";

import { FilterProps } from "./types";
import filtersWithInitialState from "./constants";

const Filter: React.FC<FilterProps> = ({
  mainTitle,
  hasSelectedFilters,
  resetFilters,
}) => {
  const { price, availableFormats, availableItems } = filtersWithInitialState;

  const handleToggleCheckbox = () => {
    console.log("click");
  };

  const renderPriceFilters = (
    <S.FilterContent>
      <ul>
        {price.items.map((option) => (
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
        {availableFormats.items.map((option, index) => (
          <li key={index}>
            <input
              name={option.label}
              type="checkbox"
              checked={option.checked}
              onChange={() => handleToggleCheckbox()}
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

      <S.FilterTitle>{price.title}</S.FilterTitle>
      {renderPriceFilters}

      <S.FilterTitle>{availableFormats.title}</S.FilterTitle>
      {renderFormatFilters}

      <S.FilterContent>
        <input
          id="availableItems"
          type="checkbox"
          name="availableItems"
          checked={availableItems.checked}
        />
        <label htmlFor="availableItems">{availableItems.title}</label>
      </S.FilterContent>
    </S.Content>
  );
};

export default Filter;
