import { ThemeProvider, createGlobalStyle } from "styled-components";

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            black: string;
            blue: string,
            darkGray: string,
            lightGray: string,
            white: string
        }
    }
}

const DefaultTheme = {
    colors: {
        black: '#222222',
        blue: '#007de1',
        darkGray: '#262626',
        lightGray: '#f7f7f7',
        white: '#fff'
    }
}

const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }
`


export const Theme = ({ children }) = {
    return (
        <ThemeProvider theme={DefaultTheme}>
            <GlobalStyle />
                {children}
        </ThemeProvider>
    )
}