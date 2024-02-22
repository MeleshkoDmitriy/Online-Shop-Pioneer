import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
    },
    devTools: true,
})