import axios from "axios";
console.log("API URL:", process.env.REACT_APP_API_BASE_URL);

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
});
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(
      "➡️ Request:",
      config.method?.toUpperCase(),
      config.url,
      config.headers
    );
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosInstance;
