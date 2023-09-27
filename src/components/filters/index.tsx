import React from "react";
import {
  Content,
  ContentTitle,
  Button,
  FilterTitle,
  FilterContent,
} from "./styles";
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
    <FilterContent>
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
    </FilterContent>
  );

  const renderFormatFilters = (
    <FilterContent>
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
    </FilterContent>
  );

  return (
    <Content>
      <ContentTitle>{mainTitle}</ContentTitle>
      {hasSelectedFilters && (
        <Button onClick={resetFilters}>Limpar Filtro</Button>
      )}

      <FilterTitle>{price.title}</FilterTitle>
      {renderPriceFilters}

      <FilterTitle>{availableFormats.title}</FilterTitle>
      {renderFormatFilters}

      <FilterTitle>{availableItems.title}</FilterTitle>
      <FilterContent>
        <input
          type="checkbox"
          name="availableItems"
          checked={availableItems.checked}
        />
      </FilterContent>
    </Content>
  );
};

export default Filter;
