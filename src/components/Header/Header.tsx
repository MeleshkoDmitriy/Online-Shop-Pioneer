import styled from "styled-components"
import LOGO from '../../assets/pioneer-dj-logo-white.png'
import { Container } from "../../styles/styles"
import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import { HeartOutlined, ShoppingOutlined, LoginOutlined } from '@ant-design/icons'
import { Badge } from "antd"
import { useSelector } from "react-redux"


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

    .line:hover .icon {
        color: ${props => props.theme.colors.blue};
        transition: ${props => props.theme.transition.fast};
    }
    
    .icon {
        color: ${props => props.theme.colors.white};
    }

`

export const Header = ({showFavorites, showCart}) => {

    const { cart, favorites } = useSelector(({ user }) => user)

    return (
        <HeaderWrapper >
            <Container justify="space-between" align="center">
                <LogoContainer >
                    <Link to={ROUTES.HOME}>
                        <img src={LOGO} alt="Logo" title="Pioneer Logo" />
                    </Link>
                </LogoContainer>

                <Menu>
                    <li className="line" onClick={showFavorites}>Favorites
                        <Badge count={favorites.length} offset={[3, -2]} color="#007de1" size="small">
                            <HeartOutlined className="icon" />
                        </Badge>
                    </li>
                    <li className="line" onClick={showCart}>Cart
                        <Badge count={cart.length} offset={[3, -2]} color="#007de1" size="small">
                            <ShoppingOutlined className="icon"  />
                        </Badge>
                    </li>
                    <li className="line">Sign up<LoginOutlined className="icon"  /></li>
                </Menu>

            </Container>
        </HeaderWrapper>
    )
}