const Joi = require("joi");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

const userSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9\\sÀ-ỹ]+$"))
    .min(3)
    .max(50)
    .trim()
    .strict()
    .required()
    .messages({
      "string.base": "Tên không hợp lệ",
      "string.empty": "Tên không được để trống",
      "string.min": "Tên phải có ít nhất {#limit} ký tự",
      "string.max": "Tên không được quá {#limit} ký tự",
      "any.required": "Tên là bắt buộc",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: false })
    .required()
    .trim()
    .strict(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
  passwordConfirm: Joi.any().equal(Joi.ref("password")).messages({
    "any.only": "Xác nhận mật khẩu phải giống với mật khẩu",
  }),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{10,11}$"))
    .optional()
    .allow("")
    .trim()
    .strict(),
  avatar: Joi.string().uri().allow(null).optional(),
  role: Joi.string().valid("user", "owner", "admin").default("user").optional(),
  acceptTerms: Joi.boolean().valid(true),
}).with("password", "passwordConfirm");

const Register = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: error.details.map((err) => err.message).join(", "),
    });
  }
};

const Login = async (req, res, next) => {
  try {
    const loginSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: false })
        .required()
        .trim()
        .strict(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
      rememberMe: Joi.boolean().optional(),
    });

    await loginSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: error.details.map((err) => err.message).join(", "),
    });
  }
};

const authValidation = {
  Register,
  Login,
};

module.exports = authValidation;
