import api from "../../Services/api.js";

// ➕ ADD TO CART
export const addToCartApi = (data, token) =>
  api.post("/cart/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


// 📦 GET CART
export const getCartApi = (token) =>
  api.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


// ❌ REMOVE ITEM
export const removeFromCartApi = (productId, token) =>
  api.post(
    "/cart/remove",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );