import { Link } from "react-router-dom";
import { Card, message } from 'antd';
import { HeartOutlined, ShoppingOutlined, HeartFilled } from '@ant-design/icons';
import { toCapitalize } from "../../../../../utils/toCapitalize";
import { Rate, Badge } from 'antd';
import { defineFeatureColor, defineFeatureString } from "../../../../../utils/defineFeature";
import styled from "styled-components";
import { addProductToCart, addProductToFavorites } from "../../../../../Redux/Slices/userSlice";
import { FC, MouseEvent, useEffect, useState } from "react";
import { useUpdateFavoriteMutation } from "../../../../../Redux/Slices/api/apiSlice";
import { TProduct } from "../../../../../types/types";
import { useAppDispatch } from "../../../../../hooks/hook";

const Wrapper = styled.div`
    transition: ${props => props.theme.transition.fast};

    &:hover {
        transform: translateY(-3px);
    }
    .ant-card-hoverable:hover {
        box-shadow: 7px 7px 5px ${props => props.theme.colors.lightGray};
    }
`
const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const { Meta } = Card;

export const ProductItem:FC<TProduct> = (product) => {

    const { 
        id, 
        category,
        title,
        img,
        price,
        rating,
        isFavorite,
        features
    } = product;

    const dispatch = useAppDispatch();
    const [ updateFavorite ] = useUpdateFavoriteMutation();

    const [messageApi, contextHolder] = message.useMessage();
    const [ isLiked, setLiked] = useState<boolean>(isFavorite);

    useEffect(() => {
        if(!product) return;

        setLiked(isFavorite);
    }, [ isFavorite ])

    const { isSale } = features;

    const favoriteContent = () => {
        return isLiked  ? title + " was deleted from Favorites"
                        : title + " was added to Favorites"
    }

    const successFavorite = () => {
        messageApi.open({
          type: 'success',
          content: favoriteContent(),
        });
      };

      const successCart = (data: TProduct) => {
          messageApi.open({
            type: 'success',
            content: `${data.title} was added to Cart`,
          });
        };

    const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(addProductToCart(product));
        successCart(product);
    }

    const addToFavorites = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setLiked(prev => !prev);
        updateFavorite({ id, isFavorite }).unwrap();
        dispatch(addProductToFavorites(product));
        successFavorite();
    }

    return (
        <Wrapper>
            {contextHolder}
            <Link to={`/products/${id}`} style={{textDecoration: 'none'}}>
                <Badge.Ribbon text={defineFeatureString(features)} color={defineFeatureColor(features)}>
                <Card type="inner" title={title}
                    hoverable
                    style={{ width: 300}}
                    cover={<img alt={title} src={img} style={{marginTop: '10px', filter: 'drop-shadow(7px 7px 5px gray)',}}/>}
                    actions={[
                        <ActionsWrapper>
                                {isLiked ? <HeartFilled     onClick={addToFavorites}
                                                            style={{fontSize: '20px', color: "#007de1"}}
                                                            title="Add to Favorites" 
                                                            key="isFavorite"/> 
                                         : <HeartOutlined   onClick={addToFavorites}
                                                            style={{fontSize: '20px'}}
                                                            title="Add to Favorites" 
                                                            key="isFavorite"/> },
                                <ShoppingOutlined   
                                    onClick={addToCart} 
                                    title="Add to Cart" 
                                    style={{fontSize: '20px', color: "#007de1"}} 
                                    key="isCart"/>
                        </ActionsWrapper>
                    ]}>
                    <p style={{fontSize: '20px', margin: '0px'}}>{price} BYN {isSale && <span style={{textDecoration: 'line-through', color: 'gray', marginLeft: '10px', fontSize:'14px'}}>
                        {Math.floor(price * 1.43)} BYN</span>}
                    </p>
                    <Rate style={{margin: '10px 0'}} disabled allowHalf value={rating}/>
                    <Meta description={toCapitalize(category)} />        
                </Card>
                </Badge.Ribbon>
            </Link>
        </Wrapper>
    )
}