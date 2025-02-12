import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cartData.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.cartData.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
      }
    },
    removeToCart(state, action) {
      const existingItem = state.cartData.find(item => item.id === action.payload);
      if (existingItem.quantity === 1) {
        state.cartData = state.cartData.filter(item => item.id !== action.payload);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }
    },
    clearCart(state) {
      state.cartData = [];
    },
    setCartFromLocalStorage(state, action) {
      state.cartData = action.payload || [];
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
