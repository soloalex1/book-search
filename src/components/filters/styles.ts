import { breakpoints } from "@/constants";
import styled from "styled-components";

export const FiltersContainer = styled.form`
  height: 100vh;
  background-color: #fff;
  padding-top: 3rem;
  color: #222;

  @media (min-width: ${breakpoints.desktopMD}) {
    width: initial;
    position: static;
    display: block;
    padding: 0;
    margin: 0 auto;
  }
`;

export const ContentTitle = styled.p`
  color: #222;
  font-size: 1.75rem;
  font-weight: 700;
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

  @media (min-width: ${breakpoints.desktopMD}) {
    &#filterToggle {
      display: none;
    }
  }
`;

export const FilterLabel = styled.p`
  color: black;
  font-size: 1rem;
  font-weight: 700;
`;

export const FilterContent = styled.div`
  > ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 0.5rem;

    > li {
      margin-bottom: 0.25rem;

      > span {
        color: #222;
      }
    }
  }
`;
