import styled from "styled-components"
import { FavoriteItem } from "./FavoriteItem/FavoriteItem"
import { TProduct } from "../../../types/types"
import { FC } from "react"



const Wrapper = styled.section`
    width: 320px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BodySection = styled.ul`
    flex: 1 1 100%;
    padding: 0;
`

interface FavoritesDrawerProps {
    favorites: TProduct[]
}

export const FavoritesDrawer:FC<FavoritesDrawerProps> = ({favorites}) => {
    return (
        <Wrapper>
            <BodySection>
                {favorites?.map((fav) => {
                    return <FavoriteItem key={fav.id} {...fav} />
                })}
            </BodySection>
        </Wrapper>
    )
}