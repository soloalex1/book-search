import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import { useHistory } from "react-router-dom";

import useStore from "@/store";
import { getVolumes } from "@/api";

import useDebounce from "@/hooks/useDebounce";

import * as S from "./styles";

const Search: React.FC = () => {
  const history = useHistory();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const {
    suggestions,
    setSuggestions,
    query,
    setQuery,
    setVolumes,
    pagination: { itemsPerPage },
  } = useStore((state) => state);

  const debounceValue = useDebounce(query);

  const handleSearch = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = Object.fromEntries(new FormData(e.target).entries());
    const data = await getVolumes(form.search as string, 0, itemsPerPage);

    if (data) {
      setVolumes(data, true);
    }

    if (history.location.pathname !== "search") {
      history.push("/search");
    }
  };

  const handleSuggestionSearch = useCallback((term: string) => {
    return getVolumes(term);
  }, []);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
  };

  const renderSuggestions = suggestions.length ? (
    <S.ListContainer>
      {suggestions?.map(({ id, volumeInfo }) => (
        <li key={id}>{volumeInfo.title}</li>
      ))}
    </S.ListContainer>
  ) : null;

  useEffect(() => {
    // @ts-expect-error
    const fetchSuggestions = (async () => {
      if (debounceValue) {
        const { items } = await handleSuggestionSearch(debounceValue);

        if (items) {
          setSuggestions(items);
          return;
        }
      }

      setSuggestions([]);
    })();
  }, [debounceValue, handleSuggestionSearch]);

  useEffect(() => {
    if (document.activeElement === searchRef.current) {
      setShowSuggestions(true);
    }

    setShowSuggestions(false);
  }, [searchRef]);

  return (
    <S.SearchContainer onSubmit={handleSearch}>
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
      {showSuggestions && renderSuggestions}
    </S.SearchContainer>
  );
};

export default Search;
