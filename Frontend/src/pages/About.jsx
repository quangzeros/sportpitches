import React from "react";
import { Link } from "react-router-dom";
import teamMember1 from "./../assets/team_member-1.jpg";

function About() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Sports Field"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-blue-800/70 dark:from-blue-900/70 dark:to-gray-900/70 mix-blend-multiply" />
        </div>

        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Về SportsPitch
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-100">
            Kết nối đam mê thể thao với những sân chơi chất lượng
          </p>
        </div>
      </div>

      {/* Our story section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Câu chuyện của chúng tôi
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Đam mê thể thao, đam mê kết nối
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              SportsPitch ra đời từ niềm đam mê thể thao và mong muốn tạo ra một
              nền tảng giúp mọi người dễ dàng tiếp cận với các sân chơi thể thao
              chất lượng.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-lg leading-7 font-semibold text-gray-900 dark:text-white">
                  <h3>Khởi nguồn</h3>
                </div>
                <div className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  <p>
                    Năm 2022, một nhóm những người đam mê thể thao nhận thấy khó
                    khăn khi tìm và đặt sân chơi. Chúng tôi quyết định tạo ra
                    một nền tảng đơn giản, tiện lợi để kết nối người chơi với
                    các sân thể thao.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-lg leading-7 font-semibold text-gray-900 dark:text-white">
                  <h3>Sứ mệnh</h3>
                </div>
                <div className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  <p>
                    Sứ mệnh của chúng tôi là đơn giản hóa việc đặt sân thể thao,
                    giúp mọi người tận hưởng niềm vui thể thao mà không phải lo
                    lắng về vấn đề tìm kiếm và đặt sân.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-lg leading-7 font-semibold text-gray-900 dark:text-white">
                  <h3>Tầm nhìn</h3>
                </div>
                <div className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  <p>
                    Chúng tôi hướng đến việc trở thành nền tảng đặt sân thể thao
                    hàng đầu Việt Nam, mang đến trải nghiệm tốt nhất cho người
                    dùng và đối tác.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-lg leading-7 font-semibold text-gray-900 dark:text-white">
                  <h3>Giá trị cốt lõi</h3>
                </div>
                <div className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  <p>
                    Chúng tôi tin vào tính minh bạch, sự tiện lợi và chất lượng
                    dịch vụ. Mỗi quyết định của chúng tôi đều hướng đến việc cải
                    thiện trải nghiệm của người dùng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Đội ngũ của chúng tôi
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Những người sáng lập
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              Đội ngũ đam mê thể thao và công nghệ, luôn nỗ lực mang đến trải
              nghiệm tốt nhất cho người dùng.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Team member 1 */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <img
                  className="h-48 w-full object-cover object-center"
                  src={teamMember1}
                  alt="Team member"
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Nguyễn Khắc Quang
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    CEO & Co-Founder
                  </p>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                    15 năm kinh nghiệm trong ngành công nghệ và là một người đam
                    mê bóng đá.
                  </p>
                </div>
              </div>

              {/* Team member 2 */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <img
                  className="h-48 w-full object-cover object-center"
                  src={teamMember1}
                  alt="Team member"
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Nguyễn Khắc Quang
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    COO & Co-Founder
                  </p>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                    Chuyên gia về vận hành doanh nghiệp với niềm đam mê với thể
                    thao đặc biệt là cầu lông.
                  </p>
                </div>
              </div>

              {/* Team member 3 */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <img
                  className="h-48 w-full object-cover object-center"
                  src={teamMember1}
                  alt="Team member"
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Nguyễn Khắc Quang
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    CTO & Co-Founder
                  </p>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                    10 năm kinh nghiệm phát triển phần mềm và là một huấn luyện
                    viên tennis nghiệp dư.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-blue-600 dark:bg-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <p className="text-5xl font-extrabold text-white">500+</p>
              <p className="mt-2 text-lg text-blue-100">Sân thể thao</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold text-white">50K+</p>
              <p className="mt-2 text-lg text-blue-100">Người dùng hài lòng</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold text-white">100K+</p>
              <p className="mt-2 text-lg text-blue-100">Lượt đặt sân</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold text-white">30+</p>
              <p className="mt-2 text-lg text-blue-100">Tỉnh thành</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 dark:bg-blue-700 rounded-lg shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center lg:max-w-3xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Sẵn sàng trải nghiệm?</span>
                  <span className="block">Bắt đầu đặt sân ngay hôm nay.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-100">
                  Tìm và đặt sân thể thao yêu thích của bạn chỉ trong vài bước
                  đơn giản.
                </p>
                <Link
                  to="/booking"
                  className="mt-8 bg-white dark:bg-gray-800 border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Đặt sân ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
