import React from "react";

import * as S from "./styles";

import { SearchProps } from "./types";

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <S.SearchContainer>
      <S.InputSearch
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Pesquisar..."
      />
      <S.Icon />
    </S.SearchContainer>
  );
};

export default Search;
