import React from "react";

import * as S from "./styles";

const Footer: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <S.ContentText>
          Copyright © 2023 Árvore. Todos os direitos reservados.
        </S.ContentText>
      </S.Content>
      <S.Content>
        <S.ContentList>
          <S.ContentItem>
            <S.ContentLink href="https://www.arvore.com.br/arvore-politica-de-privacidade-completo">
              Política e privacidade
            </S.ContentLink>
          </S.ContentItem>
          <S.ContentItem>
            <S.ContentLink href="https://s3-sa-east-1.amazonaws.com/files.arvoredelivros.com.br/Contrato/Termos_de_uso_e_contratacao_Arvore.pdf">
              Termos de uso
            </S.ContentLink>
          </S.ContentItem>
          <S.ContentItem>
            <S.ContentLink href="https://central.arvore.com.br/central/estudante?utm_source=plataforma&utm_medium=referral&utm_content=rodape_ajuda_estudante&utm_campaign=central_2023">
              Ajuda
            </S.ContentLink>
          </S.ContentItem>
        </S.ContentList>
      </S.Content>
    </S.Container>
  );
};

export default Footer;
