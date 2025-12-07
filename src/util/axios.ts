import axios from "axios";
import storageService from "./storageService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000 * 30, // 10 seconds
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    // Check if the error is due to an expired token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite loop
      return fetch("http://localhost:5000/api/v1/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storageService.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          refreshToken,
        }),
        redirect: "follow",
      })
        .then(async (res) => {
          if (res.status === 200) {
            // Save new token to localStorage
            const data = await res.json();
            storageService.setItem("accessToken", data.accessToken);
            storageService.setItem("refreshToken", data.refreshToken);
            // Update the axios instance with the new token
            // Update the Authorization header
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;
            // Retry the original request with the new token
            return axiosInstance(originalRequest);
          }
        })
        .catch((err) => {
          // Clear tokens and redirect to login
          storageService.clear();
          // Redirect to login page
          window.location.href = "/";
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
