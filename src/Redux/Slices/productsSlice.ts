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
        list: [],
        filtered: [],
        related: [],
        isLoading: false,
    },
    reducers: {
        filterByPrice: (state, { payload }) => {
            state.filtered = state.list.filter((item) => item.price < payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
        }),
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export const { filterByPrice } = productsSlice.actions;

export default productsSlice.reducer;