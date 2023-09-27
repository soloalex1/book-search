import React from "react";

import useStore from "../../store";

import * as S from "./styles";

import { SearchProps } from "./types";
import Suggestions from "./suggestions";

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  const { suggestions } = useStore((state) => state);

  return (
    <S.SearchContainer>
      <S.InputSearch
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Pesquisar..."
      />
      <S.Icon />
      <Suggestions data={suggestions} />
    </S.SearchContainer>
  );
};

export default Search;
