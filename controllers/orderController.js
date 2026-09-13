const Order   = require("../models/Order");
const Cart    = require("../models/Cart");
const Product = require("../models/Product");

// POST /api/orders  — place order
const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = "COD" } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const itemsPrice   = cart.totalPrice;
    const shippingPrice = itemsPrice > 500 ? 0 : 49;
    const totalPrice   = itemsPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // Reduce stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    // Clear cart
    cart.items = []; cart.totalPrice = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/my  — user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders  — admin: all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/orders/:id/status  — admin: update status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (orderStatus)  order.orderStatus  = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (orderStatus === "delivered") order.deliveredAt = new Date();
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus };
