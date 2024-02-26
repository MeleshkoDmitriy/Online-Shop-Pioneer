import { Button, Rate } from "antd";
import styled from "styled-components"
import { toCapitalize } from "../../../../utils/toCapitalize";
import { ShoppingOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { addProductToCart, addProductToFavorites } from "../../../../Redux/Slices/userSlice";



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

export const FavoriteItem = (favorite) => {

    const { 
        title,
        img,
        category,
        price,
        rating,
        features
    } = favorite;

    const { isSale } = features;

    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(addProductToCart(favorite))
    }

    const removeFromFavorites = () => {
        dispatch(addProductToFavorites(favorite))
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