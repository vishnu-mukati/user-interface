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
        state.cartData.push({ ...action.payload, quantity: 1 });
      }
      state.cartData.forEach(item => {
        item.totalPrice = item.quantity * item.price;
      });
    },
    removeFromCart(state, action) {
      const existingItem = state.cartData.find(item => item.id === action.payload);
      if (existingItem.quantity === 1) {
        state.cartData = state.cartData
          .map(item =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter(item => item.quantity > 0);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }
    },
    clearCart(state) {
      state.cartData = [];
      localStorage.removeItem("cartData");
    },
    replaceCart(state, action) {
      console.log(action.payload);
     
        state.cartData = action.payload; 
    },
    clearCart(state) {
      state.cartData = [];
    }
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
