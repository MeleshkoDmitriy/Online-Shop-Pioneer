import { Action, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Slices/categoriesSlice";
import productsSlice from "./Slices/productsSlice";
import { apiSlice } from "./Slices/api/apiSlice";
import userSlice from "./Slices/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

type AppThunkDispatch = ThunkDispatch<RootState, undefined, Action>;

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});


setupListeners(store.dispatch as AppThunkDispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;