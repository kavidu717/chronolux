import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  getAdminProductsAPI,
    deleteProductAPI,
    createProductAPI
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

 export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, thunkAPI) => {

    try {

      await deleteProductAPI(id);

      return id;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data
      );

    }

  }
);
 
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (formData, thunkAPI) => {
    try {
      return await createProductAPI(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
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

      })

       .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

  }
});

export default adminProductSlice.reducer;