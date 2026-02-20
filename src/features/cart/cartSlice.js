import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, shadeId, quantity }, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/cart/add-to-cart", {
                productId,
                shadeId,
                quantity,
            });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);


export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/cart/get-cart");
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async ({ productId, shadeId, quantity }, { rejectWithValue }) => {
        try {
            const { data } = await api.put("/cart/update-cart-item", {
                productId,
                shadeId,
                quantity,
            });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async ({ productId, shadeId }, { rejectWithValue }) => {
        try {
            const { data } = await api.delete("/cart/remove-cart-item", {
                data: { productId, shadeId },
            });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.cart = action.payload;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.cart = action.payload;
            })

    },
});

export default cartSlice.reducer;
