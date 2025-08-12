import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteItemFromCart } from "../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;
  if (!items.length)
    return <p className="text-center mt-10">Your cart is empty</p>;

  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-500">₹{item.product.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(deleteItemFromCart(item.product._id))}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right font-bold text-lg">
        Total: ₹{totalPrice}
      </div>
    </div>
  );
}
