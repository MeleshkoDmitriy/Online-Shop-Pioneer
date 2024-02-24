import { Link } from "react-router-dom";
import { Card } from 'antd';
import { EyeOutlined, HeartOutlined, HeartFilled, ShoppingOutlined, ShoppingFilled } from '@ant-design/icons';
import { toCapitalize } from "../../../../../utils/toCapitalize";
import { Rate, Badge } from 'antd';
import { defineFeatureColor, defineFeatureString } from "../../../../../utils/defineFeature";

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
        <Link to={`/products/${id}`} style={{textDecoration: 'none'}}>
            <Badge.Ribbon text={defineFeatureString(features)} color={defineFeatureColor(features)}>
            <Card type="inner" title={title}
                hoverable
                style={{ width: 300}}
                cover={<img alt={title} src={img} style={{marginTop: '10px',filter: 'drop-shadow(7px 7px 5px gray)',}}/>}
                actions={[
                    <EyeOutlined style={{fontSize: '20px'}} key="isFavorite"  />
                ]}>
                <p style={{fontSize: '20px', margin: '0px'}}>{price} BYN {isSale && <span style={{textDecoration: 'line-through', color: 'gray', marginLeft: '10px', fontSize:'14px'}}>
                    {Math.floor(price * 1.43)} BYN</span>}
                </p>
                <Rate style={{margin: '10px 0'}} disabled allowHalf value={rating}/>
                <Meta description={toCapitalize(category)} />        
            </Card>
            </Badge.Ribbon>
        </Link>
    )
}