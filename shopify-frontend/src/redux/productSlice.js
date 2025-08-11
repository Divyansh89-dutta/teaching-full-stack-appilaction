import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, removeProduct } from "../api/product";

export const fectProducts = createAsyncThunk("products/fetchAll", async() => {
    return await getProducts();
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
    await removeProduct()
});

const productSlice = createSlice({
    name: "products",
    
})