import React from "react";

import useStore from "../../store";

import * as S from "./styles";

import { SearchProps } from "./types";
import Suggestions from "./suggestions";

const Search: React.FC<SearchProps> = ({ value, onChange, onBlur }) => {
  const { suggestions } = useStore((state) => state);

  return (
    <S.SearchContainer>
      <S.InputSearch
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Pesquisar..."
      />
      <S.Icon />
      <Suggestions data={suggestions} />
    </S.SearchContainer>
  );
};

export default Search;
