import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice.js";
import productReducer from "../Features/products/productSlice.js";
import cardReducer from "../Features/cart/cartSlice.js";
import orderReducer from "../Features/orders/orderSlice.js";

export const store=configureStore({
    reducer:{
        auth:authReducer,
    products: productReducer,
    cart:cardReducer,
    orders:orderReducer


    }
})