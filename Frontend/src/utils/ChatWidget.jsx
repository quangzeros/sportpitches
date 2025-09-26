import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaComment, FaTimes, FaPaperPlane } from "react-icons/fa";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  // Cuộn xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  // Giả lập tin nhắn chào mừng từ Admin khi mở chat lần đầu
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: "Xin chào! Tôi là trợ lý từ Booking Pitchs. Bạn cần hỗ trợ gì không?",
            sender: "admin",
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // Giả lập trả lời từ Admin sau khi người dùng gửi tin nhắn
  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "user"
    ) {
      const adminMessage = {
        id: Date.now() + 1,
        text: getAdminResponse(messages[messages.length - 1].text),
        sender: "admin",
        timestamp: new Date(),
      };
      setTimeout(() => {
        setMessages((prev) => [...prev, adminMessage]);
        setIsTyping(false);
      }, 1000);

      if (!isOpen) {
        setUnreadCount((prevCount) => prevCount + 1);
      }
    }
  }, [messages]);

  // Đếm số tin nhắn chưa đọc khi chat đang đóng
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const newMessages = messages.filter(
        (msg) => msg.sender === "admin" && !msg.read
      );
      setUnreadCount(newMessages.length);
    }
  }, [messages, isOpen]);

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Thêm tin nhắn của người dùng
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);
  };

  // Hàm trả về câu trả lời mẫu từ admin (có thể thay thế bằng AI sau này)
  const getAdminResponse = (msg) => {
    const userQuestion = msg.toLowerCase();

    if (
      userQuestion.includes("xin chào") ||
      userQuestion.includes("hello") ||
      userQuestion.includes("hi")
    ) {
      return `Xin chào ${
        currentUser?.name || "quý khách"
      }! Tôi có thể giúp gì cho bạn?`;
    } else if (
      userQuestion.includes("đặt sân") ||
      userQuestion.includes("booking")
    ) {
      return "Để đặt sân, bạn có thể vào mục Tìm sân và chọn sân phù hợp, sau đó chọn thời gian và thanh toán.";
    } else if (userQuestion.includes("giá") || userQuestion.includes("phí")) {
      return "Giá thuê sân phụ thuộc vào loại sân và thời gian. Bạn có thể xem chi tiết giá tại trang thông tin của từng sân.";
    } else if (
      userQuestion.includes("thanh toán") ||
      userQuestion.includes("payment")
    ) {
      return "Chúng tôi hỗ trợ thanh toán qua thẻ ngân hàng, ví điện tử, và tiền mặt tại chỗ.";
    } else if (
      userQuestion.includes("hủy") ||
      userQuestion.includes("cancel")
    ) {
      return "Bạn có thể hủy đặt sân trước 24 giờ để được hoàn tiền 100%. Hủy trước 12 giờ sẽ được hoàn 50%.";
    } else {
      return "Cảm ơn bạn đã liên hệ. Nhân viên của chúng tôi sẽ trả lời bạn sớm nhất có thể!";
    }
  };

  return (
    <>
      {/* Chat icon */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Chat với hỗ trợ"
        >
          {isOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaComment className="text-xl" />
          )}
        </button>

        {/* Hiển thị số tin nhắn chưa đọc */}
        {!isOpen && unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-300 animate-slide-in">
          {/* Chat header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Hỗ trợ trực tuyến</h3>
              <p className="text-xs text-blue-100">
                Thời gian phản hồi: ~5 phút
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
              aria-label="Đóng chat"
            >
              <FaTimes />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96 bg-gray-50 dark:bg-gray-900">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <p>Bắt đầu trò chuyện với chúng tôi</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-3/4 rounded-lg px-4 py-2 ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          msg.sender === "user"
                            ? "text-blue-200"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className={`px-3 py-2 bg-blue-600 text-white rounded-lg ${
                  message.trim() === ""
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={message.trim() === ""}
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
