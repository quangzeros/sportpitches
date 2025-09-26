import { configureStore } from "@reduxjs/toolkit";
import uiReducer, { setStore } from "../features/ui/uiSlice";
import userReducer from "../features/user/userSlice";
import chatReducer from "../features/chat/chatSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    chat: chatReducer,
    // Thêm các reducer khác ở đây
  },
});

// Thiết lập store để sử dụng trong setTimeout của uiSlice
setStore(store);

export default store;
