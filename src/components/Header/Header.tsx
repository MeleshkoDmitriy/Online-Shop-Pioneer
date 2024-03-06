import styled from "styled-components"
import LOGO from '../../assets/pioneer-dj-logo-white.png'
import { Container } from "../../styles/styles"
import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import { HeartOutlined, HeartFilled, ShoppingOutlined, ShoppingFilled, LoginOutlined } from '@ant-design/icons'
import { Badge } from "antd"
import { FC } from "react"
import { useAppSelector } from "../../hooks/hook"

const HeaderWrapper = styled.header`
    width: 100%;
    height: 70px;
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    position: sticky;
    top: 0;
    z-index: 10;
    transition: ${props => props.theme.transition.fast};
    transition-timing-function: ease-in-out;

`
const LogoContainer = styled.div`
    transition: ${props => props.theme.transition.fast};
    position: relative;
    top: 0px;
    
    &:hover { 
        position: relative;
        top: 2px;

        img {
            filter: drop-shadow(0px 0px 0px ${props => props.theme.colors.blue});
        }
    }

    img {
        position: relative;
        width: 240px;
        filter: drop-shadow(2px 2px 2px ${props => props.theme.colors.blue});
        transition: ${props => props.theme.transition.fast};

    }
`
const Menu = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 30px;
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

    .line:hover .icon, #git:hover {
        color: ${props => props.theme.colors.blue};
        transition: ${props => props.theme.transition.fast};
    }
    
    .icon {
        color: ${props => props.theme.colors.white};
    }

    #git {
        color: ${props => props.theme.colors.white};
        text-decoration: none;
        transition: ${props => props.theme.transition.fast};
    }

`
interface HeaderProps {
    showFavorites: () => void;
    showCart: () => void;
}

export const Header:FC<HeaderProps> = ({showFavorites, showCart}) => {

    const { cart, favorites } = useAppSelector((state) => state.user);

    return (
        <HeaderWrapper >
            <Container justify="space-between" align="center">
                <LogoContainer>
                    <Link to={ROUTES.HOME}>
                        <img src={LOGO} alt="Logo" title="Home Page" />
                    </Link>
                </LogoContainer>
                <Menu>
                    <li className="line" onClick={showFavorites}>Favorites
                        <Badge count={favorites.length} offset={[3, -2]} color="#007de1" size="small">
                            {favorites.length   ? <HeartFilled className="icon" />
                                                : <HeartOutlined className="icon" />}
                        </Badge>
                    </li>
                    <li className="line" onClick={showCart}>Cart
                        <Badge count={cart.length} offset={[3, -2]} color="#007de1" size="small">
                            {cart.length    ? <ShoppingFilled className="icon" />
                                            : <ShoppingOutlined className="icon" />}
                        </Badge>
                    </li>
                    <li className="line">
                        <a id="git" href="https://github.com/MeleshkoDmitriy/Online-Shop-Pioneer" target="blank">
                            Sign up
                        </a><LoginOutlined className="icon"  />
                    </li>
                </Menu>
            </Container>
        </HeaderWrapper>
    )
}