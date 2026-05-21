import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authAPI.js";

const loadStoredUser = () => {
  const rawUser = localStorage.getItem("user");

  if (!rawUser || rawUser === "undefined") {
    localStorage.removeItem("user");
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const loadStoredToken = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" ? token : null;
};


// 🔐 LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await loginUser(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);


// 🆕 REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await registerUser(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);


const storedToken = loadStoredToken();

const initialState = {
  user: loadStoredUser(),
  token: storedToken,
  loading: false,
  error: null,
  success: false,
  isAuthenticated: !!storedToken
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

  },

  extraReducers: (builder) => {
    builder

      // ================= LOGIN =================
        .addCase(login.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(login.fulfilled, (state, action) => {
  state.loading = false;

  // ✅ USER + TOKEN
  state.user = action.payload.user;
  state.token = action.payload.token;

  state.success = true;

  state.isAuthenticated = true;

  // 💾 LOCAL STORAGE
  localStorage.setItem("user", JSON.stringify(action.payload.user));
  localStorage.setItem("token", action.payload.token);
})

.addCase(login.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.message || "Login failed";
})


      // ================= REGISTER =================
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;

        // ✅ IMPORTANT FIX
        state.success = true;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });

  }
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
