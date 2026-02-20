import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchShadesByProduct = createAsyncThunk(
  "shades/fetchShadesByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/shades/get-shades-by-product/${productId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching shades");
    }
  }
);

const shadeSlice = createSlice({
  name: "shades",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShadesByProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShadesByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchShadesByProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default shadeSlice.reducer;
