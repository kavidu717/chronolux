import axios from "axios";



 const api = axios.create({
    baseURL: "https://chronolux-1rge.onrender.com/api",
});

export default api