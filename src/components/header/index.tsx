import React, { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import Search from "@/components/search";

import { getVolumes } from "@/api";
import useStore from "@/store";

import * as S from "./styles";

const Header: React.FC = () => {
  const history = useHistory();

  const {
    setVolumes,
    pagination: { itemsPerPage },
  } = useStore((state) => state);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.target).entries());

    const data = await getVolumes(form.search as string, 0, itemsPerPage);

    if (data) setVolumes(data);

    history.push("/search");
  };

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
          <Search onSubmit={handleSubmit} />
        </S.ContentSearch>
        <S.ContentUser>
          <p>login</p>
        </S.ContentUser>
      </S.Content>
    </S.Container>
  );
};

export default Header;
