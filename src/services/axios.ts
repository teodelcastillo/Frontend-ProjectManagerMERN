import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true, // Add this line
  });


  axiosInstance.interceptors.request.use(
    (config) => {

      const userJson = localStorage.getItem("user");
      const token = userJson ? (JSON.parse(userJson).token as string) : null;
      if (token) {

        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Interceptor: Request interception failed with error:", error);
      return Promise.reject(error);
    }
  );
  
export default axiosInstance;
