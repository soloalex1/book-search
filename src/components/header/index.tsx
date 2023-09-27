import React, { ChangeEvent, useState, useEffect, useCallback } from "react";

import Search from "../search";
import Suggestions from "../search/suggestions";

import useDebounce from "../../hooks/useDebounce";

import { getVolumes } from "../../api";

import * as S from "./styles";

import useStore from "../../store";

const Header: React.FC = () => {
  const { suggestions, setSuggestions } = useStore((state) => state);

  const [term, setTerm] = useState("");
  const debounceTerm = useDebounce(term);

  const onChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSearch = useCallback((query: string) => {
    return getVolumes(query);
  }, []);

  useEffect(() => {
    if (debounceTerm) {
      handleSearch(debounceTerm).then((data) => {
        if (data) setSuggestions(data);
        return;
      });
    }

    setSuggestions([]);
  }, [debounceTerm, handleSearch]);

  return (
    <S.Container>
      <S.Content>
        <div>
          <a href="/">
            <img
              src="https://s3-sa-east-1.amazonaws.com/files.arvoredelivros.com.br/arvore-library-assets/images/logos/logo-livros-horizontal-white.svg"
              alt="Arvore Livros"
              width="168"
              height="25"
            />
          </a>
        </div>
        <S.ContentSearch>
          <Search value={term} onChange={onChangeTerm} />
          <Suggestions data={suggestions} />
        </S.ContentSearch>
        <S.ContentUser>
          <p>login</p>
        </S.ContentUser>
      </S.Content>
    </S.Container>
  );
};

export default Header;
