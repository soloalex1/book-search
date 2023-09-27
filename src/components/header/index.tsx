import React, { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import Search from "../search";

import { getVolumes } from "../../api";
import useStore from "../../store";

import * as S from "./styles";

const Header: React.FC = () => {
  const history = useHistory();

  const { setVolumes } = useStore((state) => state);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target);

    console.log("form", form);

    // @ts-ignore
    getVolumes(form.search).then((data) => {
      setVolumes(data);
    });

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
