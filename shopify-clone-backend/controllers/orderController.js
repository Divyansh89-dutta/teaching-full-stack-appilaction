import Order from "../models/Order.js";
import { emitNotification } from "../utils/emitNotification.js";
import { sendOrderConfirmationEmail } from "../utils/emailSander.js";
import Product from "../models/Prodect.js";
import { getIO } from "../utils/socket.js";
// Create a new order
export const createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  try {
    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    const savedOrder = await order.save();

    // update stock 
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });

      // send order confirmation email
      await sendOrderConfirmationEmail(req.user.email, savedOrder)
      
      const io = getIO();

      // real-time notification to user
      io.to(req.user._id.toString()).emit("orderPlaced", {
        orderId: savedOrder._id,
        message: "Your order has been placed successfully",
      })
      // admin dashboard notification
      io.emit("NewOrder", savedOrder);
      // save notification in DB
      await emitNotification({
        io,
        to: req.user._id,
        from: req.user._id,
        type: "order",
        massage: "Your order has been placed successfully",
        data: { orderId: savedOrder._id },
      })
    }
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email"); // lowercase 'user'
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Get logged-in user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }); // ✅ fixed 'Order' (capital O)
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user.id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// Mark order as delivered (Admin only)
export const markDeliversed = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isDelivered = true;
    order.deliveredAt = new Date();
    await order.save();

    res.status(200).json({ message: "Order marked as delivered" });
  } catch (error) {
    res.status(500).json({ message: "Delivery update failed", error: error.message });
  }
};
