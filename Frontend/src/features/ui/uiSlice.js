import { createSlice } from "@reduxjs/toolkit";

// Biến lưu trữ store để sử dụng trong action creators
let storeRef = null;

// Helper function để đặt store reference
export const setStore = (store) => {
  storeRef = store;
};

const initialState = {
  toast: {
    isOpen: false,
    message: "",
    type: "info", // "success", "error", "warning", "info"
    duration: 5000, // Thời gian hiển thị toast (mili giây)
  },
  sidebarOpen: false, // Trạng thái sidebar (cho mobile)
  darkMode: false, // Trạng thái dark mode
  loading: {
    global: false, // Loading state toàn cục
    bookings: false, // Loading state cho việc đặt sân
    auth: false, // Loading state cho authentication
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Toast actions
    showToast: (state, action) => {
      const { message, type = "info", duration = 5000 } = action.payload;
      state.toast = {
        isOpen: true,
        message,
        type,
        duration,
      };

      // Tự động đóng toast sau khoảng thời gian duration
      setTimeout(() => {
        store.dispatch(closeToast());
      }, duration);
    },
    closeToast: (state) => {
      state.toast.isOpen = false;
    },

    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },

    // Dark mode actions
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      // Lưu trạng thái dark mode vào localStorage
      localStorage.setItem("darkMode", state.darkMode);
      // Áp dụng class cho document.documentElement
      if (state.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", state.darkMode);
      if (state.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    // Loading state actions
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      if (key in state.loading) {
        state.loading[key] = value;
      }
    },
  },
});

export const {
  showToast,
  closeToast,
  toggleSidebar,
  closeSidebar,
  openSidebar,
  toggleDarkMode,
  setDarkMode,
  setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
