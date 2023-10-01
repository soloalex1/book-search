import React, { useState, useEffect, ChangeEvent } from "react";
import { SidePane } from "react-side-pane";

import { ReactComponent as FilterIcon } from "@/assets/filter-icon.svg";

import useStore from "@/store";
import { Format } from "@/types";

import filtersWithInitialState from "./constants";
import * as S from "./styles";

const Filter: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 768);
    setVisible(false);
  };

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
        {priceLabels.items.map(({ id, label }, index) => (
          <li key={id}>
            <input
              name="price"
              id={`price-${index}`}
              type="radio"
              checked={id === price?.id}
              onChange={onChangePriceFilter}
              value={id}
            />
            <label htmlFor={`price-${index}`}>{label}</label>
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
              id={slug}
              type="checkbox"
              checked={availableFormats[slug as keyof Format]}
              onChange={onChangeFormatFilter}
            />
            <label htmlFor={slug}>{label}</label>
          </li>
        ))}
      </ul>
    </S.FilterContent>
  );

  const renderFilterWrapper = (Component: JSX.Element): JSX.Element => {
    if (isDesktop) {
      return Component;
    }

    return (
      <SidePane open={visible} width={50} onClose={() => setVisible(false)}>
        {Component}
      </SidePane>
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <S.ButtonContainer>
        <button onClick={() => setVisible(true)}>
          <FilterIcon />
          <span>Filtros</span>
        </button>
      </S.ButtonContainer>
      {renderFilterWrapper(
        <S.FiltersContainer>
          <S.ContentTitle>Filtrar resultados</S.ContentTitle>

          <S.FilterLabel>{priceLabels.title}</S.FilterLabel>
          {renderPriceFilters}

          <S.Separator />

          <S.FilterLabel>{formatLabels.title}</S.FilterLabel>
          {renderFormatFilters}

          <S.Separator />

          <S.FilterLabel>{availableLabels.title}</S.FilterLabel>
          <S.FilterContent>
            <ul>
              <li>
                <input
                  type="checkbox"
                  id="availableItems"
                  name="availableItems"
                  checked={availableItems}
                  onChange={onChangeAvailabilityFilter}
                />

                <label htmlFor="availableItems">
                  {availableLabels.description}
                </label>
              </li>
            </ul>
          </S.FilterContent>
          <S.Separator />

          {!areFiltersEmpty() && (
            <S.ResetButton onClick={resetFilters}>Limpar filtros</S.ResetButton>
          )}
        </S.FiltersContainer>
      )}
    </>
  );
};

export default Filter;
