import styled from "styled-components"
import { Footer } from "../../components/Footer/Footer"
import { Header } from "../../components/Header/Header"
import { Main } from "../../components/Main/Main"

const HomePageWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const MainFlexWrapper = styled.div`
    flex: 1 1 auto;
`

export const HomePage = () => {
    return (
        <HomePageWrapper>
            <Header />
            <MainFlexWrapper >
                <Main />
            </MainFlexWrapper>
            <Footer />
        </HomePageWrapper>
    )
}