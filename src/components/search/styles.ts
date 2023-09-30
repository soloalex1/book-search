import styled from "styled-components";
import { ReactComponent as SearchIcon } from "@/assets/search-icon.svg";

export const SearchContainer = styled.form`
  position: relative;
  width: 100%;
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

export const Icon = styled(SearchIcon)`
  position: absolute;
  right: 1.5rem;
  margin: auto 0;
  height: 100%;
`;

export const ListContainer = styled.ul`
  width: 100%;
  position: absolute;
  top: 40px;
  background-color: white;
  list-style-type: none;
  padding: 12px;
  z-index: 20;
  border-radius: 8px;

  li {
    color: black;
    padding: 8px;
    background-color: transparent;
    transition: all 100ms ease-in-out;
    text-align: left;

    &:hover {
      background-color: #45d0c169;
    }
  }
`;
