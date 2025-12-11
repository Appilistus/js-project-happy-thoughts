import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${({ theme }) => theme.colors.backgroundColor };
        color: ${({ theme }) => theme.colors.text };
        font-family: Google Sans Code, sans-serif;
    }

    p{
        font-size: 1rem;
    }
`