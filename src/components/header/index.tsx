import React from "react";

import Search from "@/components/Search";

import * as S from "./styles";

const Header: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <S.LogoContainer>
          <a href="/">
            Book Search Demo
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
