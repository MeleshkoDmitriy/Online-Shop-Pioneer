import styled from "styled-components"
import { useSelector } from "react-redux"
import { CategoryItem } from "./CategoryItem/CategoryItem"

const AsideWrapper = styled.aside`
    width: 200px;
    min-height: 530px;
    padding: ${props => props.theme.padding.primary};
    background: ${props => props.theme.colors.lightGray};

    nav {
        position: sticky;
        top: 90px;
    }

    ul {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 200px;
        gap: ${props => props.theme.padding.primary};
        padding: 0;
        margin: 0;
            li {
                list-style-type: none;
            }
    } 

    .line {
        position: relative;
        display: inline-block;
        color: ${props => props.theme.colors.black};
    }

    .line::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        height: 2px;
        width: 100%;
        background-color: ${props => props.theme.colors.black};
        transform-origin: left;
        transform: scaleX(0);
        transition: ${props => props.theme.transition.fast};
    }

    .line:hover::after {
        transform: scaleX(1);
    }
`



export const Aside = () => {

    const { list, isLoading } = useSelector(({ categories }) => categories)
    // console.log(list)

    return (
        <AsideWrapper>
            <nav>
                <ul>
                    { isLoading ? <div>Loading..</div> :  list?.map((category) => {
                                                            return <CategoryItem key={category.id} {...category} />})}
                </ul>
            </nav>
        </AsideWrapper>
    )
}
