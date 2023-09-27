import React, { useEffect } from "react";
import Header from "../../components/header";
import Filters from "../../components/filters";
import Footer from "../../components/footer";
import {
  footerAllrightsReserved,
  helpLink,
  privacyAndPolicy,
  termsAndUsage,
} from "../../constants";

import useStore from "../../store";

import * as S from "./styles";

const Search: React.FC = () => {
  const { volumes, setSuggestions } = useStore((state) => state);

  useEffect(() => {
    setSuggestions([]);
  }, []);

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <Filters />
          {volumes.length ? (
            <S.ContentResults>
              {volumes.map(({ id, volumeInfo }) => (
                <S.ContentResultsWrapper key={id}>
                  <S.ContentResultsCover>
                    <img
                      src={volumeInfo?.imageLinks?.thumbnail}
                      alt={volumeInfo?.title}
                    />
                  </S.ContentResultsCover>
                  <S.ContentResultsTitle>
                    <label>{volumeInfo?.title} </label>
                  </S.ContentResultsTitle>
                  <S.ContentResultsCategory>
                    <span>{volumeInfo?.authors?.join(", ")}</span>
                  </S.ContentResultsCategory>
                </S.ContentResultsWrapper>
              ))}
            </S.ContentResults>
          ) : (
            <h2>Nenhum resultado encontrado.</h2>
          )}
        </S.Content>
      </S.Container>
      <Footer
        text={footerAllrightsReserved}
        privacyText={privacyAndPolicy}
        termsAndUsageText={termsAndUsage}
        helpText={helpLink}
      />
    </>
  );
};

export default Search;
