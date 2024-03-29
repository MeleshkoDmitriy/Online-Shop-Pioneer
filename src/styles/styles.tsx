import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      black: string;
      blue: string;
      blueOpacity: string;
      gray: string;
      darkGray: string;
      lightGray: string;
      white: string;
    },
    media: {
      phone: string,
      tablet: string,
      computer: string
    },
    transition: {
      fast: string,
      slow: string
    },
    padding: {
      primary: string,
    },
    borderRadius: {
      primary: string
    }

  }
}

const theme = {
  colors: {
    black: "#222222",
    blue: "#007de1",
    blueOpacity: "#007ce1b2",
    gray: '#9a9a9a',
    darkGray: "#262626",
    lightGray: "#f7f7f7",
    white: "#fff",
  },
  media: {
    phone: "(max-width: 425px)",
    tablet: "(max-width: 768px) and (min-width: 425px)",
    computer: "(min-width: 768px)"
  },
  transition: {
    fast: "0.3s",
    slow: "1s"
  },
  padding: {
    primary: "20px",
  },
  borderRadius: {
    primary: '10px'
  }
};

const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }
`;

interface ContainerProps {
  direction?: string,
  justify?: string,
  align?: string
}

export const Container = styled.div<ContainerProps>`
  height: inherit;
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'stretch'};
  align-items: ${props => props.align || 'stretch'};

  @media ${props => props.theme.media.computer} {
    margin-inline: 150px;
  }
  @media ${props => props.theme.media.tablet} {
    margin-inline: 70px;
  }
  @media ${props => props.theme.media.phone} {
    margin-inline: 10px;
  }
`

export const Theme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
