import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { ProductItem } from "./ProductItem/ProductItem"
import { useEffect } from "react"
import { filterByPrice } from "../../../../Redux/Slices/productsSlice"


const ListWrapper = styled.section`
    width: 100%;
    margin-top: ${props => props.theme.padding.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: ${props => props.theme.padding.primary}
    /* @media */
`

export const ProductsList = () => {

    const dispatch = useDispatch()

    const { products: { isLoading, list, filtered } } = useSelector((state) => state)
    console.log(list)
    console.log('f', filtered)


    useEffect(() => {
        if(!list.length) return;

        dispatch(filterByPrice(1))
    }, [dispatch, list.length])

    return (
        <ListWrapper >
            {isLoading && <div>Loading...</div>}
            {list.map((item) => {
                return <ProductItem key={item.id} {...item} />
            })}
        </ListWrapper>
    )
}


/* 
{filtered.map((filter) => {
            return <ProductItem key={filter.id} {...filter} />
                        })} */

            