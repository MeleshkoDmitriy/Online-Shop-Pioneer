import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../pages/HomePage/HomePage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={ <HomePage /> }/>
        </Routes>
    )
}