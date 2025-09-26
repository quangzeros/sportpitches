import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import Toast from "./Toast";
import ChatWidget from "../utils/ChatWidget";
import { setDarkMode } from "../features/ui/uiSlice";

function AppLayout() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  // Khôi phục trạng thái dark mode từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    // Kiểm tra trạng thái dark mode từ localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";

    // Nếu khác với trạng thái hiện tại, cập nhật lại
    if (savedDarkMode !== darkMode) {
      dispatch(setDarkMode(savedDarkMode));
    }

    // Đảm bảo DOM được cập nhật với class dark nếu cần
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch, darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1">
        <main className="flex-1 px-4 py-8 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* System notifications */}
      <div className="fixed bottom-4 right-4 z-50">
        <Toast />
      </div>

      {/* Chat Widget - đặt ở dưới Toast để không bị che phủ */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatWidget />
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;
