import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Tạo chat message ban đầu với admin
const initialMessage = {
  id: 1,
  text: "Xin chào! Tôi là trợ lý từ Booking Pitchs. Bạn cần hỗ trợ gì không?",
  sender: "admin",
  timestamp: new Date().toISOString(),
  read: false,
};

const initialState = {
  isOpen: false,
  messages: [initialMessage],
  unreadCount: 1,
  isTyping: false,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// Thunk để gửi tin nhắn đến API (khi bạn tích hợp với AI hoặc hệ thống chat thật)
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      // Mô phỏng API call - sau này thay bằng API thực tế
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message })
      // });
      // const data = await response.json();

      // Trả về kết quả giả lập
      return {
        id: Date.now(),
        text: message,
        sender: "user",
        timestamp: new Date().toISOString(),
        read: true,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk để lấy phản hồi từ admin/AI
export const getResponse = createAsyncThunk(
  "chat/getResponse",
  async (message, { rejectWithValue }) => {
    try {
      // Mô phỏng API call - sau này thay bằng API của ChatGPT/AI
      // const response = await fetch('/api/chat/bot', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message })
      // });
      // const data = await response.json();

      // Trả về kết quả giả lập sau 1-2 giây
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1000 + 1000)
      );

      // Các câu trả lời mẫu đơn giản
      let responseText =
        "Cảm ơn bạn đã liên hệ. Nhân viên của chúng tôi sẽ phản hồi sớm nhất!";

      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes("xin chào") || lowerMsg.includes("hello")) {
        responseText = "Xin chào! Tôi có thể giúp gì cho bạn?";
      } else if (lowerMsg.includes("đặt sân") || lowerMsg.includes("booking")) {
        responseText =
          "Để đặt sân, bạn có thể vào mục Tìm sân và chọn sân phù hợp.";
      } else if (lowerMsg.includes("giá")) {
        responseText =
          "Giá thuê sân phụ thuộc vào loại sân và thời gian. Bạn có thể xem chi tiết giá tại trang thông tin của từng sân.";
      }

      return {
        id: Date.now() + 1,
        text: responseText,
        sender: "admin",
        timestamp: new Date().toISOString(),
        read: false,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;

      // Đánh dấu tất cả tin nhắn là đã đọc khi mở chat
      if (state.isOpen) {
        state.messages.forEach((msg) => {
          if (msg.sender === "admin") {
            msg.read = true;
          }
        });
        state.unreadCount = 0;
      }
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    markAllAsRead: (state) => {
      state.messages.forEach((msg) => {
        msg.read = true;
      });
      state.unreadCount = 0;
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    clearChatHistory: (state) => {
      state.messages = [initialMessage];
      state.unreadCount = state.isOpen ? 0 : 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý sendMessage
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.status = "idle";
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Xử lý getResponse
      .addCase(getResponse.pending, (state) => {
        state.status = "loading";
        state.isTyping = true;
      })
      .addCase(getResponse.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.status = "idle";
        state.isTyping = false;

        // Tăng số tin nhắn chưa đọc nếu chat đang đóng
        if (!state.isOpen) {
          state.unreadCount += 1;
        }
      })
      .addCase(getResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isTyping = false;
      });
  },
});

export const {
  toggleChat,
  addMessage,
  markAllAsRead,
  setTyping,
  clearChatHistory,
} = chatSlice.actions;

export const selectChatState = (state) => state.chat;
export const selectMessages = (state) => state.chat.messages;
export const selectIsTyping = (state) => state.chat.isTyping;
export const selectIsOpen = (state) => state.chat.isOpen;
export const selectUnreadCount = (state) => state.chat.unreadCount;

export default chatSlice.reducer;
