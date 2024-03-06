import { Button, Input } from "antd";
import styled from "styled-components"
import { toCapitalize } from "../../../../utils/toCapitalize";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { addProductToCart, minusProductFromCart, removeProductFromCart } from "../../../../Redux/Slices/userSlice";
import { TCartProduct } from "../../../../types/types";
import { useAppDispatch } from "../../../../hooks/hook";
import { FC } from "react";



const Item = styled.li`
    list-style-type: none;
    width: 320px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .image img {
            max-width: 100px;
    }


    .info {
        width: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .counter {
            width: 100%;
            display: flex;
            justify-content: space-evenly;

            .element {
                max-width: 30px;
            }
        }
    }

    .productTotal {
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        align-items: center;
    }
`

export const CartItem:FC = (cart: TCartProduct) => {

    const { 
        title,
        img,
        category,
        price,
        features,
        quantity
    } = cart;

    const { isSale } = features;

    const dispatch = useAppDispatch();


    const addToCart = () => {
        dispatch(addProductToCart(cart));
    }

    const minusProduct = () => {
        dispatch(minusProductFromCart(cart));
    }

    const removeFromCart = () => {
        dispatch(removeProductFromCart(cart));
    }


    return (
        <Item>
            <div className="image">
                <img src={img} alt={title}/>
            </div>
            <div className="info">
                <span style={{fontSize: '10px'}}><strong style={{fontSize: '14px'}}>{title}</strong> {toCapitalize(category)}</span>
                <span style={{fontSize: '12px'}}>
                    <strong>{price}  BYN</strong> {isSale && <span style={{textDecoration: 'line-through', color: 'gray', marginLeft: '5px', fontSize:'10px'}}>
                        {Math.floor(price * 1.43)} BYN</span>}
                </span>
                <div className="counter">
                    <Button onClick={addToCart}
                            className="element" icon={<PlusOutlined />} type="primary">
                    </Button>
                    <Input readOnly value={quantity}
                                    style={{width: '30px', padding: '5px', textAlign: 'center'}}
                                    />
                    <Button onClick={minusProduct}
                            className="element" icon={<MinusOutlined />} danger>
                    </Button>

                </div>
            </div>
            <div className="productTotal">
                <div>
                    <strong>{price * quantity}</strong> BYN
                </div>
                <Button onClick={removeFromCart}
                        type="primary" danger icon={<DeleteOutlined />}
                        size="small">
                    Delete
                </Button>
            </div>
        </Item>
    )
}