import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId required" });
    }

    let cart = await Cart.findOne({ userId });

    // 🟢 If cart doesn't exist → create
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: quantity || 1 }]
      });
    } else {
      // 🟡 Check if product already exists
      const index = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += quantity || 1;
      } else {
        cart.items.push({ productId, quantity: quantity || 1 });
      }
    }

    await cart.save();

    return res.status(200).json({
      message: "Item added to cart",
      cart
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.json({ message: "Cart is empty", items: [] });
    }

    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.json({
      message: "Item removed",
      cart
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};