import { useSelector } from "react-redux"
import styled from "styled-components"
import { ProductItem } from "./ProductItem/ProductItem"


const ListWrapper = styled.section`
    width: 100%;

    border: 1px solid red;
    margin-top: ${props => props.theme.padding.primary}
`

export const ProductsList = () => {

    const { isLoading, list } = useSelector(({ products }) => products)
    console.log(list)

    return (
        <ListWrapper >
            {isLoading && <div>Loading...</div>}
            {list.map((product) => {
                return <ProductItem key={product.id} {...product} />
            })}
        </ListWrapper>
    )
}