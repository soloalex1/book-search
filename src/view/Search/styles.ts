import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

export const ContentResults = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  margin: 49px 0;
  width: 100%;
`;

export const ContentResultsWrapper = styled.div`
  margin: 10px 0;
`;

export const ContentResultsCover = styled.div`
  img {
    width: 124px;
    height: 185px;
  }
`;

export const ContentResultsTitle = styled.div`
  label {
    font-size: 14px;
    color: #86878b;
  }
`;

export const ContentResultsCategory = styled.div`
  span {
    font-size: 14px;
    color: #9eaeb7;
  }
`;
