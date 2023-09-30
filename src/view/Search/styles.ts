import styled from "styled-components";

import { breakpoints } from "@/constants";

export const SearchContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${breakpoints.desktopMD}) {
    grid-template-columns: 2fr 6fr;
  }
`;

export const ResultsContainer = styled.section`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  gap: 0.25rem;
  grid-template-columns: repeat(3, 1fr);

  @media (min-width: ${breakpoints.tabletSM}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${breakpoints.desktopMD}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const VolumeWrapper = styled.div`
  margin: 0.75rem 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

export const VolumeImage = styled.img`
  width: 124px;
  height: 185px;
  margin-bottom: 0.5rem;
`;

export const VolumeTitle = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: #86878b;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: pre-wrap;
  overflow: hidden;
`;

export const VolumeAuthor = styled.label`
  font-size: 0.75rem;
  color: #9eaeb7;
`;
