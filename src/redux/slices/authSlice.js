import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js"; 
import toast from "react-hot-toast";

// Load stored user from localStorage
const storedUser = JSON.parse(localStorage.getItem("pmsc"));

// Async thunk for sign-in
export const signIn = createAsyncThunk("/student/signIn",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const logout = createAsyncThunk("/student/logout",async (_, { rejectWithValue }) => {
    try {
      const response = await api.logout();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!storedUser,
    user: storedUser || null,
    loading: false,
    error: null,
  },
  reducers: {
    // login(state, action) {
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    //   localStorage.setItem("pmsc", JSON.stringify(action.payload));
    // },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("pmsc");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user
        state.isAuthenticated = true;
        localStorage.setItem("pmsc", JSON.stringify(action.payload?.user));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload?.message || "Login failed. Please try again.");
        state.error = action.payload?.message || "Failed to sign in.";
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null
        state.isAuthenticated = false;
        toast.success("Logout Successfully...");
        localStorage.removeItem("pmsc");
        localStorage.removeItem("classLevel");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.user = null
        state.isAuthenticated = false;
        toast.success("Logout Successfully...");
        localStorage.removeItem("pmsc");
        localStorage.removeItem("classLevel");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
