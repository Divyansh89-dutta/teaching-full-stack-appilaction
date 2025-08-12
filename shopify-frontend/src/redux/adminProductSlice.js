import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, updateProduct, deleteProduct } from "../api/adminProducts";

export const adminCreateProduct = createAsyncThunk("admin/createProduct", createProduct);
export const adminUpdateProduct = createAsyncThunk("admin/updateProduct", ({id, formData}) => updateProduct(id, formData));
export const adminDeleteProduct = createAsyncThunk("admin/deleteProduct", deleteProduct);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: { loading: false, error: null, success: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith("admin/") && action.type.endsWith("/pending"),
        (state) => { state.loading = true; state.success = false; }
      )
      .addMatcher(
        (action) => action.type.startsWith("admin/") && action.type.endsWith("/fulfilled"),
        (state) => { state.loading = false; state.success = true; }
      )
      .addMatcher(
        (action) => action.type.startsWith("admin/") && action.type.endsWith("/rejected"),
        (state, action) => { state.loading = false; state.error = action.error.message; }
      );
  }
});

export default adminProductSlice.reducer;
