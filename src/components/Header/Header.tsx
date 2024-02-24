import styled from "styled-components"
import LOGO from '../../assets/pioneer-dj-logo-white.png'
import { Container } from "../../styles/styles"
import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import { HeartOutlined, ShoppingOutlined, LoginOutlined } from '@ant-design/icons'


const HeaderWrapper = styled.header`
    width: 100%;
    height: 70px;
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    position: sticky;
    top: 0;
    z-index: 10;
`

const LogoContainer = styled.div`
    img {
        width: 240px;
    }
`

const Menu = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 20px;
    cursor: pointer;
    font-size: 16px;
    transition: ${props => props.theme.transition.fast};

    .line {
        position: relative;
        display: inline-block;
        color: ${props => props.theme.colors.white};
        transition: ${props => props.theme.transition.fast};

        &:hover {
            color: ${props => props.theme.colors.blue};
        }
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
        background-color: ${props => props.theme.colors.blue};
    }

    .line .icon {
        font-size: 20px;
        margin-left: 10px;
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
                    <li className="line">Favorites<HeartOutlined className="icon" /></li>
                    <li className="line">Cart<ShoppingOutlined className="icon"  /></li>
                    <li className="line">Sign up<LoginOutlined className="icon"  /></li>
                </Menu>

            </Container>
        </HeaderWrapper>
    )
}