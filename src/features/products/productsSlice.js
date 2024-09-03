import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock API or use a real endpoint
const fetchProductsFromAPI = async () => {
  const response = await fetch("https://fakestoreapi.com/products"); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await fetchProductsFromAPI();
    return products;
  }
);

const initialState = {
  products: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      const items = state.products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
      return items;
    },
    filterProducts: (state, action) => {
      const items = state.products.filter(
        (product) => product.category === action.payload
      );
      return items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { searchProduct, filterProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
