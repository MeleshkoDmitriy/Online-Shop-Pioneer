import styled from "styled-components"
import { Aside } from "./Aside/Aside"
import { Content } from "./Content/Content"
import { Container } from "../../styles/styles"

const MainWrapper = styled.main`
    width: 100%;
    height: 100%;

`

export const Main = () => {
    return (
        <MainWrapper>
            <Container >
                <Aside />
                <Content />
            </Container>
        </MainWrapper>
    )
}