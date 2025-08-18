  import axios from "axios"
  console.log("API URL:", process.env.REACT_APP_API_BASE_URL);

  const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
  });
  export default AxiosInstance;