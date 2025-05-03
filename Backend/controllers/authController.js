const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const User = require("../models/User");

//Register User
const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
    if (error.code === 11000) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email đã tồn tại",
      });
    }
    if (error.name === "ValidationError") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Đã xảy ra lỗi",
    });
  }
};

const Login = async (req, res) => {
  res.status(StatusCodes.ACCEPTED).json({
    message: "Login successfully",
  });
};

const authController = {
  Login,
  Register,
};

module.exports = authController;
