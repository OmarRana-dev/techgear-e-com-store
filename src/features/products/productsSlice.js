import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../../appwrite/ConfigService";

const fetchProductsFromAppwrite = async (params = []) => {
  try {
    const response = await appwriteService.getProducts(params);
    const products = response.documents;

    // Map through products and fetch image URLs for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        try {
          const imageUrl = await appwriteService.getFilePreview(
            product.productImage
          );
          return {
            ...product,
            productImage: imageUrl.href, // Add image URL to the product data
          };
        } catch (error) {
          console.error(
            `Error fetching image for product ${product.$id}:`,
            error
          );
          return {
            ...product,
            imageUrl: null, // Set to null if image fetching fails
          };
        }
      })
    );
    return productsWithImages;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const products = await fetchProductsFromAppwrite(params);
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [], // All products fetched from the API
  filteredProducts: [], // Search/filter results
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // Error message if the fetch fails
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    },
    filterProducts: (state, action) => {
      state.filteredProducts = state.products.filter(
        (product) => product.category === action.payload
      );
    },
    clearFilters: (state) => {
      state.filteredProducts = state.products; // Reset to original product list
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors on new fetch
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // Store fetched products
        state.filteredProducts = action.payload; // Initially set filtered products to all products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products"; // Set error message
      });
  },
});

// Export actions to use in the UI
export const { searchProduct, filterProducts, clearFilters } =
  productsSlice.actions;

export default productsSlice.reducer;
