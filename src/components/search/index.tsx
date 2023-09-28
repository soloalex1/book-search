import React, { useState, useEffect, useCallback, ChangeEvent } from "react";

import useStore from "../../store";

import * as S from "./styles";
import Suggestions from "./suggestions";
import useDebounce from "../../hooks/useDebounce";

import { getVolumes } from "../../api";

type SearchProps = {
  onSubmit(e: ChangeEvent<HTMLFormElement>): void;
};

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
  const { suggestions, setSuggestions } = useStore((state) => state);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const handleSearch = useCallback((query: string) => {
    return getVolumes(query);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (debounceValue) {
      handleSearch(debounceValue).then((data) => {
        if (data) {
          setSuggestions(data);
          setShowSuggestions(true);
        }
        return;
      });
    }

    setSuggestions([]);
    setShowSuggestions(false);
  }, [debounceValue, handleSearch]);

  return (
    <S.SearchContainer onSubmit={onSubmit}>
      <S.InputSearch
        name="search"
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        placeholder="Pesquisar..."
      />
      <S.Icon />
      {showSuggestions ? <Suggestions data={suggestions} /> : null}
    </S.SearchContainer>
  );
};

export default Search;
