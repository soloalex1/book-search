import { breakpoints } from "@/constants";
import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  width: 100%;
  border-top: 1px solid #dee1e6;
  display: block;
  padding: 1rem;
  text-align: center;
  height: auto;

  @media (min-width: ${breakpoints.desktopMD}) {
    padding: 0 1rem;
    align-items: baseline;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    height: 90px;
  }
`;
export const Content = styled.div`
  background-color: #fff;
  width: 100%;

  @media (min-width: ${breakpoints.desktopMD}) {
    width: auto;
  }
`;

export const ContentText = styled.p`
  font-size: 0.75rem;
  color: #b2b4b9;
`;

export const ContentList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: block;

  @media (min-width: ${breakpoints.desktopMD}) {
    display: flex;
    justify-content: space-between;
  }
`;

export const ContentItem = styled.li`
  border: 1px solid #dee1e6;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  margin: 0.5rem 0;

  &:hover {
    border-color: #86878b;
  }

  @media (min-width: ${breakpoints.desktopMD}) {
    margin: 0 0.5rem;
  }
`;

export const ContentLink = styled.a`
  text-decoration: none;
  color: #b2b4b9;
  font-weight: 700;

  &:hover {
    color: #86878b;
  }
`;
