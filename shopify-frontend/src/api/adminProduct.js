import axiosInstance from "../utils/axiosInstance";

export const createProduct = async (formData) => {
  const { data } = await axiosInstance.post("/admin/products", formData);
  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await axiosInstance.put(`/admin/products/${id}`, formData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axiosInstance.delete(`/admin/products/${id}`);
  return data;
};
