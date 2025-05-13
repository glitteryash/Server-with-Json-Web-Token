const Joi = require("joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    role: Joi.string().required().valid("student", "instructor"),
  }).messages({
    "any.require": "{#label}は必須項目です。",
    "string.email": "有効な{#label}をご入力ください。",
    "string.min": "{#label}は{#limit}文字以上です。",
    "string.max": "{#label}は{#limit}文字以内です。",
    "any.only": "{#label}はStudentまたはInstructorでなければなりません。",
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  }).messages({
    "any.require": "{#label}は必須項目です。",
    "string.email": "有効な{#label}をご入力ください。",
    "string.min": "{#label}は{#limit}文字以上です。",
    "string.max": "{#label}は{#limit}文字以内です。",
  });
  return schema.validate(data);
};

const updateUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50),
    password: Joi.string().min(6).max(1024),
    confirmPassword: Joi.when("password", {
      is: Joi.exist(),
      then: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "パスワードが一致しません。",
      }),
      otherwise: Joi.forbidden(),
    }),
  })
    .messages({
      "string.min": "{#label}は{#limit}文字以上です。",
      "string.max": "{#label}は{#limit}文字以内です。",
    })
    .options({ stripUnknown: true });
  return schema.validate(data);
};

const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(150),
    price: Joi.number().required().min(1).max(9999),
  }).messages({
    "any.require": "{#label}は必須項目です。",
    "string.min": "{#label}は{#limit}文字以上です。",
    "string.max": "{#label}は{#limit}文字以内です。",
    "number.base": "{#label}は必ず数字でなければなりません。",
    "number.min": "{#label}は{#limit}円以上です。",
    "number.max": "{#label}は{#limit}円以内です。",
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  courseValidation,
  updateUserValidation,
};
