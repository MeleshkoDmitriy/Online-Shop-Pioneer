import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Slices/categoriesSlice";
import productsSlice from "./Slices/productsSlice";
import { apiSlice } from "./Slices/api/apiSlice";
import userSlice from "./Slices/userSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;