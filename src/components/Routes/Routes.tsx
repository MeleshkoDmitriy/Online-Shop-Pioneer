import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../pages/HomePage/HomePage"
import { ROUTES } from "../../utils/routes"
import { ProductPage } from "../../pages/ProductPage/ProductPage"
import { CategoryPage } from "../../pages/CategoryPage/CategoryPage"
import { FC } from "react"


export const AppRoutes:FC = () => {
    return (
        <Routes>
            <Route index element={ <HomePage /> }/>
            <Route path={ROUTES.PRODUCT} element={ <ProductPage /> }/>
            <Route path={ROUTES.CATEGORY} element={ <CategoryPage /> }/>
        </Routes>
    )
}