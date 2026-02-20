import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/products/all-products");
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching products");
        }
    }
);

export const fetchProductBySlug = createAsyncThunk(
    "products/fetchProductBySlug",
    async (slug, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/products/products/slug/${slug}`);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching product");
        }
    }
);


const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        selectedProduct: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchProductBySlug.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductBySlug.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload;
        })
            .addCase(fetchProductBySlug.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

},
});

export default productSlice.reducer;




