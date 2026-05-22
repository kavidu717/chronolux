import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { getAllUsersAPI } from "./adminAPI.js";

// 🟢 GET USERS
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, thunkAPI) => {

    try {

      return await getAllUsersAPI();

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data
      );

    }

  }
);


const initialState = {
  users: [],
  loading: false,
  error: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder

      // 🟢 GET USERS
      .addCase(getAllUsers.pending, (state) => {

        state.loading = true;
        state.error = null;

      })

      .addCase(getAllUsers.fulfilled, (state, action) => {

        state.loading = false;
        state.users = action.payload;

      })

      .addCase(getAllUsers.rejected, (state, action) => {

        state.loading = false;
        state.error =
          action.payload?.message ||
          "Failed to load users";

      });

  }
});

export default adminSlice.reducer;