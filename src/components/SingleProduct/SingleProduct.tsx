import styled from "styled-components"
import { Badge, Card, Collapse, Image, Rate, message } from 'antd';
import Typography from "antd/es/typography/Typography";
import { toCapitalize } from "../../utils/toCapitalize";
import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import defaultImage from '../../assets/pioneer-dj-logo.png'
import { addProductToCart, addProductToFavorites } from "../../Redux/Slices/userSlice";
import { Link } from "react-router-dom";
import { defineFeatureColor, defineFeatureString } from "../../utils/defineFeature";
import { useEffect, useRef, useState } from "react";



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

const { Paragraph } = Typography;
const { Meta } = Card;


export const SingleProduct = (data) => {

    const { list } = useSelector(({ categories }) => categories);

    const [messageApi, contextHolder] = message.useMessage();
    const [ isLiked, setLiked] = useState(false);


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
        isCart,
        features
    } = data;

    useEffect(() => {
        if(!data) return;

        setLiked(isFavorite)
    }, [])



    const favoriteContent = () => {
        return isLiked  ? title + " was deleted from Favorites"
                        : title + " was added to Favorites"
    }
    
    const successFavorite = (data) => {
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

    const addToCart = () => {
        dispatch(addProductToCart(data))
        successCart(data)
    }

    const addToFavorites = () => {
        setLiked(prev => !prev)
        dispatch(addProductToFavorites(data))
        successFavorite(data)
    }

    const categoryImage = list.find((item) => {
        if(item.title === category) {
            return item;
        }
    })

    const textRef = useRef('Text Badge');
    const colorRef = useRef('White')

    useEffect(() => {
        if(!data) return;


        if(data && features) {
            console.log(features)
            textRef.current = defineFeatureString(features);
            colorRef.current = defineFeatureColor(features);
            console.log(textRef, colorRef)
        }

    }, [data, features])


    return (
        <SingleProductWrapper>
            {contextHolder}
            <div className="main">
                <div className="imageBlock">
                        <Image
                            style={{filter: 'drop-shadow(5px 5px 5px gray)'}}
                            width={400}
                            src={img}
                        />
                </div>
                <Badge.Ribbon  text={textRef.current} color={colorRef.current}>
                                <Card   title={title} 
                                        className="card"
                                        hoverable
                                        style={{width: 300 }}
                                        actions={[
                                                    <HeartOutlined  onClick={addToFavorites}
                                                                    style={{fontSize: '20px'}} 
                                                                    title="Add to Favorites" 
                                                                    key="isFavorite" />,
                                                    <ShoppingOutlined   onClick={addToCart} 
                                                                        title="Add to Cart" 
                                                                        style={{fontSize: '20px'}} 
                                                                        key="isCart"/>
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
                                                    src={categoryImage ? categoryImage.image : defaultImage}
                                                    title={category}
                                                    />
                                            </Link>
                                        </div>
                                </Card>
                            </Badge.Ribbon>
            </div>
            <div className="description">
                <Collapse items={[{ key: 'Description', label: `${title} Description`, children: <Paragraph>{description}</Paragraph> }]} />
            </div>
        </SingleProductWrapper>
    )
}