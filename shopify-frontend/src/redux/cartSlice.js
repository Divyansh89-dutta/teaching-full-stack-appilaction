import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Fetch cart items
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const { data } = await axiosInstance.get("/cart");
  // Adjust this depending on backend shape
  return data.items || data; // if API returns { items: [...] }
});

// Add to cart
export const addItemToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }) => {
    const { data } = await axiosInstance.post("/cart", { productId, quantity });
    return data.items || data;
  }
);

// Delete from cart
export const deleteItemFromCart = createAsyncThunk(
  "cart/delete",
  async (productId) => {
    const { data } = await axiosInstance.delete(`/cart/${productId}`);
    return data.items || data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
