import styled from "styled-components"
import LOGO from '../../assets/pioneer-dj-logo-white.png'
import { Container } from "../../styles/styles"
import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"


const HeaderWrapper = styled.header`
    width: 100%;
    height: 70px;
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
`

const LogoContainer = styled.div`
    img {
        width: 200px;
    }
`

const Menu = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 20px;
    cursor: pointer;
    font-size: 20px;
    transition: ${props => props.theme.transition.fast};

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
        background-color: ${props => props.theme.colors.white};
        transform-origin: left;
        transform: scaleX(0);
        transition: ${props => props.theme.transition.fast};
    }

    .line:hover::after {
        transform: scaleX(1);
    }
`

export const Header = () => {
    return (
        <HeaderWrapper >
            <Container justify="space-between" align="center">
                <LogoContainer >
                    <Link to={ROUTES.HOME}>
                        <img src={LOGO} alt="Logo" title="Pioneer Logo" />
                    </Link>
                </LogoContainer>

                <Menu>
                    <li className="line">Favorites</li>
                    <li className="line">In Cart</li>
                    <li className="line">Log In</li>
                </Menu>

            </Container>
        </HeaderWrapper>
    )
}