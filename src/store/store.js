import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
