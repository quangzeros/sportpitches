const Joi = require("joi");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50).trim().strict().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: false })
    .required()
    .trim()
    .strict(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
  passwordConfirm: Joi.ref("password"),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{10,11}$"))
    .optional()
    .trim()
    .strict(),
  avatar: Joi.string().uri().allow(null).optional(),
  role: Joi.string().valid("user", "owner", "admin").default("user").optional(),
}).with("password", "passwordConfirm");

const Register = (req, res, next) => {
  try {
    userSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Đã xảy ra lỗi",
    });
  }
};

const authValidation = {
  Register,
};

module.exports = authValidation;
