import { useParams } from "react-router-dom"
import { Container } from "../../styles/styles";
import { Aside } from "../../components/Main/Aside/Aside";
import styled from "styled-components";
import { ProductItem } from "../../components/Main/Content/ProductsList/ProductItem/ProductItem";
import { Skeleton } from "antd";
import { loadingArray } from "../../utils/variable";
import { useAppSelector } from "../../hooks/hook";
import { FC } from "react";

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

const SkeletonCategory = styled.div`
    width: 300px;
    height: 450px;
`

export const CategoryPage:FC = () => {

    const { id } = useParams();

    const { list, isLoading } = useAppSelector((state) => state.products)

    const categoryList = list.filter((product) => product.categoryId === Number(id))

    return (
        <CategoryPageWrapper>
            <Container>
                <Aside isActiveId={id} />
                <CategoryListWrapper>
                    {isLoading  ?   loadingArray.slice(0, 3).map((_, i) => {
                                        return (
                                            <SkeletonCategory key={i}>
                                                <Skeleton.Button    active={isLoading}
                                                                    shape="round"
                                                                    style={{width: "300px", height: "450px"}}/>
                                            </SkeletonCategory>
                                        )})
                                : categoryList?.map((elem) => {
                        return <ProductItem key={elem.id} {...elem} />
                    })}
                </CategoryListWrapper>
            </Container>
        </CategoryPageWrapper>
    )
}