import React, { useState, ChangeEvent } from "react";

import useStore from "@/store";
import { Format } from "@/types";

import filtersWithInitialState from "./constants";
import * as S from "./styles";
import { SidePane } from "react-side-pane";

const Filter: React.FC = () => {
  const [visible, setVisible] = useState(false);

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

  const renderFilterWrapper = (Component: JSX.Element): JSX.Element => {
    if (window.innerWidth > 768) {
      return Component;
    }

    return (
      <SidePane open={visible} width={50} onClose={() => setVisible(false)}>
        {Component}
      </SidePane>
    );
  };

  return (
    <>
      <S.ButtonContainer>
        <S.Button onClick={() => setVisible(true)}>Filtrar resultados</S.Button>
      </S.ButtonContainer>
      {renderFilterWrapper(
        <S.FiltersContainer>
          <S.ContentTitle>Filtrar resultados</S.ContentTitle>

          {!areFiltersEmpty() && (
            <S.Button onClick={resetFilters}>Limpar Filtros</S.Button>
          )}

          <S.FilterLabel>{priceLabels.title}</S.FilterLabel>
          {renderPriceFilters}

          <S.Separator />

          <S.FilterLabel>{formatLabels.title}</S.FilterLabel>
          {renderFormatFilters}

          <S.Separator />

          <S.FilterLabel>{availableLabels.title}</S.FilterLabel>
          <S.FilterContent>
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
          </S.FilterContent>
          <S.Separator />
        </S.FiltersContainer>
      )}
    </>
  );
};

export default Filter;
