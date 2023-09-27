import styled from "styled-components";

export const Content = styled.div`
  background-color: #fff;
  width: 100%;
  border: 1px solid red;

  @media (min-width: 992px) {
    padding: 0;
    margin: 0 auto;
  }
`;

export const ContentTitle = styled.p`
  color: #9eaeb7;
  font-size: 16px;
  font-weight: 700;
`;

export const Button = styled.button`
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  padding: 16px;
  text-transform: uppercase;
  background-color: #adb7bf;
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
    color: #053b4b;
  }
`;
