import React, { ChangeEvent, useState, useEffect, useCallback } from "react";

import Search from "../search";

import useDebounce from "../../hooks/useDebounce";

import { getVolumes } from "../../api";

import { Container, Content, ContentSearch, ContentUser } from "./styles";

import useStore from "../../store";

const Header: React.FC = () => {
  const { setSuggestions } = useStore((state) => state);

  const [term, setTerm] = useState("");
  const debounceTerm = useDebounce(term);

  const onChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSearch = useCallback(async (query: string) => {
    return await getVolumes(query);
  }, []);

  useEffect(() => {
    if (debounceTerm) {
      handleSearch(debounceTerm).then((data) => {
        if (data) setSuggestions(data);
      });
    }
  }, [debounceTerm, handleSearch]);

  return (
    <Container>
      <Content>
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
        <ContentSearch>
          <Search value={term} onChange={onChangeTerm} />
        </ContentSearch>
        <ContentUser>
          <p>login</p>
        </ContentUser>
      </Content>
    </Container>
  );
};

export default Header;
