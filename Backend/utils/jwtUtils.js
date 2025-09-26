const jwt = require("jsonwebtoken");
const UserToken = require("../models/UserToken");
// Hàm chuyển đổi chuỗi thời gian JWT sang mili giây
const parseJwtExpiration = (expiresIn) => {
  const unit = expiresIn.charAt(expiresIn.length - 1);
  const value = parseInt(expiresIn.slice(0, -1));

  switch (unit) {
    case "s":
      return value * 1000; // seconds to ms
    case "m":
      return value * 60 * 1000; // minutes to ms
    case "h":
      return value * 60 * 60 * 1000; // hours to ms
    case "d":
      return value * 24 * 60 * 60 * 1000; // days to ms
    default:
      if (!isNaN(expiresIn)) {
        return parseInt(expiresIn) * 1000; // Assuming seconds if just a number
      }
      throw new Error(`Không thể phân tích thời gian hết hạn: ${expiresIn}`);
  }
};

exports.generateToken = async (user) => {
  const payload = { _id: user._id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
  // Xóa refresh token cũ nếu có
  await UserToken.findOneAndDelete({ userId: user._id });
  // Tính thời gian hết hạn đúng
  const expirationMs = parseJwtExpiration(process.env.JWT_REFRESH_EXPIRES_IN);
  const expiresAt = new Date(Date.now() + expirationMs);
  // Lưu refresh token vào cơ sở dữ liệu
  await UserToken.create({
    userId: user._id,
    refreshToken: refreshToken,
    expiresAt: expiresAt,
  });

  return Promise.resolve({ accessToken, refreshToken });
};

exports.generateAccessToken = (user) => {
  const payload = { _id: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });
};

exports.verifyRefreshToken = async (refreshToken) => {
  const userToken = await UserToken.findOne({ refreshToken: refreshToken });

  if (!userToken) {
    throw new Error("Refresh token không hợp lệ");
  }

  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

exports.deleteRefreshToken = async (refreshToken) => {
  try {
    await UserToken.findOneAndDelete({ refreshToken: refreshToken });
  } catch (error) {
    throw new Error("Refresh token không hợp lệ");
  }
};
