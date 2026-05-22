import api from "../../Services/api.js";

export const getAllUsersAPI = async () => {

  const token = localStorage.getItem("token");

  const res = await api.get(
    "/auth/users",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};