import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../pages/HomePage/HomePage"
import { ROUTES } from "../../utils/routes"
import { ProductPage } from "../../pages/ProductPage/ProductPage"
import { CategoryPage } from "../../pages/CategoryPage/CategoryPage"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={ <HomePage /> }/>
            <Route path={ROUTES.PRODUCT} element={ <ProductPage /> }/>
            <Route path={ROUTES.CATEGORY} element={ <CategoryPage /> }/>
        </Routes>
    )
}