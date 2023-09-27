import React from "react";

import * as S from "./styles";

import { VolumeData } from "../../../types";

type SuggestionsProps = {
  data: VolumeData[];
};

const Suggestions: React.FC<SuggestionsProps> = ({ data }) => {
  return data.length ? (
    <S.ListContainer>
      {data?.map((data, index) => (
        <li key={index}>{data.volumeInfo.title}</li>
      ))}
    </S.ListContainer>
  ) : null;
};

export default Suggestions;
