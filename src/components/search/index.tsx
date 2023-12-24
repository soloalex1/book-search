import React from "react";

import { ReactComponent as SearchIcon } from "@/assets/search-icon.svg";

import { useSearch } from "@/hooks/useSearch";

import * as S from "./styles";

const Search: React.FC = () => {
  const { query, handleSearch, onChange, suggestions, ref } = useSearch();

  const renderSuggestions = suggestions.list.length ? (
    <S.ListContainer aria-label="Sugestões de pesquisa">
      {suggestions.list?.map(({ id, volumeInfo }) => (
        <li key={id}>{volumeInfo.title}</li>
      ))}
    </S.ListContainer>
  ) : null;


  return (
    <S.SearchContainer onSubmit={handleSearch} role="search">
      <S.InputSearch
        ref={ref}
        name="search"
        type="text"
        value={query}
        onChange={onChange}
        onFocus={() => suggestions.toggle(true)}
        onBlur={() => suggestions.toggle(false)}
        placeholder="Pesquisar..."
      />
      <SearchIcon title="Pesquisar" aria-label="Pesquisar" />
      {suggestions.show && renderSuggestions}
    </S.SearchContainer>
  );
};

export default Search;
