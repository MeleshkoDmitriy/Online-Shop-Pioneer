import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/services/services.api";



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProduct: builder.query({
            query:({ id }) => `/products/${id}`,
            providesTags: ['Product']
        }),
        updateFavorite: builder.mutation({
            query:({ id, isFavorite }) => ({
                url:  `/products/${id}`,
                method: "PATCH",
                body: { isFavorite: !isFavorite }
            })
        }),
        sendOrder: builder.mutation({
            query: order => ({
                url:  '/orders/',
                method: "POST",
                body: order
            })
        })
    })
})

export const { useGetProductQuery, useUpdateFavoriteMutation, useSendOrderMutation } = apiSlice;