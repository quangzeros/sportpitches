import React from "react";
import { useRouteError, Link, useNavigate } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Xác định loại lỗi để hiển thị thông báo phù hợp
  let title = "Đã xảy ra lỗi!";
  let message = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";

  if (error?.status === 404) {
    title = "Trang không tồn tại!";
    message = "Xin lỗi, trang bạn đang tìm kiếm không tồn tại.";
  } else if (error?.status === 401 || error?.status === 403) {
    title = "Không có quyền truy cập!";
    message = "Bạn không có quyền truy cập vào trang này.";
  } else if (error?.status >= 500) {
    title = "Lỗi máy chủ!";
    message = "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <span className="inline-block p-3 rounded-full bg-red-100 dark:bg-red-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </span>
        </div>

        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
          {title}
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>

        {error?.data?.message && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded mb-6">
            <p className="text-sm text-red-600 dark:text-red-400">
              Chi tiết lỗi: {error.data.message || error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-2 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Quay lại
          </button>

          <Link
            to="/"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
