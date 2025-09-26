import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`;

const instance = axios.create({
  baseURL: BASE_URL,

  headers: { "Content-Type": "application/json" },
});

const userService = {
  updateProfile: async (userDate, refresh) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${refreshToken}` },
      };
      const response = await instance.put("/update-profile", userDate, config);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Cập nhật hồ sơ không thành công"
      );
    }
  },
};

export default userService;
