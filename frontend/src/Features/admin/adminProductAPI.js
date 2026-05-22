import api from "../../Services/api.js";

// 🟢 GET ALL PRODUCTS
export const getAdminProductsAPI = async () => {

  const res = await api.get("/products");

  return res.data;

};

  export const deleteProductAPI = async (id) => {

  const token = localStorage.getItem("token");

  const res = await api.delete(
    `/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

export const createProductAPI = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await api.post("/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};