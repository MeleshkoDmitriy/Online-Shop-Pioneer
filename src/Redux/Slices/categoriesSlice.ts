import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { CATEGORIES_URL } from "../../utils/services/services.api";

const initialState = {
    list: [],
    isLoading: false,
}

export const getCategories = createAsyncThunk('categories/getCategories',
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`${CATEGORIES_URL}`);
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error)
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.list = action.payload;
        });
        builder.addCase(getCategories.rejected, (state) => {
            // state.isLoading = false;
        });
    },
});


export default categoriesSlice.reducer;