import api from "../../Services/api.js";

// 📦 GET PRODUCTS (FILTERS SUPPORT)
export const getProducts = (params) => {
  return api.get("/products", { params });
};

// 📦 GET FILTER OPTIONS (categories + brands from DB)
export const getProductFilters = () => {
  return api.get("/products/filters");
};