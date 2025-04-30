import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // Đây là nơi bạn sẽ gọi API đăng nhập thật
      // const response = await fetch('/api/login', {...})

      // Giả lập API call thành công
      const response = {
        id: "123",
        name: "Nguyễn Văn A",
        email: credentials.email,
        avatar: null,
        role: "user",
        token: "jwt-token-would-be-here",
      };

      // Lưu token vào localStorage để duy trì đăng nhập
      localStorage.setItem("token", response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    return null;
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      // Đây là nơi bạn sẽ gọi API để kiểm tra token có hợp lệ không
      // const response = await fetch('/api/verify-token', {...})

      // Giả lập API call thành công
      const response = {
        id: "123",
        name: "Nguyễn Văn A",
        email: "user@example.com",
        avatar: null,
        role: "user",
        token: token,
      };

      return response;
    } catch (error) {
      localStorage.removeItem("token");
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
    updateUserProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
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
  },
});

export const { clearError, updateUserProfile } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
