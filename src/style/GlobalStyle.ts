import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    button {
        cursor: pointer;
    }

    body {
      background-color: #FFFFFF;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }
`;

export default GlobalStyle;
