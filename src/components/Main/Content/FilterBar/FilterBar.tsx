import styled from "styled-components"

const BarWrapper = styled.section`
    width: 100%;
    height: 80px;
    background-color: ${props => props.theme.colors.lightGray};
    border-radius:  ${props => props.theme.borderRadius.primary};
`

export const FilterBar = () => {
    return (
        <BarWrapper>
           
        </BarWrapper>
    )
}