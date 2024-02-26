import { Divider } from "antd"
import styled from "styled-components"
import { CartItem } from "./CartItem/CartItem"




const Wrapper = styled.section`
    width: 320px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .ant-divider {
        margin: 0;
    }
`

const BodySection = styled.ul`
    flex: 1 1 100%;
    padding: 0;
    position: relative;
    padding-bottom: 120px;
`
const FooterSection = styled.div`
    flex: 0 0;
    min-height: 100px;
    width: 320px;
    position: fixed;
    bottom: 0;
    z-index: 10;
    background-color: ${props => props.theme.colors.lightGray};
    border-radius: ${props => props.theme.borderRadius.primary} ${props => props.theme.borderRadius.primary} 0 0;
`

export const CartDrawer = ({cart}) => {
    return (
        <Wrapper>
            <BodySection>
                {cart?.map((elemCart) => {
                    return <CartItem key={elemCart.id} {...elemCart} />
                })}
                {cart.length    ? <FooterSection>
                
                                </FooterSection>
                                : ''}

            </BodySection>
        </Wrapper>
    )
}