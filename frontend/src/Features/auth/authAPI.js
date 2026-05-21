
import api from "../../Services/api.js";

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// REGISTER
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const getProfile = async () => {

  const token = localStorage.getItem("token");

  const res = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};