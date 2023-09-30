import React, { useState, ChangeEvent, MouseEvent } from "react";

import useStore from "@/store";
import { Format } from "@/types";

import filtersWithInitialState from "./constants";
import * as S from "./styles";
import { SidePane } from "react-side-pane";

const Filter: React.FC = () => {
  const [visible, setVisible] = useState(window.innerWidth > 768);

  const closeFilters = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setVisible(!visible);
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
    <>
      <S.Button id="filterToggle" onClick={() => setVisible(true)}>
        Filtrar resultados
      </S.Button>
      <SidePane open={visible} width={50} onClose={() => setVisible(false)}>
        <S.FiltersContainer>
          <S.ContentTitle>Filtrar resultados</S.ContentTitle>
          {!areFiltersEmpty() && (
            <S.Button onClick={resetFilters}>Limpar Filtros</S.Button>
          )}

          <button onClick={closeFilters}>X</button>

          <S.FilterLabel>{priceLabels.title}</S.FilterLabel>
          {renderPriceFilters}

          <S.FilterLabel>{formatLabels.title}</S.FilterLabel>
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
        </S.FiltersContainer>
      </SidePane>
    </>
  );
};

export default Filter;
