import styled from "styled-components"
import { Badge, Card, Collapse, Image, Rate, Skeleton, message } from 'antd';
import { toCapitalize } from "../../utils/toCapitalize";
import { HeartOutlined, HeartFilled, ShoppingOutlined } from '@ant-design/icons';
import defaultImage from '../../assets/pioneer-dj-logo.png'
import { addProductToCart, addProductToFavorites } from "../../Redux/Slices/userSlice";
import { Link } from "react-router-dom";
import { defineFeatureColor, defineFeatureString } from "../../utils/defineFeature";
import { FC, useEffect, useRef, useState } from "react";
import { useUpdateFavoriteMutation } from "../../Redux/Slices/api/apiSlice";
import { TProduct } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";

const SingleProductWrapper = styled.section`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.lightGray};
    border-radius: ${props => props.theme.borderRadius.primary};
    margin: ${props => props.theme.padding.primary};
    margin-right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .main {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        padding: ${props => props.theme.padding.primary};
    }
    
    .description {
        width: 100%;
        /* padding: ${props => props.theme.padding.primary}; */
        margin-inline: ${props => props.theme.padding.primary};
        text-align: justify;
        text-indent: ${props => props.theme.padding.primary};
    }

    .title {
        font-size: 14px;
        color: ${props => props.theme.colors.darkGray};
    }

    .card {
        display: flex;
        flex-direction: column;
    }

    .cardInfo {
        display:  flex;
        justify-content: space-between;
        align-items: center;

        .info {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .img {
            align-self: flex-start;
        }
    }

    .ant-card-body {
        flex: 1 0 auto;
    }
`

const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`
const { Meta } = Card;


export const SingleProduct: FC<TProduct> = (data) => {

    const { 
        id, 
        category,
        categoryId,
        title,
        img,
        price,
        description,
        rating,
        isFavorite,
        features,
    } = data;

    const { list } = useAppSelector((state) => state.categories);

    const [messageApi, contextHolder] = message.useMessage();
    const [ isLiked, setLiked] = useState(isFavorite);

    useEffect(() => {
        if(!data) return;

        setLiked(isFavorite)
    }, [ isFavorite ])

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

    const dispatch = useAppDispatch();
    const [ updateFavorite ] = useUpdateFavoriteMutation();


    const addToCart = () => {
        dispatch(addProductToCart(data));
        successCart(data);
    }

    const addToFavorites = () => {
        setLiked(prev => !prev);
        updateFavorite({ id, isFavorite }).unwrap();
        dispatch(addProductToFavorites(data));
        successFavorite();
    }

    const foundCategory = list.find((item) => {
        if(item.title === category) {
            return item;
        }
    })

    const textRef = useRef('Text Badge');
    const colorRef = useRef('White');

    useEffect(() => {
        if(!data) return;


        if(data && features) {
            textRef.current = defineFeatureString(features);
            colorRef.current = defineFeatureColor(features);
        }

    }, [data, features])

    return (
                <SingleProductWrapper>
                    {contextHolder}
                    <div className="main">
                        <div className="imageBlock">
                                {data   ?  <Image
                                                style={{filter: 'drop-shadow(5px 5px 5px gray)'}}
                                                width={400}
                                                src={img}
                                            />
                                        :   <Skeleton.Image active={!data} style={{width: "400px"}}/>
                                }
        
                        </div>
                        <Badge.Ribbon  text={textRef.current} color={colorRef.current}>
                                        <Card   title={title} 
                                                className="card"
                                                hoverable
                                                style={{width: 300 }}
                                                    actions={[
                                                        <ActionsWrapper>
                                                                {isLiked ? <HeartFilled     onClick={addToFavorites}
                                                                                            style={{fontSize: '20px', color: "#007de1"}}
                                                                                            title="Add to Favorites" 
                                                                                            key="isFavorite"/> 
                                                                        : <HeartOutlined   onClick={addToFavorites}
                                                                                            style={{fontSize: '20px'}}
                                                                                            title="Add to Favorites" 
                                                                                            key="isFavorite"/> }
                                                                <ShoppingOutlined   
                                                                    onClick={addToCart} 
                                                                    title="Add to Cart" 
                                                                    style={{fontSize: '20px', color: "#007de1"}} 
                                                                    key="isCart"/>
                                                        </ActionsWrapper>
                                                    ]}>
                                                <div className="cardInfo">
                                                    <div className="info">
                                                        <p style={{fontSize: '20px', margin: '0px'}}>{price} BYN {features?.isSale && <span style={{textDecoration: 'line-through', color: 'gray', marginLeft: '10px', fontSize:'14px'}}>
                                                            {Math.floor(price * 1.43)} BYN</span>}
                                                        </p>
                                                        <Rate style={{margin: '10px 0'}} disabled allowHalf value={rating}/>
                                                        <Meta description={category ? <Link to={`/categories/${categoryId}`}>{toCapitalize(category)}</Link> : <Link to={`/categories/${categoryId}`}>{category}</Link>} />      
                                                    </div>
                                                    <Link className="img" to={`/categories/${categoryId}`}>
                                                        <img
                                                            alt={category}
                                                            style={{width: "50px"}}
                                                            src={foundCategory ? foundCategory.image : defaultImage}
                                                            title={category}
                                                            />
                                                    </Link>
                                                </div>
                                        </Card>
                                    </Badge.Ribbon>
                    </div>
                    <div className="description">
                        <Collapse items={[{ key: 'Description', label: `${title} Description`, children: <p style={{margin: 0}}>{description}</p> }]} />
                    </div>
                </SingleProductWrapper>
    )
}