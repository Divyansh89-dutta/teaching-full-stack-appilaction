import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  const { data } = await axiosInstance.get("/wishlist", { withCredentials: true });
  return data;
});

export const addToWishlist = createAsyncThunk("wishlist/add", async (productId) => {
  const { data } = await axiosInstance.post("/wishlist", { productId }, { withCredentials: true });
  return data;
});

export const removeFromWishlist = createAsyncThunk("wishlist/remove", async (productId) => {
  await axiosInstance.delete(`/wishlist/${productId}`, { withCredentials: true });
  return productId;
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => { state.loading = true; })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
