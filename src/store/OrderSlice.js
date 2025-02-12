import { createSlice } from "@reduxjs/toolkit";

const orderState = {
    orders: [],
  }

const orderSlice = createSlice({
  name: "order",
  initialState: orderState,
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
    updateOrderStatus(state, action) {
      const { id, status } = action.payload;
      const order = state.orders.find((order) => order.id === id);
      if (order) {
        order.status = status;
      }
    },
  },
});

export const orderAction = orderSlice.actions;
export default orderSlice.reducer;
