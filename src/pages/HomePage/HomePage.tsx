import styled from "styled-components"
import { Container } from "../../styles/styles"
import { Aside } from "../../components/Main/Aside/Aside"
import { Content } from "../../components/Main/Content/Content"
import { FC } from "react"

const HomePageWrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;
`
export const HomePage:FC = () => {
    return (
        <HomePageWrapper>
            <Container >
                <Aside />
                <Content />
            </Container>
        </HomePageWrapper>
    )
}