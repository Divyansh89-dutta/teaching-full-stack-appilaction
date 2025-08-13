import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { addItemToCart } from "../redux/cartSlice";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading) return <p>Loading wishlist...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      {items.length === 0 ? (
        <p>No products in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((wishlistItem) => {
            const product = wishlistItem.product;
            return (
              <div key={wishlistItem._id} className="border rounded p-4">
                <img
                  src={product?.images?.[0]?.url || "/placeholder.png"}
                  alt={product?.title}
                  className="h-48 w-full object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{product?.title}</h2>
                <p className="text-gray-500">₹{product?.price}</p>

                <div className="flex gap-3 mt-3">
                  {/* ✅ Fixed: send correct payload */}
                  <button
                    onClick={() =>
                      dispatch(addItemToCart({ productId: product._id, quantity: 1 }))
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => dispatch(removeFromWishlist(product._id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
