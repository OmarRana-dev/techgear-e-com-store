import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/authService";
import appwriteService from "../appwrite/ConfigService";

// Async thunk to check user session and fetch stores if the user is a seller
export const checkUserSession = createAsyncThunk(
  "auth/checkUserSession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const userData = await authService.getCurrentUser(); // Check if user is logged in
      if (userData) {
        dispatch(login(userData)); // Dispatch login action if user is found

        // Check if the logged-in user is a seller
        if (userData.prefs.role === "seller") {
          const stores = await appwriteService.getStores(
            userData.$id
          ); // Fetch seller's stores
          dispatch(setStore(stores.documents)); // Update the stores in the state
        }

        return userData; // Return the user data
      } else {
        dispatch(logout()); // Logout if no session found
        return rejectWithValue("No user session found.");
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle error during session check
    }
  }
);

const initialState = {
  status: false, // User login status
  loading: false, // Global loading state
  progress: 0, // Progress percentage for UI
  userData: null, // User data
  stores: [], // Stores for seller users
  activeStore: null,
  error: null, // Error state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.status = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.status = false;
      state.userData = null;
      state.stores = [];
    },
    setStore(state, action) {
      state.stores = [...action.payload];
    },
    setActiveStore(state, action) {
      state.activeStore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading and progress during session check
      .addCase(checkUserSession.pending, (state) => {
        state.loading = true;
        state.progress = 20; // Start progress at 20%
        state.error = null;
      })
      .addCase(checkUserSession.fulfilled, (state) => {
        state.loading = false;
        state.progress = 100; // Set progress to 100% when done
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.loading = false;
        state.progress = 0;
        state.error = action.payload; // Set error message if session check fails
      });
  },
});

export const { login, logout, setStore, setActiveStore } =
  authSlice.actions;
export default authSlice.reducer;
