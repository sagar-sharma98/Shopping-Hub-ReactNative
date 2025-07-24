import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product-slice";
import cartSlice from "./cart-slice";
import authSlice from "./auth-slice";


const store = configureStore({
    reducer: {product: productSlice.reducer, cart: cartSlice.reducer, auth: authSlice.reducer}
});

export default store;