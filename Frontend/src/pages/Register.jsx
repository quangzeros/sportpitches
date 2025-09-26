import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import authService from "../services/callAuthApi";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    acceptTerms: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!userData.name.trim()) {
      errors.name = "Họ tên không được để trống";
      isValid = false;
    }

    if (!userData.email) {
      errors.email = "Email không được để trống";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (userData.phone && !/^[0-9]{10,11}$/.test(userData.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
      isValid = false;
    }

    if (!userData.password) {
      errors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (userData.password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
      isValid = false;
    }

    if (userData.passwordConfirm !== userData.password) {
      errors.passwordConfirm = "Xác nhận mật khẩu không khớp";
      isValid = false;
    }

    if (!userData.acceptTerms) {
      errors.acceptTerms = "Bạn phải đồng ý với điều khoản dịch vụ";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.register(userData);

      // Show success message and redirect to login
      navigate("/login", {
        state: {
          registrationSuccess: true,
          email: userData.email,
        },
      });
    } catch (error) {
      setFormErrors({
        submit: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Đăng ký tài khoản mới
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Đăng nhập
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* General error message */}
          {formErrors.submit && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 px-4 py-3 rounded-md">
              <p>{formErrors.submit}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={userData.name}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formErrors.name
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 sm:text-sm`}
                  placeholder="Nguyễn Văn A"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formErrors.email
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 sm:text-sm`}
                  placeholder="your-email@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Số điện thoại
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={userData.phone}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formErrors.phone
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 sm:text-sm`}
                  placeholder="0912345678"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={userData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formErrors.password
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 sm:text-sm`}
                  placeholder="••••••••"
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.password}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Mật khẩu phải có ít nhất 8 ký tự
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={userData.passwordConfirm}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formErrors.passwordConfirm
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 sm:text-sm`}
                  placeholder="••••••••"
                />
                {formErrors.passwordConfirm && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.passwordConfirm}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={userData.acceptTerms}
                onChange={handleChange}
                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                  formErrors.acceptTerms
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              <label
                htmlFor="acceptTerms"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Tôi đồng ý với{" "}
                <Link
                  to="/terms"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  điều khoản dịch vụ
                </Link>
              </label>
            </div>
            {formErrors.acceptTerms && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formErrors.acceptTerms}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
