import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProductFilters } from "./ProductAPI.js";


// 📦 FETCH PRODUCTS (FILTERED)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState().products;

      const params = {};

      if (state.category) params.category = state.category;
      if (state.brand) params.brand = state.brand;
      if (state.search) params.search = state.search;

      const res = await getProducts(params);
      return res.data;

    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error loading products"
      );
    }
  }
);


// 📦 FETCH FILTER OPTIONS (BRANDS + CATEGORIES FROM DB)
export const fetchFilters = createAsyncThunk(
  "products/fetchFilters",
  async (_, thunkAPI) => {
    try {
      const res = await getProductFilters();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading filters");
    }
  }
);


// 🧠 INITIAL STATE
const initialState = {
  products: [],
  categories: [],
  brands: [],

  category: "",
  brand: "",
  search: "",

  loading: false,
  filterLoading: false,
  error: null,
};


// 🧩 SLICE
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
    },

    clearFilters: (state) => {
      state.category = "";
      state.brand = "";
      state.search = "";
    }
  },

  extraReducers: (builder) => {
    builder

      // ================= PRODUCTS =================
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= FILTERS =================
      .addCase(fetchFilters.pending, (state) => {
        state.filterLoading = true;
      })

      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filterLoading = false;
        state.categories = action.payload.categories;
        state.brands = action.payload.brands;
      })

      .addCase(fetchFilters.rejected, (state) => {
        state.filterLoading = false;
      });
  }
});


// export actions
export const {
  setCategory,
  setBrand,
  setSearch,
  clearFilters
} = productSlice.actions;


// export reducer
export default productSlice.reducer;