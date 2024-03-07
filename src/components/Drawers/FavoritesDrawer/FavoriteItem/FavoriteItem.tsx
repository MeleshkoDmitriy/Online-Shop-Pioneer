import { Button, Rate, message } from "antd";
import styled from "styled-components"
import { toCapitalize } from "../../../../utils/toCapitalize";
import { ShoppingOutlined, DeleteOutlined } from '@ant-design/icons';
import { addProductToCart, removeProductFromFavorites } from "../../../../Redux/Slices/userSlice";
import { useUpdateFavoriteMutation } from "../../../../Redux/Slices/api/apiSlice";
import { useAppDispatch } from "../../../../hooks/hook";
import { TProduct } from "../../../../types/types";
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
        justify-content: space-evenly;
        align-items: flex-start;
    }

    .actions {
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        align-items: center;
    }
`

export const FavoriteItem:FC<TProduct> = (favorite: TProduct) => {

    const [ messageApi, contextHolder ] = message.useMessage();
    const [ updateFavorite ] = useUpdateFavoriteMutation();

    const dispatch = useAppDispatch();

    const { 
        title,
        img,
        category,
        price,
        rating,
        features,
    } = favorite;

    const { isSale } = features;

    const successCart = (data: TProduct) => {
        messageApi.open({
          type: 'success',
          content: `${data.title} was added to Cart`,
        });
      };

    const addToCart = () => {
        dispatch(addProductToCart(favorite));
        successCart(favorite);
    }

    const removeFromFavorites = () => {
        updateFavorite(favorite).unwrap();
        dispatch(removeProductFromFavorites(favorite));
    }

    return (
        <Item>
            {contextHolder}
            <div className="image">
                <img src={img} alt={title}/>
            </div>
            <div className="info">
                <span style={{fontSize: '10px'}}><strong style={{fontSize: '14px'}}>{title}</strong> {toCapitalize(category)}</span>
                <span style={{fontSize: '12px'}}>
                    <strong>{price}  BYN</strong> {isSale && <span style={{textDecoration: 'line-through', color: 'gray', marginLeft: '5px', fontSize:'10px'}}>
                        {Math.floor(price * 1.43)} BYN</span>}
                </span>
                <Rate disabled allowHalf value={rating}/>
            </div>
            <div className="actions">
                <Button onClick={addToCart}
                        type="primary" icon={<ShoppingOutlined />}
                        size="small">
                    In Cart
                </Button>
                <Button onClick={removeFromFavorites}
                        type="primary" danger icon={<DeleteOutlined />}
                        size="small">
                    Delete
                </Button>
            </div>
        </Item>
    )
}