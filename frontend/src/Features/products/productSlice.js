import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api.js";


// 📦 FETCH PRODUCTS (backend filters support)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {

      const state = thunkAPI.getState().products;

      const params = new URLSearchParams();

      if (state.category) params.append("category", state.category);
      if (state.brand) params.append("brand", state.brand);
      if (state.search) params.append("search", state.search);

      const res = await api.get(`/products?${params.toString()}`);

      return res.data;

    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Error loading products" }
      );
    }
  }
);


// 🧠 STATE
const initialState = {
  products: [],
  loading: false,
  error: null,

  category: "",
  brand: "",
  search: ""
};


const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setBrand: (state, action) => {
      state.brand = action.payload;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    }

  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });

  }
});


export const {
  setCategory,
  setBrand,
  setSearch
} = productSlice.actions;

export default productSlice.reducer;