import styled from "styled-components";

export const SpinnerAnimation = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #45d0c1;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
