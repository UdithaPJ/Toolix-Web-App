const Joi = require("joi");

const { VALIDATION_ERROR } = require("../../helper");

const emailReg =
  /^([a-zA-Z0-9]*)([\.{1}])?([a-zA-Z0-9]*)\@foe([\.])sjp([\.])ac([\.])lk$/;

const loginSchema = Joi.object({
  userName: Joi.string().required("User Name is required"),
  password: Joi.string().required("Password is required"),
});

const forgetPasswordCheckSchema = Joi.object({
  userName: Joi.string().required("User Name is required"),
  email: Joi.string().required().regex(emailReg, "valid email"),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required("Old password is required"),
  newPassword: Joi.string().required("New password is required"),
});

const forgetPasswordSetPasswordSchema = Joi.object({
  userId: Joi.string().required("User id is required"),
  password: Joi.string().required("Password is required"),
});

const signUpSchema = Joi.object({
  name: Joi.string().required("Name is required"),
  userName: Joi.string().required("User Name is required"),
  password: Joi.string().required("Password is required"),
  email: Joi.string().required().regex(emailReg, "valid email"),
});

const login = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const signup = async (req, res, next) => {
  try {
    await signUpSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const forgetPasswordCheck = async (req, res, next) => {
  try {
    await forgetPasswordCheckSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const forgetPasswordSetPassword = async (req, res, next) => {
  try {
    await forgetPasswordSetPasswordSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    await changePasswordSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  signup,
  login,
  forgetPasswordSetPassword,
  forgetPasswordCheck,
  changePassword,
};
