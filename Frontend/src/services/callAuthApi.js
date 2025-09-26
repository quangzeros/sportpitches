import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`;

const instance = axios.create({
  baseURL: BASE_URL,

  headers: { "Content-Type": "application/json" },
});

const authService = {
  register: async (userData) => {
    try {
      const response = await instance.post("/register", userData);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Đăng ký không thành công"
      );
    }
  },

  login: async (userData) => {
    try {
      const response = await instance.post("/login", userData);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Đăng nhập không thành công"
      );
    }
  },
  logout: async (refreshToken) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${refreshToken}` },
      };
      const response = await instance.get("/logout", config);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Đăng xuất không thành công"
      );
    }
  },
  checkAuth: async (refreshToken) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${refreshToken}` },
      };
      const response = await instance.get("/verify-token", config);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Kiểm tra xác thực không thành công"
      );
    }
  },
};

export default authService;
