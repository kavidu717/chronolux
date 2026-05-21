import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { getMyOrders } from "./orderAPI.js";


// 🟢 FETCH ORDERS
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, thunkAPI) => {

    try {

      return await getMyOrders();

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data
      );

    }

  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder

      // 🟢 FETCH ORDERS
      .addCase(fetchMyOrders.pending, (state) => {

        state.loading = true;

      })

      .addCase(fetchMyOrders.fulfilled, (state, action) => {

        state.loading = false;

        state.orders = action.payload;

      })

      .addCase(fetchMyOrders.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload?.message;

      });

  }
});

export default orderSlice.reducer;