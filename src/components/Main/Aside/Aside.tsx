import styled from "styled-components"
import { useSelector } from "react-redux"
import { CategoryItem } from "./CategoryItem/CategoryItem"
import { Skeleton } from "antd"
import { loadingArray } from "../../../utils/variable"


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

const SkeletonCategory = styled.div`
        width: 200px;
        height: 80px;
        display: flex;
        align-items: center;
`



export const Aside = ({isActiveId}) => {

    

    const { list, isLoading: isLoadingCategories } = useSelector(({ categories }) => categories);


    return (
        <AsideWrapper>
            <nav>
                <ul>
                    { isLoadingCategories ? loadingArray.map((_, i) => {
                                                return (
                                                    <SkeletonCategory key={i}>
                                                            <Skeleton.Button    active={isLoadingCategories}
                                                                                shape="round"
                                                                                style={{width: "200px", height: "80px"}} />
                                                    </SkeletonCategory>
                                                )})
                                          :  list?.map((category) => {
                                                return <CategoryItem    key={category.id} 
                                                                        isActiveId={isActiveId} 
                                                                        {...category} />})}
                </ul>
            </nav>
        </AsideWrapper>
    )
}
