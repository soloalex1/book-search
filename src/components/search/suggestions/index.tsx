import React from "react";

import { VolumeData } from "@/types";

import * as S from "./styles";

type SuggestionsProps = {
  data: VolumeData[];
};

const Suggestions: React.FC<SuggestionsProps> = ({ data }) => {
  return data.length ? (
    <S.ListContainer>
      {data?.map(({ id, volumeInfo }) => (
        <li key={id}>{volumeInfo.title}</li>
      ))}
    </S.ListContainer>
  ) : null;
};

export default Suggestions;
