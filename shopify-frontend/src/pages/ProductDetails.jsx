import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="mt-10 text-center">Loading product...</p>;

  const handleAddToCart = () => {
    dispatch(addItemToCart({ productId: product._id, quantity: 1 }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <img
        src={product.images?.[0]?.url}
        alt={product.title}
        className="w-full h-96 object-cover rounded"
      />
      <div>
        <h2 className="text-3xl font-bold">{product.title}</h2>
        <p className="text-gray-500 mt-2">{product.brand}</p>
        <p className="text-blue-600 text-2xl font-semibold mt-4">
          ₹{product.price}
        </p>
        <p className="mt-4">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-6 py-2 rounded mt-6"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
