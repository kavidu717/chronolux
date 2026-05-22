import api from "../../Services/api.js";

// 🟢 GET ALL ORDERS (ADMIN)
export const getAllOrdersAPI = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/order/admin/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 🟢 UPDATE ORDER STATUS
export const updateOrderStatusAPI = async (id, status) => {
  const token = localStorage.getItem("token");

  const res = await api.put(
    `/order/admin/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};