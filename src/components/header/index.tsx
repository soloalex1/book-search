import React from "react";

import Search from "@/components/search";

import * as S from "./styles";

const Header: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <S.LogoContainer>
          <a href="/">
            <img
              src="https://s3-sa-east-1.amazonaws.com/files.arvoredelivros.com.br/arvore-library-assets/images/logos/logo-livros-horizontal-white.svg"
              alt="Arvore Livros"
              width="168"
              height="25"
            />
          </a>
        </S.LogoContainer>
        <S.ContentSearch>
          <Search />
        </S.ContentSearch>
        <S.ContentUser>
          <p>login</p>
        </S.ContentUser>
      </S.Content>
    </S.Container>
  );
};

export default Header;
