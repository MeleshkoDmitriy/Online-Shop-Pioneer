import styled from "styled-components"
import { Link } from "react-router-dom"
import { toCapitalize } from "../../../../utils/toCapitalize"
import  defaultImage  from '../../../../assets/pioneer-dj-logo.png'

const Li = styled.li`
    list-style-type: none;
    width: 200px;
    height: 40px;
    background-color: ${props => props.theme.colors.white};
    border-radius: 10px;

    .container {
        display: flex;
        align-items: center;
    }

    .image {
        width: 50px;
        padding-left: 10px;
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

export const CategoryItem = ({ id = 0, title = 'Loading..', image = defaultImage }) => {
 
    return (
        <Li>
            <Link to={`/categories/${id}`} style={{textDecoration: 'none'}}>
                <div className="container">
                    <img className="image" src={image} alt="{title}" />
                    <span className="line">{toCapitalize(title)}</span>
                </div>
            </Link>
        </Li>
    )
}