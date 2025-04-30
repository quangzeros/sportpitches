import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeToast } from "../features/ui/uiSlice"; // Bạn cần tạo slice này sau

function Toast() {
  const { isOpen, message, type } = useSelector(
    (state) => state.ui.toast || {}
  );
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const bgColor =
    {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    }[type] || "bg-blue-500";

  return (
    <div
      className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between`}
    >
      <span>{message}</span>
      <button
        onClick={() => dispatch(closeToast())}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
}

export default Toast;
