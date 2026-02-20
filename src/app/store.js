import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import shadeReducer from "../features/products/shadeSlice";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/orders/orderSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";




export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    shades: shadeReducer,
    cart: cartReducer,
    
orders: orderReducer,
wishlist: wishlistReducer,
  },
});
