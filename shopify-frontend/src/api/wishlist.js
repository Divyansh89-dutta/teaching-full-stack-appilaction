import axios from "axios";

const API = import.meta.env.VITE_API_URL ;

export const getWishlist = async () => {
  const { data } = await axios.get(`${API}/wishlist`, { withCredentials: true });
  return data;
};

export const addToWishlist = async (productId) => {
  const { data } = await axios.post(`${API}/wishlist`, { productId }, { withCredentials: true });
  return data;
};

export const removeFromWishlist = async (productId) => {
  const { data } = await axios.delete(`${API}/wishlist/${productId}`, { withCredentials: true });
  return data;
};
