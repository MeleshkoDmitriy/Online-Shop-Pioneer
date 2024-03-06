import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { PRODUCTS_URL } from "../../utils/services/services.api"
import { TProduct } from "../../types/types"

export const getProducts = createAsyncThunk<TProduct[], undefined>('products/getProducts',
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

interface IInitialState {
    initialList: TProduct[],
    list: TProduct[],
    isLoading: boolean,
    defaultsSelect: string[],
}

const initialState: IInitialState = {
    initialList: [],
    list: [],
    isLoading: false,
    defaultsSelect: ['all products', 'default order'],
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
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
                } else {
                    return 0;
                }
            })
            state.list = listCopy;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getProducts.fulfilled, (state, action: PayloadAction<TProduct[]>) => {
            state.initialList = action.payload;
            state.list = action.payload;
            state.isLoading = false;
        })
            .addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export const { filterByFeatures, sortByPrice, resetFilters } = productsSlice.actions;

export default productsSlice.reducer;