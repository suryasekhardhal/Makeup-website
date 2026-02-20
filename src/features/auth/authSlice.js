import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/users/register", userData);
            return data.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/users/login", userData);
            return data.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
export const refreshSession = createAsyncThunk(
  "auth/refreshSession",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/refresh-token");
      return data.data;   // 👈 important
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);



const authSlice = createSlice({
    name: "auth",
    initialState: {
    user: null,
    loading: false,
    error: null,
    authReady: false,
},

    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            });
        builder
            .addCase(refreshSession.fulfilled, (state, action) => {
    state.user = action.payload?.user || null;
    state.authReady = true;
})
.addCase(refreshSession.rejected, (state) => {
    state.user = null;
    state.authReady = true;
})

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
