import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, removeProduct } from "../api/product";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  return await getProducts();
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await removeProduct(id);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
