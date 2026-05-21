import Order from "../models/Order.js";
import Cart from "../models/Cart.js";


export const checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🛒 1. Get cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 💰 2. Calculate total
    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
      const price = item.productId.price;

      totalAmount += price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price
      };
    });

    // 🧾 3. Create order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount
    });

    await order.save();

    // 🧹 4. Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "paid",
      "shipped",
      "delivered",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = status;

    await order.save();

    res.json({
      message: "Order status updated",
      order
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};