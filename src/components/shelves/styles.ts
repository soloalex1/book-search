import styled from "styled-components";

import { breakpoints } from "@/constants";

export const ShelfContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
`;

export const Shelf = styled.div`
  width: 100%;
  padding: 0 0.5rem;
`;

export const Content = styled.div`
  width: 100%;

  @media (min-width: ${breakpoints.desktopXL}) {
    margin: 20px auto;
  }
`;

export const ShelfItem = styled.div`
  display: flex;
  width: calc(100% - 80px);

  > img {
    width: 198px;
    height: 296px;
  }

  @media (min-width: ${breakpoints.tabletSM}) {
    width: 100%;
    margin: 20px auto;
  }
`;

export const ShelfTitle = styled.div`
  color: #053b4b;
  font-size: 2rem;
  font-weight: 700;

  @media (min-width: ${breakpoints.desktopXL}) {
    margin: 0 auto;
    padding: 30px 0 0;
  }
`;
