import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Slices/categoriesSlice";
import productsSlice from "./Slices/productsSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
    },
    devTools: true,
})