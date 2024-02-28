import { Link } from "react-router-dom";
import { Card, message } from 'antd';
import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { toCapitalize } from "../../../../../utils/toCapitalize";
import { Rate, Badge } from 'antd';
import { defineFeatureColor, defineFeatureString } from "../../../../../utils/defineFeature";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProductToCart, addProductToFavorites } from "../../../../../Redux/Slices/userSlice";
import { useState } from "react";

const Wrapper = styled.div`
    transition: ${props => props.theme.transition.fast};

    &:hover {
        transform: translateY(-7px);
    }
    .ant-card-hoverable:hover {
        box-shadow: 7px 7px 5px ${props => props.theme.colors.blue};
        /* box-shadow: 7px 7px 5px #0000ff; */
    }
`

const { Meta } = Card;

export const ProductItem = (product) => {

    const { 
        id, 
        category,
        title,
        img,
        price,
        description,
        rating,
        isFavorite,
        isCart,
        features
    } = product;

    const [messageApi, contextHolder] = message.useMessage();
    const [ isLiked, setLiked] = useState(isFavorite);

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

      const successCart = (data) => {
          messageApi.open({
            type: 'success',
            content: `${data.title} was added to Cart`,
          });
        };
    
    const dispatch = useDispatch()

    const addToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addProductToCart(product));
        successCart(product);
    }

    const addToFavorites = (e) => {
        setLiked(prev => !prev)
        e.preventDefault();
        e.stopPropagation();
        dispatch(addProductToFavorites(product));
        successFavorite(product);
    }

    return (
        <Wrapper>
            {contextHolder}
            <Link to={`/products/${id}`} style={{textDecoration: 'none'}}>
                <Badge.Ribbon text={defineFeatureString(features)} color={defineFeatureColor(features)}>
                <Card type="inner" title={title}
                    hoverable
                    style={{ width: 300}}
                    cover={<img alt={title} src={img} style={{marginTop: '10px',filter: 'drop-shadow(7px 7px 5px gray)',}}/>}
                    actions={[
                        <HeartOutlined  
                            onClick={addToFavorites}
                            style={{fontSize: '20px'}} 
                            title="Add to Favorites" 
                            key="isFavorite" />,
                        <ShoppingOutlined   
                            onClick={addToCart} 
                            title="Add to Cart" 
                            style={{fontSize: '20px'}} 
                            key="isCart"/>
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