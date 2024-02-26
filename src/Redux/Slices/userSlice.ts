import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { PRODUCTS_URL } from "../../utils/services/services.api"

// export const getProducts = createAsyncThunk('products/getProducts',
//     async (_, thunkApi) => {
//         try {
//             const res = await axios.get(`${PRODUCTS_URL}`)
//             return res.data;
//         } catch (error) {
//             console.log(error);
//             return thunkApi.rejectWithValue(error);
//         }
//     }
// )

const userSlice = createSlice({
    name: 'user',
    initialState: {
        cart: [],
        favorites: [],
        isLoading: false,
    },
    reducers: {
        addProductToCart: (state, { payload }) => {
            let newCart = [...state.cart];

            const foundProduct = state.cart.find(({ id }) => id === payload.id);

            if (foundProduct) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id   ? { ...item, quantity: ++item.quantity }
                                                    : item
                })
            } else {
                newCart.push({ ...payload, quantity: 1 })
            }

            state.cart = newCart;
            console.log(state.cart)

        },
        minusProductFromCart: (state, { payload }) => {
            let newCart = [...state.cart];

            const productQuantity = state.cart.find((product) => {
                if(product.id === payload.id) {
                    return product.quantity;
                }
            });

            if (productQuantity > 1) {
                console.log('productQuantity' ,productQuantity)

                newCart = newCart.map((item) => {
                    return { ...item, quantity: --item.quantity }
                })
            } else {
                console.log('productQuantity', productQuantity)
                newCart = newCart.filter((product) => product.id !== payload.id)
            }

            state.cart = newCart;
            console.log(state.cart)
        },
        removeProductFromCart: (state, { payload }) => {
            let newCart = [...state.cart];

            const foundProduct = state.cart.find(({ id }) => id === payload.id);

            if (foundProduct) {
                newCart = newCart.filter((product) => product.id !== payload.id)
            } else {
                return;
            }

            state.cart = newCart;
            console.log(state.cart)
        },
        addProductToFavorites: (state, { payload }) => {
            let newFavorites = [...state.favorites];

            const foundProduct = state.favorites.find(({ id }) => id === payload.id);

            if (foundProduct) {
                newFavorites = newFavorites.filter((fav) => fav.id !== payload.id)
            } else {
                newFavorites.push({ ...payload, quantity: 1 })
            }

            state.favorites = newFavorites;
            console.log(state.favorites)

        },
    },
    extraReducers: (builder) => {
        // builder.addCase(getProducts.pending, (state) => {
        //     state.isLoading = true;
        // }),
        // builder.addCase(getProducts.fulfilled, (state, action) => {
        //     state.list = action.payload;
        //     state.isLoading = false;
        // }),
        // builder.addCase(getProducts.rejected, (state) => {
        //     state.isLoading = false;
        // })
    }
})

export const { addProductToCart, addProductToFavorites, removeProductFromCart, minusProductFromCart } = userSlice.actions;

export default userSlice.reducer;