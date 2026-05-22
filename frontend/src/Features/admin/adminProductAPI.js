import api from "../../Services/api.js";

// 🟢 GET ALL PRODUCTS
export const getAdminProductsAPI = async () => {

  const res = await api.get("/products");

  return res.data;

};