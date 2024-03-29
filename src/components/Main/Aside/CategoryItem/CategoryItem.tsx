import styled from "styled-components"
import { Link } from "react-router-dom"
import { toCapitalize } from "../../../../utils/toCapitalize"
import  defaultImage  from '../../../../assets/pioneer-dj-logo.png'
import { resetFilters } from "../../../../Redux/Slices/productsSlice"
import { FC } from "react"
import { useAppDispatch } from "../../../../hooks/hook"


const Li = styled.li`
    list-style-type: none;
    width: 200px;
    height: 80px;
    background-color: ${props => props.theme.colors.white};
    border-radius: ${props => props.theme.borderRadius.primary};
    transition: ${props => props.theme.transition.fast};

    .container {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .image {
        height: 60px;
        padding-left: 10px;
        margin-right: 10px;
    }

    span {
        font-size: 20px;
        transition: ${props => props.theme.transition.fast};

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
        background-color: ${props => props.theme.colors.blue};
    }

    span {
        &:hover {
            color: ${props => props.theme.colors.blue};
            transition: ${props => props.theme.transition.fast};
        }
    }
`
interface CategoryItemProps {
    id: number;
    title: string;
    image: string;
    isActiveId?: string | number
}

export const CategoryItem:FC<CategoryItemProps> = ({ id = 0, title = 'Loading..', image = defaultImage, isActiveId }) => {

    const dispatch = useAppDispatch();

    const reset = () => {
        dispatch(resetFilters())
    }
        
    return (
        <Li onClick={reset} style={{boxShadow: `${isActiveId == id ? '3px 3px 3px #007ce190' : ''}`}}>
                <Link to={`/categories/${id}`} style={{textDecoration: 'none'}}>
                    <div className="container">
                        <img className="image" src={image} alt="{title}" />
                        <span className="line" style={{color: `${isActiveId == id ? '#007de1' : ''}`}}>
                            {toCapitalize(title)}
                        </span>
                    </div>
                </Link>
        </Li>
    )
}

