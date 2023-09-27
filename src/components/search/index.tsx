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

  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const handleSearch = useCallback((query: string) => {
    return getVolumes(query);
  }, []);

  const handleBlur = () => {
    setSuggestions([]);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (debounceValue) {
      handleSearch(debounceValue).then((data) => {
        if (data) setSuggestions(data);
        return;
      });
    }

    setSuggestions([]);
  }, [debounceValue, handleSearch]);

  return (
    <S.SearchContainer onSubmit={onSubmit}>
      <S.InputSearch
        name="search"
        type="text"
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder="Pesquisar..."
      />
      <S.Icon />
      <Suggestions data={suggestions} />
    </S.SearchContainer>
  );
};

export default Search;
