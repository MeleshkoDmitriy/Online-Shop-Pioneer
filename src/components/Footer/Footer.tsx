import styled from "styled-components"
import { Container } from "../../styles/styles"

const FooterWrapper = styled.footer`
    width: 100%;
    height: 70px;
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
`

export const Footer = () => {
    return (
        <FooterWrapper>
            <Container justify="center" align="center">
                footer
            </Container>
        </FooterWrapper>
    )
}