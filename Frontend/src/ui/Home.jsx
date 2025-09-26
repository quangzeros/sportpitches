import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaFutbol,
  FaTableTennis,
  FaBasketballBall,
  FaVolleyballBall,
} from "react-icons/fa";
import { GiTennisRacket } from "react-icons/gi";
const BadmintonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-6 h-6"
  >
    <path d="M12 2v6m0 0v6m0-6h-4m4 0h4" />
    <circle cx="12" cy="18" r="2" />
  </svg>
);

// Import your hero image
// import heroImage from "../assets/images/hero-background.jpg";
const featuredVenues = [
  {
    id: 1,
    name: "Sân bóng đá Mini Thành Phát",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3",
    category: "football",
    rating: 4.8,
    location: "Cầu Giấy, Hà Nội",
    price: "300.000đ",
  },
  {
    id: 2,
    name: "Sân cầu lông Star Sport",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3",
    category: "badminton",
    rating: 4.6,
    location: "Đống Đa, Hà Nội",
    price: "120.000đ",
  },
  {
    id: 3,
    name: "Sân Tennis Victory",
    image:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3",
    category: "tennis",
    rating: 4.7,
    location: "Quận 7, TP.HCM",
    price: "250.000đ",
  },
  {
    id: 4,
    name: "Sân bóng rổ Thể Thao Plus",
    image:
      "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-4.0.3",
    category: "basketball",
    rating: 4.5,
    location: "Thanh Xuân, Hà Nội",
    price: "200.000đ",
  },
  {
    id: 5,
    name: "Sân bóng đá Mỹ Đình Sports",
    image:
      "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3",
    category: "football",
    rating: 4.9,
    location: "Nam Từ Liêm, Hà Nội",
    price: "350.000đ",
  },
  {
    id: 6,
    name: "Sân cầu lông Olympia",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3",
    category: "badminton",
    rating: 4.7,
    location: "Quận 3, TP.HCM",
    price: "150.000đ",
  },
  {
    id: 7,
    name: "Sân bóng chuyền Đại học Thể dục Thể thao",
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3",
    category: "volleyball",
    rating: 4.4,
    location: "Từ Liêm, Hà Nội",
    price: "180.000đ",
  },
  {
    id: 8,
    name: "Sân bóng bàn Hà Đông",
    image:
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?ixlib=rb-4.0.3",
    category: "tabletennis",
    rating: 4.3,
    location: "Hà Đông, Hà Nội",
    price: "80.000đ",
  },
];
function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleVenues, setVisibleVenues] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Featured venues data

  // Categories
  const categories = [
    { id: "all", name: "Tất cả", icon: <FiStar className="w-5 h-5" /> },
    { id: "football", name: "Bóng đá", icon: <FaFutbol className="w-5 h-5" /> },
    {
      id: "badminton",
      name: "Cầu lông",
      icon: <BadmintonIcon />,
    },
    {
      id: "tennis",
      name: "Tennis",
      icon: <GiTennisRacket className="w-6 h-6" />,
    },
    {
      id: "basketball",
      name: "Bóng rổ",
      icon: <FaBasketballBall className="w-5 h-5" />,
    },
    {
      id: "volleyball",
      name: "Bóng chuyền",
      icon: <FaVolleyballBall className="w-5 h-5" />,
    },
    {
      id: "tabletennis",
      name: "Bóng bàn",
      icon: <FaTableTennis className="w-5 h-5" />,
    },
  ];

  // Features section
  const features = [
    {
      title: "Tìm kiếm dễ dàng",
      description:
        "Tìm kiếm và lọc sân theo vị trí, loại sân, giá cả và đánh giá",
      icon: <FiSearch className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Đặt sân nhanh chóng",
      description:
        "Đặt sân chỉ với vài thao tác đơn giản, xác nhận ngay lập tức",
      icon: <FiCalendar className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Nhiều lựa chọn",
      description:
        "Hàng trăm sân thể thao chất lượng cao tại các khu vực trên cả nước",
      icon: <FiMapPin className="h-8 w-8 text-blue-500" />,
    },
  ];

  // Popular cities
  const popularCities = [
    {
      name: "Hà Nội",
      image:
        "https://images.unsplash.com/photo-1535709418-8ccf18cfab99?ixlib=rb-4.0.3",
      venueCount: 150,
    },
    {
      name: "TP. Hồ Chí Minh",
      image:
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3",
      venueCount: 220,
    },
    {
      name: "Đà Nẵng",
      image:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3",
      venueCount: 85,
    },
    {
      name: "Hải Phòng",
      image:
        "https://images.unsplash.com/photo-1695731192279-984755abd53f?ixlib=rb-4.0.3",
      venueCount: 65,
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Cầu thủ nghiệp dư",
      content:
        "SportsPitch giúp tôi và đồng đội dễ dàng tìm và đặt sân bóng đá mỗi tuần. Giao diện đơn giản, dễ sử dụng và có nhiều sân chất lượng để lựa chọn.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3",
    },
    {
      name: "Trần Thị B",
      role: "Huấn luyện viên cầu lông",
      content:
        "Tôi thường xuyên đặt sân cầu lông để dạy học. SportsPitch giúp tôi tiết kiệm thời gian và công sức, đồng thời còn có nhiều ưu đãi hấp dẫn.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
    },
    {
      name: "Lê Văn C",
      role: "Người chơi tennis",
      content:
        "Trước đây tôi thường mất nhiều thời gian để gọi điện đặt sân tennis. Giờ đây với SportsPitch, mọi thứ trở nên dễ dàng hơn rất nhiều.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3",
    },
  ];

  // Filter venues based on active category and search query
  useEffect(() => {
    let filteredVenues = featuredVenues;

    // Filter by category
    if (activeCategory !== "all") {
      filteredVenues = filteredVenues.filter(
        (venue) => venue.category === activeCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredVenues = filteredVenues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(query) ||
          venue.location.toLowerCase().includes(query)
      );
    }

    setVisibleVenues(filteredVenues);
  }, [activeCategory, searchQuery]);

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden z-0">
          <img
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3"
            alt="Sports Field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/60 mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Đặt sân thể thao online nhanh chóng, tiện lợi
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-blue-100">
              Tìm và đặt sân bóng đá, cầu lông, tennis, bóng rổ... với giá tốt
              nhất tại Việt Nam
            </p>

            {/* Search box */}
            <div className="mt-10 max-w-xl">
              <div className="relative">
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg ring-1 ring-gray-300 dark:ring-gray-700">
                  <div className="p-4 text-gray-500 dark:text-gray-400">
                    <FiSearch className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    className="flex-1 py-3 pr-4 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Tìm kiếm sân, địa điểm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() =>
                      setTimeout(() => setIsSearchFocused(false), 200)
                    }
                  />
                  <Link
                    to="/search"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 font-medium transition-colors"
                  >
                    Tìm kiếm
                  </Link>
                </div>

                {/* Search suggestions (show when focused and has input) */}
                {isSearchFocused && searchQuery && (
                  <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-gray-200 dark:border-gray-700">
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1 px-3 py-1">
                        Địa điểm phổ biến
                      </div>
                      {[
                        "Cầu Giấy, Hà Nội",
                        "Quận 7, TP.HCM",
                        "Thanh Xuân, Hà Nội",
                      ]
                        .filter((location) =>
                          location
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .slice(0, 3)
                        .map((location, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer flex items-center"
                            onClick={() => setSearchQuery(location)}
                          >
                            <FiMapPin className="mr-2 text-gray-400" />
                            <span>{location}</span>
                          </div>
                        ))}

                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1 mt-2 px-3 py-1">
                        Sân phổ biến
                      </div>
                      {featuredVenues
                        .filter((venue) =>
                          venue.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .slice(0, 3)
                        .map((venue) => (
                          <div
                            key={venue.id}
                            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                            onClick={() => setSearchQuery(venue.name)}
                          >
                            {venue.name}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Loại sân thể thao
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Venues */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Sân đang hot
        </h2>

        {visibleVenues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {categories.find((cat) => cat.id === venue.category)
                      ?.name || venue.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-semibold px-3 py-1 rounded shadow-sm">
                    {venue.price}/giờ
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate">
                    {venue.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <FiMapPin className="text-gray-500 mr-1 h-4 w-4" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {venue.location}
                    </p>
                  </div>
                  <div className="mt-2">
                    <StarRating rating={venue.rating} />
                  </div>
                  <Link
                    to={`/venues/${venue.id}`}
                    className="mt-4 block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
                  >
                    Đặt ngay
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              Không tìm thấy sân phù hợp với tiêu chí của bạn.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
            >
              Xem tất cả sân
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/venues"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
          >
            Xem tất cả sân thể thao
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tại sao chọn SportsPitch?
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Chúng tôi cung cấp giải pháp đặt sân thể thao trực tuyến hiện đại,
              tiện lợi giúp bạn dễ dàng tìm và đặt sân.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
              >
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Cities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Địa điểm phổ biến
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCities.map((city, index) => (
            <Link
              to={`/venues?city=${encodeURIComponent(city.name)}`}
              key={index}
              className="group relative rounded-lg overflow-hidden h-60"
            >
              <img
                src={city.image}
                alt={city.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white">{city.name}</h3>
                <p className="text-sm text-gray-200">
                  {city.venueCount} sân thể thao
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Đội ngũ SportsPitch luôn nỗ lực mang đến trải nghiệm tốt nhất cho
              người dùng
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.avatar}
                    alt={`Avatar of ${testimonial.name}`}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "{testimonial.content}"
                </p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-white">
              Sẵn sàng trải nghiệm?
            </h2>
            <p className="mt-2 text-lg text-blue-100 max-w-md">
              Tìm kiếm, so sánh và đặt sân thể thao yêu thích của bạn ngay hôm
              nay.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors shadow-md text-center"
            >
              Đăng ký
            </Link>
            <Link
              to="/booking"
              className="px-8 py-3 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-700 transition-colors border border-blue-400 text-center"
            >
              Đặt sân ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
