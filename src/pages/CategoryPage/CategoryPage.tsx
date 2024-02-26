import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { Container } from "../../styles/styles";
import { Aside } from "../../components/Main/Aside/Aside";
import styled from "styled-components";
import { ProductItem } from "../../components/Main/Content/ProductsList/ProductItem/ProductItem";

const CategoryPageWrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;
`

const CategoryListWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    padding: ${props => props.theme.padding.primary};
    gap: ${props => props.theme.padding.primary};
`

export const CategoryPage = () => {

    
    const { id } = useParams();

    const { list } = useSelector(({ products }) => products)


    const categoryList = list.filter((product) => product.categoryId == id)

    console.log(categoryList)

    return (
        <CategoryPageWrapper>
            <Container>
                <Aside isActiveId={id} />
                <CategoryListWrapper>
                    {categoryList?.map((elem) => {
                        return <ProductItem key={elem.id} {...elem} />
                    })}
                </CategoryListWrapper>
            </Container>
        </CategoryPageWrapper>
    )
}