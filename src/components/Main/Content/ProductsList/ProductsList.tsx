import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { ProductItem } from "./ProductItem/ProductItem"
import { Skeleton } from "antd"
import { loadingArray } from "../../../../utils/variable"


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

const SkeletonProduct = styled.div`
    width: 300px;
    height: 450px;
`

export const ProductsList = () => {

    const { products: { isLoading, list } } = useSelector((state) => state);

    return (
        <ListWrapper >
            {isLoading  ? loadingArray.map((_, i) => {
                            return (
                                    <SkeletonProduct key={i}>
                                            <Skeleton.Button    active={isLoading}
                                                                shape="round"
                                                                style={{width: "300px", height: "450px"}}/>
                                    </SkeletonProduct>
                            )
            })
                        : list?.map((item) => {
                return <ProductItem key={item.id} {...item} />
            })}
        </ListWrapper>
    )
}

            