import { breakpoints } from "@/constants";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  justify-self: flex-end;
  grid-row-start: 1;
  margin: 0.5rem 1rem;

  @media (min-width: ${breakpoints.tabletSM}) {
    margin: 0.5rem 2rem;
  }

  button {
    height: 40px;
    display: flex;
    gap: 0.25rem;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-evenly;
    background-color: #fff;
    border: 1px solid #45d0c1;
    color: #45d0c1;
    padding: 0.6rem;
    font-weight: 400;
    font-size: 1rem;
    border-radius: 0.5rem;

    svg {
      height: 100%;
      width: fit-content;

      path {
        fill: #45d0c1;
      }
    }

    span {
      font-weight: 700;
    }
  }

  @media (min-width: ${breakpoints.desktopMD}) {
    display: none;
  }
`;

export const FiltersContainer = styled.aside`
  height: 100vh;
  background-color: #fff;
  padding: 1rem;
  color: #222;
  text-align: left;

  @media (min-width: ${breakpoints.desktopMD}) {
    width: initial;
    position: fixed;
    right: 0;
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

export const ResetButton = styled.button`
  width: fit-content;
  height: 2.5rem;
  border: 1px solid #4361EE;
  padding: 0.6rem 1.2rem;
  font-weight: 400;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: #fff;
  color: #4361EE;
  transition: 0.8s;
  width: 100%;

  &:hover {
    border: 1px solid #4361EE;
    background-color: #4361EE;
    color: #fff;
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

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0 0 0.25rem 0;

    li {
      margin-bottom: 0.25rem;

      input {
        margin-right: 0.5rem;
      }

      label {
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
