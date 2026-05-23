import Stripe from "stripe";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

// ================= CREATE PAYMENT SESSION =================
export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = getStripe();
    const { customerInfo } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const line_items = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productId.name
        },
        unit_amount: item.productId.price * 100
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items,

      success_url:
        "https://chronolux-alpha.vercel.app/payment-success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "https://chronolux-alpha.vercel.app/checkout",

      metadata: {
        userId: req.user.id,
        customerInfo: JSON.stringify(customerInfo)
      }
    });

    res.json({ url: session.url });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= PAYMENT SUCCESS =================
export const paymentSuccess = async (req, res) => {
  try {
    const stripe = getStripe();
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
      totalAmount += item.productId.price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      };
    });

    const order = new Order({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      customerInfo: JSON.parse(session.metadata.customerInfo),
      status: "paid"
    });

    await order.save();

    // clear cart
    cart.items = [];
    await cart.save();

    res.json({
      message: "Order created successfully",
      order
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
