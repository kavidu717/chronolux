import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartApi,
  getCartApi,
  removeFromCartApi
} from "./cartApi.js";


// ➕ ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/add",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await addToCartApi(data, token);
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);


// 📦 GET CART
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await getCartApi(token);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);


// ❌ REMOVE ITEM
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await removeFromCartApi(productId, token);
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);


const initialState = {
  cart: null,
  loading: false,
  error: null
};


const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ➕ ADD
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      // 📦 FETCH
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      // ❌ REMOVE
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  }
});

export default cartSlice.reducer;