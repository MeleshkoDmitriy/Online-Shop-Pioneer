import { Link } from "react-router-dom";



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

    const { isSale, isNew, isTop } = features;

    return (
        <Link to={`products/${id}`}>
            <div>{title}</div>
        </Link>
    )
}