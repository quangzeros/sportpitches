import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import ErrorPage from "./ui/ErrorPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { checkAuth } from "./features/user/userSlice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/user/profile";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
      {
        path: "*", // Catch-all route
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Kiểm tra xác thực khi ứng dụng khởi động
    dispatch(checkAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
