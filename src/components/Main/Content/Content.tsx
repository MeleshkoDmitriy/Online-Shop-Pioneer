import styled from "styled-components"
import { FilterBar } from "./FilterBar/FilterBar"
import { ProductsList } from "./ProductsList/ProductsList"
import { FC } from "react"

const ContentWrapper = styled.section`
    width: 100%;
    min-height: 530px;
    padding: ${props => props.theme.padding.primary};
    padding-right: 0;
    flex: 1 1 auto;
`

export const Content:FC = () => {
    return (
        <ContentWrapper>
            <FilterBar />
            <ProductsList />
        </ContentWrapper>
    )
}
