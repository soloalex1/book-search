import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";

import Suggestions from "@/components/search/suggestions";

import useStore from "@/store";
import { getVolumes } from "@/api";

import useDebounce from "@/hooks/useDebounce";

import * as S from "./styles";

type SearchProps = {
  onSubmit(e: ChangeEvent<HTMLFormElement>): void;
};

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const { suggestions, setSuggestions, query, setQuery } = useStore(
    (state) => state
  );

  const debounceValue = useDebounce(query);

  const handleSuggestionSearch = useCallback((term: string) => {
    return getVolumes(term);
  }, []);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debounceValue) {
        const { items } = await handleSuggestionSearch(debounceValue);

        if (items) {
          setSuggestions(items);
          return;
        }
      }

      setSuggestions([]);
    };

    fetchSuggestions();
  }, [debounceValue, handleSuggestionSearch]);

  useEffect(() => {
    if (document.activeElement === searchRef.current) {
      setShowSuggestions(true);
    }

    setShowSuggestions(false);
  }, [searchRef]);

  return (
    <S.SearchContainer onSubmit={onSubmit}>
      <S.InputSearch
        ref={searchRef}
        name="search"
        type="text"
        value={query}
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
