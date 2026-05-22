import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  getAdminProductsAPI
} from "./adminProductAPI.js";

// 🟢 GET PRODUCTS
export const getAdminProducts = createAsyncThunk(
  "admin/getProducts",
  async (_, thunkAPI) => {

    try {

      return await getAdminProductsAPI();

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data
      );

    }

  }
);

const initialState = {
  products: [],
  loading: false,
  error: null
};

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder

      // 🟢 PENDING
      .addCase(getAdminProducts.pending, (state) => {

        state.loading = true;
        state.error = null;

      })

      // 🟢 SUCCESS
      .addCase(getAdminProducts.fulfilled, (state, action) => {

        state.loading = false;
        state.products = action.payload;

      })

      // 🟢 ERROR
      .addCase(getAdminProducts.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload?.message ||
          "Failed to load products";

      });

  }
});

export default adminProductSlice.reducer;