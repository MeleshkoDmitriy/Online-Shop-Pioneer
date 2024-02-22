import styled from "styled-components"
import { FilterBar } from "./FilterBar/FilterBar"
import { ProductsList } from "./ProductsList/ProductsList"

const ContentWrapper = styled.section`
    width: 100%;
    min-height: 530px;
    padding: ${props => props.theme.padding.primary};
    flex: 1 1 auto;
`

export const Content = () => {



    return (
        <ContentWrapper>
            <FilterBar />
            <ProductsList />
        </ContentWrapper>
    )
}

// {isLoading   ? <h2>Loading..</h2>
// : list.map((list) => {
//     return <div>{list.title}{list.category}{list.price}</div>
// } )}