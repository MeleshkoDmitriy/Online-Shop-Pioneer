import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Slices/categoriesSlice";
import productsSlice from "./Slices/productsSlice";
import { apiSlice } from "./Slices/api/apiSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
    devTools: true,
})