import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from './cartSlice'
import userNameReducer from './userNameSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        userName:userNameReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;