import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
`1`;
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
  products: [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
  ],
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
