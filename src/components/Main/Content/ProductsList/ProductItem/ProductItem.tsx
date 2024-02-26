import { Link } from "react-router-dom";
import { Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { toCapitalize } from "../../../../../utils/toCapitalize";
import { Rate, Badge } from 'antd';
import { defineFeatureColor, defineFeatureString } from "../../../../../utils/defineFeature";
import styled from "styled-components";

const Wrapper = styled.div`
    transition: ${props => props.theme.transition.fast};

    &:hover {
        transform: translateY(-7px);
    }
    .ant-card-hoverable:hover {
    box-shadow: 7px 7px 5px ${props => props.theme.colors.blue}; // Измените цвет тени здесь
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

    const { isSale } = features;

    return (
        <Wrapper>
            <Link to={`/products/${id}`} style={{textDecoration: 'none'}}>
                <Badge.Ribbon text={defineFeatureString(features)} color={defineFeatureColor(features)}>
                <Card type="inner" title={title}
                    hoverable
                    style={{ width: 300}}
                    cover={<img alt={title} src={img} style={{marginTop: '10px',filter: 'drop-shadow(7px 7px 5px gray)',}}/>}
                    actions={[
                        <EyeOutlined style={{fontSize: '20px'}} key="isFavorite" title="See details" />
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