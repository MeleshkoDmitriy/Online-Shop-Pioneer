import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { CATEGORIES_URL } from "../../utils/services/services.api";
import { TProduct } from "../../types/types";


interface IInitialState {
    list: TProduct[];
    isLoading: boolean;
    error: string | null;
  }
  

const initialState: IInitialState = {
    list: [],
    isLoading: false,
    error: null,
}

export const getCategories = createAsyncThunk('categories/getCategories',
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`${CATEGORIES_URL}`);

            return res.data;
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.list = action.payload;
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});


export default categoriesSlice.reducer;