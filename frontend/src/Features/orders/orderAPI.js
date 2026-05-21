import api from "../../Services/api.js";

// 🟢 GET MY ORDERS
export const getMyOrders = async () => {

  const token = localStorage.getItem("token");

  const res = await api.get(
    "/order/my-orders",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};