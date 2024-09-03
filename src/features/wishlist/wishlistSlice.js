import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      const existingItem = state.wishlist.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        console.log("already in wishlist");
      } else {
        state.wishlist.push({ ...action.payload, wishlist: true });
      }
    },
    removeItemFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist } =
  wishlishSlice.actions;
export default wishlishSlice.reducer;
