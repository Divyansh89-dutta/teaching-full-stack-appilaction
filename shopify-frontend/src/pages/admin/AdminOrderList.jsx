import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function AdminOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrdes();
  }, []);

  const fetchOrdes = async () => {
    try {
      const res = await axiosInstance.get("/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Error fetching orders:", err);
      setOrders([]);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      if (status === "delivered") {
        await axiosInstance.put(`/orders/${orderId}/deliver`);
      }
      fetchOrdes();
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
     <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">{order.user?.name}</td>
                <td className="p-2 border">₹{order.totalAmount}</td>
                <td className="p-2 border">
                  {order.isDelivered ? "Delivered" : "Pending"}
                </td>
                <td className="p-2 border">
                  <select
                    value={order.isDelivered ? "delivered" : "pending"}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrderList;
