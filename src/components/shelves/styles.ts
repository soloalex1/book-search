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
  padding: 0 1rem;

  @media (min-width: ${breakpoints.tabletSM}) {
    padding: 0 3rem;
  }
`;

export const Content = styled.div`
  width: 100%;

  @media (min-width: ${breakpoints.desktopXL}) {
    margin: 1.25rem auto;
  }
`;

export const ShelfItem = styled.div`
  display: flex;
  width: calc(100% - 80px);

  > img {
    width: 200px;
    height: 300px;
  }

  @media (min-width: ${breakpoints.tabletSM}) {
    width: 100%;
    margin: 1.25rem auto;
  }
`;

export const ShelfTitle = styled.div`
  color: #053b4b;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: ${breakpoints.tabletSM}) {
    font-size: 2rem;
    margin-bottom: 0;
  }

  @media (min-width: ${breakpoints.desktopXL}) {
    padding: 30px 0 0;
  }
`;
