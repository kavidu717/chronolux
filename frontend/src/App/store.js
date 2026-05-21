import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice.js";
import productReducer from "../Features/products/productSlice.js";

export const store=configureStore({
    reducer:{
        auth:authReducer,
    products: productReducer


    }
})