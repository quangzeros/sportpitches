import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authService from "../../services/callAuthApi";

const setCookieSecure = (name, value, options = {}) => {
  // Mặc định cookies có thời hạn 7 ngày nếu không chỉ định
  const defaultOptions = {
    expires: 7,
    path: "/",
    secure: import.meta.env.VITE_NODE_ENV === "production", // Chỉ bật secure trong production
    sameSite: "strict",
  };

  Cookies.set(name, value, { ...defaultOptions, ...options });
};
// Async thunks
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(credentials);

      // Lưu tokens vào cookies
      Cookies.set("accessToken", data.accessToken, {
        expires: 1 / 24, // 1 giờ
        secure: import.meta.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      Cookies.set("refreshToken", data.refreshToken, {
        expires: 7, // 7 ngày
        secure: import.meta.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Gọi API logout nếu cần
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        await authService.logout(refreshToken);
      }

      // Xóa cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      return null;
    } catch (error) {
      // Vẫn xóa cookies ngay cả khi API bị lỗi
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) return null;

      // Đây là nơi bạn sẽ gọi API để kiểm tra token có hợp lệ không
      const { data } = await authService.checkAuth(refreshToken);
      setCookieSecure("accessToken", data.accessToken);

      return data.user;
    } catch (error) {
      dispatch(logoutUser());
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedInfo, { rejectWithValue }) => {
    try {
      const { data } = await authService.updateProfile(updatedInfo);
      setCookieSecure("accessToken", data.accessToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Đăng nhập thất bại";
      });

    // Logout cases
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.status = "idle";
    });

    // Check auth cases
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.currentUser = action.payload;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = "idle";
        state.currentUser = null;
        state.isAuthenticated = false;
      });

    // Update profile cases
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Cập nhật hồ sơ thất bại";
      });
  },
});

export const { clearError } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
