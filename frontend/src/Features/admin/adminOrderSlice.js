import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrdersAPI,
  updateOrderStatusAPI,
} from "./adminOrderAPI.js";

// 🟢 GET ALL ORDERS
export const getAllOrders = createAsyncThunk(
  "orders/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllOrdersAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// 🟢 UPDATE STATUS
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      return await updateOrderStatusAPI(id, status);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // UPDATE STATUS
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload.order;

        state.orders = state.orders.map((o) =>
          o._id === updatedOrder._id ? updatedOrder : o
        );
      });
  },
});

export default orderSlice.reducer;
