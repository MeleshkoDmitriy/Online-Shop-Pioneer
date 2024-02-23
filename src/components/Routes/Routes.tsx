import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../pages/HomePage/HomePage"
import { ROUTES } from "../../utils/routes"
import { ProductPage } from "../../pages/HomePage/ProductPage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={ <HomePage /> }/>
            <Route path={ROUTES.PRODUCT} element={ <ProductPage /> }/>
        </Routes>
    )
}