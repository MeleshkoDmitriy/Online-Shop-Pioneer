import styled from "styled-components"

const AsideWrapper = styled.aside`
    width: 200px;
    height: 100%;
    padding: 20px;
    background: ${props => props.theme.colors.lightGray};
`

export const Aside = () => {
    return (
        <AsideWrapper>
            aside
        </AsideWrapper>
    )
}