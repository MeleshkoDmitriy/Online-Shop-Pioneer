import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { PRODUCTS_URL } from "../../utils/services/services.api"

export const getProducts = createAsyncThunk('products/getProducts',
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`${PRODUCTS_URL}`)
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        initialList: [],
        list: [],
        isLoading: false,
        defaultsSelect: ['all products', 'default order'],
    },
    reducers: {
        resetFilters: (state) => {
            state.list = state.initialList;
            
        },
        filterByFeatures: (state, { payload }) => {
            state.list = [...state.initialList]
            let listCopy = [...state.list];
            listCopy = listCopy.filter((product) => {
              if (payload === 'all products') {
                return product;
              } else if (payload === 'top') {
                return product.features.isTop;
              } else if (payload === 'new') {
                return product.features.isNew;
              } else if (payload === 'sale') {
                return product.features.isSale;
              } else {
                return  product.features.isTop === false &&
                        product.features.isNew === false &&
                        product.features.isSale === false;
              }
            });
            state.list = listCopy;
        },
        sortByPrice: (state, { payload }) => {
            let listCopy = [...state.list];
            listCopy = listCopy.sort((a, b) => {
                if (payload === 'default order') {
                    return a.id - b.id;
                } else if (payload === 'from chip to expensive') {
                    return a.price - b.price;
                } else if (payload === 'from expensive to ship') {
                    return b.price - a.price;
                }
            })
            state.list = listCopy;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.initialList = action.payload;
            state.list = action.payload;
            state.isLoading = false;
        }),
        builder.addCase(getProducts.rejected, (state) => {
            // state.isLoading = false;
        })
    }
})

export const { filterByFeatures, sortByPrice, resetFilters } = productsSlice.actions;

export default productsSlice.reducer;