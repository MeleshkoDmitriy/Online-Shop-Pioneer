import styled from "styled-components"
import { Container } from "../../styles/styles"
import { Aside } from "../../components/Main/Aside/Aside"
import { useNavigate, useParams } from "react-router-dom"
import { useGetProductQuery } from "../../Redux/Slices/api/apiSlice"
import { useEffect } from "react"
import { ROUTES } from "../../utils/routes"
import { SingleProduct } from "../../components/SingleProduct/SingleProduct"

const ProductPageWrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;
`


export const ProductPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { data, isLoading, isSuccess, isFetching } = useGetProductQuery({id});

    useEffect(() => {
        if(!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.HOME)
        }
    }, [isLoading, isSuccess, isFetching])

    console.log(id)
    console.log(data)


    return (
        <ProductPageWrapper>
            <Container >
                <Aside />
                <SingleProduct {...data} />
            </Container>
        </ProductPageWrapper>
    )
}