import { breakpoints } from "@/constants";
import styled from "styled-components";

export const Content = styled.form`
  text-align: left;
  background-color: #fff;
  color: #222;
  width: 100%;

  @media (min-width: ${breakpoints.desktopMD}) {
    padding: 0;
    margin: 0 auto;
  }
`;

export const ContentTitle = styled.p`
  color: #222;
  font-size: 24px;
  font-weight: 700;
`;

export const Button = styled.button`
  height: 40px;
  border: 1px solid transparent;
  padding: 0.6rem 1.2rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: #45d0c1;
  color: white;
  transition: all 0.5s ease-in-out;

  &:hover {
    border-color: transparent;
    background-color: #37a69a;
  }
`;

export const FilterTitle = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 700;
`;

export const FilterContent = styled.div`
  & > ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 8px;
  }
  & > ul > li {
    margin-bottom: 3px;
  }
  & > ul > li > span {
    color: #222;
  }
`;
