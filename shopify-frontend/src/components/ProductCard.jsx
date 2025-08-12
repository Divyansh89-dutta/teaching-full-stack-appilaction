import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.title || "Product"}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-3 font-semibold text-lg">{product.title}</h3>
        <p className="text-gray-500">{product.brand}</p>
        <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
      </Link>
    </div>
  );
}
