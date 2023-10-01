import { breakpoints } from "@/constants";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  justify-self: flex-end;
  margin: 0.5rem 1rem;

  @media (min-width: ${breakpoints.desktopMD}) {
    display: none;
  }
`;

export const FiltersContainer = styled.aside`
  height: 100vh;
  background-color: #fff;
  padding: 1rem;
  color: #222;

  @media (min-width: ${breakpoints.desktopMD}) {
    width: initial;
    position: static;
    display: block;
    padding: 0;
    margin: 0 auto;
    padding: 3rem;
  }
`;

export const ContentTitle = styled.h4`
  color: #222;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.5rem 0;

  @media (min-width: ${breakpoints.tabletSM}) {
    font-size: 1.75rem;
  }
`;

export const Button = styled.button`
  width: fit-content;
  height: 2.5rem;
  border: 1px solid transparent;
  padding: 0.6rem 1.2rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: #45d0c1;
  color: white;
  transition: all 0.5s linear;

  &:hover {
    border-color: transparent;
    background-color: #37a69a;
  }
`;

export const FilterLabel = styled.p`
  color: #666;
  font-size: 1rem;
  font-weight: 700;
  margin: 1rem 0 0.5rem 0;
`;

export const FilterContent = styled.summary`
  margin: 0 0.5rem;

  > ul {
    list-style-type: none;
    padding: 0;
    margin: 0 0 0.25rem 0;

    > li {
      margin-bottom: 0.25rem;

      > span {
        color: #666;
      }
    }
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid #444;
  margin: 1.5rem 0;
`;
