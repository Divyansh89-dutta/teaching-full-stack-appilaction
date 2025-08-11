import axiosInstance from "../utils/axiosInstance";

export const getProducts = async () => {
    const {data} = await axiosInstance.get("/products");
    return data;
}

export const removeProduct = async (id) => {
    await axiosInstance.delete(`/products/${id}`);
}