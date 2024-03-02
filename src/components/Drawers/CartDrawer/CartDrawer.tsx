import { Button, message } from "antd"
import styled from "styled-components"
import { CartItem } from "./CartItem/CartItem"
import { CheckOutlined } from '@ant-design/icons'
import { useSendOrderMutation } from "../../../Redux/Slices/api/apiSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { cleanUpCart } from "../../../Redux/Slices/userSlice"



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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    padding: ${props => props.theme.padding.primary};

    .total {
        font-size: 20px;
    }

    .order {
        width: 100%;
    }
`

export const CartDrawer = ({cart}) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [sendOrder, { isLoading: isLoadingSendOrder }] = useSendOrderMutation();
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((sum, product) => {
        return sum + (product.price * product.quantity)
    }, 0)

    const makeOrder = () => {
        sendOrder(cart).unwrap()
        .then(() => {
            messageApi.open({
                type: 'loading',
                content: 'Your order is processiding...',
                duration: 1,
              });
              setTimeout(() => {
                messageApi.open({
                  type: 'success',
                  content: 'Your order is accepted!',
                  duration: 2,
                });
                dispatch(cleanUpCart());
              }, 1100)
        })
        .catch(error => {
            messageApi.open({
              type: 'error',
              content: error.message,
              duration: 2
            });
          });
      };
      

    return (
        <Wrapper>
            {contextHolder}
            <BodySection>
                {cart?.map((elemCart) => {
                    return <CartItem key={elemCart.id} {...elemCart} />
                })}
                {cart.length    ?   <FooterSection>
                                        <div className="total"><strong>Total price: {totalPrice}</strong> BYN</div>
                                        <Button onClick={makeOrder}
                                                className="order" type="primary">Make order<CheckOutlined /></Button>
                                    </FooterSection>
                                : ''}

            </BodySection>
        </Wrapper>
    )
}