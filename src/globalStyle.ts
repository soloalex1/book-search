import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    background-color: #fff;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #root {
    text-align: center;
    width: 100vw;
    height: 100%;
  }
`;

export default GlobalStyle;
