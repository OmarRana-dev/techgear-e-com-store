import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
