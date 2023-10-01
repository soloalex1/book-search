import styled from "styled-components";

import { breakpoints } from "@/constants";

export const SearchContainer = styled.form`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    right: 1.5rem;
    margin: auto 0;
    height: 100%;
  }
`;

export const InputSearch = styled.input`
  background-color: #f1f7fc;
  border: 1px solid #dee1e6;
  outline: #dee1e6;
  line-height: 300%;
  font-size: 1rem;
  font-weight: 400;
  cursor: default;
  color: #406a76;
  border-radius: 2rem;
  padding: 0 1.5rem;

  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;

  &:placeholder {
    color: #406a76;
    opacity: 0;
  }
`;

export const ListContainer = styled.ul`
  width: 90vw;
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #fff;
  list-style-type: none;
  padding: 0.75rem;
  z-index: 20;
  border-radius: 0.5rem;
  box-shadow: 0px 12px 16px 0px rgba(135, 130, 135, 0.5);

  li {
    color: black;
    padding: 0.5rem;
    background-color: transparent;
    transition: all 100ms ease-in-out;
    text-align: left;

    &:hover,
    &:active {
      background-color: #45d0c169;
    }
  }

  @media (min-width: ${breakpoints.tabletSM}) {
    width: 100%;
    left: 0;
  }
`;
