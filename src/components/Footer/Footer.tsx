import styled from "styled-components"
import { Container } from "../../styles/styles"
import { GithubOutlined } from '@ant-design/icons'

const FooterWrapper = styled.footer`
    width: 100%;
    height: 70px;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
`

const GitHubLink = styled.a`
    color: ${props => props.theme.colors.gray};
    text-decoration: none;
    cursor: pointer;
    font-size: 16px;

    &:hover > span {
        color:  ${props => props.theme.colors.blue};
        transition:  ${props => props.theme.transition.fast};
    }

    .line {
        position: relative;
        display: inline-block;
        color: ${props => props.theme.colors.white};
    }

    .line::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        height: 2px;
        width: 100%;
        background-color: ${props => props.theme.colors.blue};
        transform-origin: left;
        transform: scaleX(0);
        transition: ${props => props.theme.transition.fast};
    }

    .line:hover::after {
        transform: scaleX(1);
    }
`

export const Footer = () => {


    return (
        <FooterWrapper>
            <Container align="center">
                <span>
                    <GitHubLink href="https://github.com/MeleshkoDmitriy/Online-Shop-Pioneer" 
                                target="blank" 
                                rel="noreferrer">
                         <span className="line"><GithubOutlined spin style={{fontSize: "20px"}} /> GitHub.</span> Developed by Dmitriy Meleshko. Online Shop 2024.
                    </GitHubLink>
                </span>
            </Container>
        </FooterWrapper>
    )
}