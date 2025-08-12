import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../redux/productSlice";
import { Link } from "react-router-dom";

export default function AdminProductList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
  {items.map((product) => (
    <tr key={product._id} className="border">
      <td className="p-2 border">
        <img
          src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.png"}
          alt={product.title}
          className="w-16 h-16 object-cover"
        />
      </td>
      <td className="p-2 border">{product.title}</td>
      <td className="p-2 border">₹{product.price}</td>
      <td className="p-2 border">{product.category}</td>
      <td className="p-2 border">
        <Link
          to={`/admin/products/edit/${product._id}`}
          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(product._id)}
          className="bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
