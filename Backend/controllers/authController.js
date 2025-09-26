const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const User = require("../models/User");
const {
  signToken,
  generateToken,
  verifyRefreshToken,
  generateAccessToken,
  deleteRefreshToken,
} = require("../utils/jwtUtils");

//Register User
const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkEmailExist = await User.findOne({ email: email });

    if (checkEmailExist) {
      throw new Error("Email đã tồn tại");
    }

    //Save user to database
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.status(StatusCodes.CREATED).json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    if (error.message === "Email đã tồn tại") {
      return res.status(StatusCodes.CONFLICT).json({
        message: error.message,
      });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Đã xảy ra lỗi",
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      throw new Error("Mật khẩu không chính xác");
    }

    //Generate token
    const { accessToken, refreshToken } = await generateToken(user);

    res.status(StatusCodes.OK).json({
      message: "Đăng nhập thành công",
      user: { ...user._doc, password: undefined },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: error.message,
    });
  }
};

const RefreshToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let refreshToken;
    if (authHeader && authHeader.startsWith("Bearer")) {
      refreshToken = authHeader.split(" ")[1];
    }

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Refresh token không hợp lệ",
      });
    }

    //Verify refresh token
    const decoded = await verifyRefreshToken(refreshToken.trim());

    if (!decoded) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Refresh token không hợp lệ",
      });
    }

    //Generate new access token
    const user = await User.findById(decoded._id);
    const newAccessToken = generateAccessToken(user);

    res.status(StatusCodes.OK).json({
      message: "Cấp lại access token thành công",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const Logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let refreshToken;
    if (authHeader && authHeader.startsWith("Bearer")) {
      refreshToken = authHeader.split(" ")[1];
    }

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Refresh token không hợp lệ",
      });
    }

    await deleteRefreshToken(refreshToken.trim());

    res.status(StatusCodes.OK).json({
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const VerifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let refreshToken;
    if (authHeader && authHeader.startsWith("Bearer")) {
      refreshToken = authHeader.split(" ")[1];
    }

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token không hợp lệ",
      });
    }

    //Verify token
    const decoded = await verifyRefreshToken(refreshToken.trim());

    if (!decoded) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token không hợp lệ",
      });
    }
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Người dùng không tồn tại",
      });
    }
    const newAccessToken = generateAccessToken(user);
    res.status(StatusCodes.OK).json({
      message: "Token hợp lệ",
      user: { ...user._doc, password: undefined },
      accessToken: newAccessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const authController = {
  Login,
  Register,
  RefreshToken,
  Logout,
  VerifyToken,
};

module.exports = authController;
