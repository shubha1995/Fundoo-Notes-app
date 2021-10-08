const Joi = require("joi");

const authUserRegister = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  // eslint-disable-next-line prefer-regex-literals
  password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})"))
});

const authUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const authUserforgot = Joi.object({
  email: Joi.string().email().required()
});

const validateReset = Joi.object({
  token: Joi.string().required(),
  // eslint-disable-next-line prefer-regex-literals
  password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})"))
});

module.exports = { authUserRegister, authUserLogin, authUserforgot, validateReset };
