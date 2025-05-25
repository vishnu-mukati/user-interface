import { createSlice } from "@reduxjs/toolkit";

const orderState = {
    orders: [],
    totalOrderAmount : 0,
  }

const orderSlice = createSlice({
  name: "order",
  initialState: orderState,
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
    updateOrderStatus(state, action) {
      state.orders = action.payload;
    },
  },
});

export const orderAction = orderSlice.actions;
export default orderSlice.reducer;
