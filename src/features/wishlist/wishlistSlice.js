import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.wishlist.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        console.log("already in wishlist");
      } else {
        state.wishlist.push({ ...action.payload });
      }
    },
    removeItem: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addItem, removeItem } = wishlishSlice.actions;
export default wishlishSlice.reducer;
