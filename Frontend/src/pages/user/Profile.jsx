import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Profile() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userStatus = useSelector((state) => state.user.status);
  // Redirect nếu chưa đăng nhập
  useEffect(() => {
    if (!Cookies.get("accessToken") && !isAuthenticated) {
      navigate("/login", { state: { from: "/profile" } });
    }
  }, [isAuthenticated, navigate, userStatus]);

  // Khởi tạo state với giá trị mặc định an toàn
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    phone: "",
    avatar: "",
  });

  const [error, setError] = useState({ phone: "", name: "" });

  // Cập nhật userInfo khi currentUser thay đổi và khác null
  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        email: currentUser.email || "",
        name: currentUser.name || "",
        phone: currentUser.phone || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);
  function isVietnamesePhoneNumber(number) {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!isVietnamesePhoneNumber(userInfo.phone)) {
      setError((pre) => ({ ...pre, phone: "Số điện thoại không hợp lệ" }));
      return;
    }
    if (userInfo.name.trim() === "" || userInfo.name.length < 3) {
      setError((pre) => ({ ...pre, name: "Tên không được hợp lệ" }));
      return;
    }
    setError({ phone: "", name: "" });
  }

  // Hiển thị loading hoặc placeholder khi chưa có dữ liệu người dùng
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin người dùng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Thông tin cá nhân
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={userInfo.avatar || "https://via.placeholder.com/150"}
              alt="User avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <div>
            <input
              type="email"
              value={userInfo.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
            />
            <p className="text-sm text-gray-400 mt-1">
              Email không thể thay đổi
            </p>
          </div>
        </div>

        {/* Tên */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Họ và tên
          </label>
          <div>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error.name && (
            <p className="text-sm text-red-500 mt-1">{error.name}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Số điện thoại
          </label>
          <div>
            <input
              type="number"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error.phone && (
            <p className="text-sm text-red-500 mt-1">{error.phone}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
