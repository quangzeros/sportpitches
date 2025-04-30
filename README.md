# ⚽️ Website Đặt Sân Thể Thao Trực Tuyến

Chào mừng bạn đến với dự án website đặt sân thể thao trực tuyến của chúng tôi! Ứng dụng này được xây dựng nhằm mục đích giúp người dùng dễ dàng tìm kiếm, lựa chọn và đặt lịch các sân tập cho nhiều môn thể thao khác nhau một cách nhanh chóng và tiện lợi.

## ✨ Tính năng nổi bật

* **Tìm kiếm và lọc sân:** Dễ dàng tìm kiếm sân theo vị trí, môn thể thao, khung giờ, và các tiện nghi khác.
* **Xem thông tin chi tiết sân:** Hiển thị đầy đủ thông tin về sân, bao gồm hình ảnh, mô tả, bảng giá, và đánh giá từ người dùng khác.
* **Đặt lịch trực tuyến:** Quy trình đặt lịch đơn giản và nhanh chóng chỉ với vài thao tác.
* **Quản lý đặt chỗ:** Người dùng có thể xem lại lịch sử đặt chỗ, hủy đặt chỗ (theo chính sách), và quản lý thông tin cá nhân.
* **Hỗ trợ đa dạng môn thể thao:** Mở rộng cho nhiều môn thể thao phổ biến như bóng đá, bóng rổ, tennis, cầu lông, v.v.
* **Hệ thống quản trị (dành cho chủ sân):**
    * Quản lý thông tin sân (thêm, sửa, xóa).
    * Quản lý lịch trình và giá cả.
    * Xem thống kê đặt chỗ.

## 🛠️ Công nghệ sử dụng

Dự án này được xây dựng với các công nghệ sau:

* **Frontend:** [ReactJs](https://react.dev/) - Một thư viện JavaScript mạnh mẽ để xây dựng giao diện người dùng động và tương tác.
* **Backend:** [Node.js](https://nodejs.org/) - Một môi trường JavaScript runtime được xây dựng trên V8 engine của Chrome, cho phép xây dựng các ứng dụng backend mạnh mẽ và có khả năng mở rộng.
* **Database:** [MongoDB](https://www.mongodb.com/) - Một hệ quản trị cơ sở dữ liệu NoSQL linh hoạt và dễ dàng mở rộng, phù hợp với các ứng dụng web hiện đại.

## 🚀 Hướng dẫn cài đặt và chạy

Để chạy dự án này trên máy cục bộ của bạn, hãy làm theo các bước sau:

**Yêu cầu tiên quyết:**

* [Node.js](https://nodejs.org/) (phiên bản LTS được khuyến nghị)
* [npm](https://www.npmjs.com/) hoặc [yarn](https://yarnpkg.com/) (trình quản lý gói cho Node.js)
* [MongoDB](https://www.mongodb.com/try/download/community) (đảm bảo MongoDB server đang chạy)

**Các bước:**

1.  **Clone repository:**
    ```bash
    git clone [Đường dẫn đến repository của bạn]
    cd [Tên thư mục dự án]
    ```

2.  **Cài đặt các gói dependencies cho Backend:**
    ```bash
    cd backend
    npm install  # hoặc yarn install
    ```

3.  **Cấu hình Backend:**
    * Tạo một file `.env` trong thư mục `backend` và cấu hình các biến môi trường cần thiết, ví dụ:
        ```env
        PORT=5000
        MONGODB_URI=mongodb://localhost:27017/dat_san_the_thao
        # Các cấu hình khác (nếu có)
        ```
    * Đảm bảo đường dẫn kết nối MongoDB (`MONGODB_URI`) trỏ đến database MongoDB của bạn.

4.  **Chạy Backend:**
    ```bash
    npm run dev  # hoặc yarn dev (nếu bạn đã cấu hình script 'dev' trong package.json)
    # Hoặc
    npm start  # hoặc yarn start
    ```
    Backend server sẽ chạy trên cổng bạn đã cấu hình (ví dụ: `http://localhost:5000`).

5.  **Cài đặt các gói dependencies cho Frontend:**
    ```bash
    cd ../frontend
    npm install  # hoặc yarn install
    ```

6.  **Cấu hình Frontend:**
    * Tạo một file `.env.local` trong thư mục `frontend` và cấu hình các biến môi trường cần thiết, ví dụ:
        ```env
        REACT_APP_API_BASE_URL=http://localhost:5000/api
        # Các cấu hình khác (nếu có)
        ```
    * Đảm bảo `REACT_APP_API_BASE_URL` trỏ đến địa chỉ backend server của bạn.

7.  **Chạy Frontend:**
    ```bash
    npm start  # hoặc yarn start
    ```
    Ứng dụng frontend sẽ được mở trong trình duyệt của bạn (thường là `http://localhost:3000`).

## 🤝 Đóng góp

Chúng tôi luôn chào đón những đóng góp từ cộng đồng. Nếu bạn có ý tưởng cải thiện, phát hiện lỗi, hoặc muốn thêm tính năng mới, đừng ngần ngại tạo pull request!

## 📄 Giấy phép

[Thêm thông tin về giấy phép dự án của bạn (ví dụ: MIT License)]

## 🙏 Lời cảm ơn

Xin chân thành cảm ơn tất cả những người đã đóng góp vào dự án này!

---
