const { SUCCESS, ERROR } = require("../../helper");
const { UserCodes } = require("../constants/user-constant");
const Service = require("../service/user-service");

const login = async (req, res) => {
  try {
    const result = await Service.login(req.body);

    SUCCESS(res, UserCodes.SUC_LOGIN, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const signUp = async (req, res) => {
  try {
    const result = await Service.signUp(req.body);

    SUCCESS(res, UserCodes.SUC_SIGNUP, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const passwordRest = async (req, res) => {
  try {
    const result = await Service.passwordRest(req.body);

    SUCCESS(res, UserCodes.SUC_RESET, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const forgetPasswordCheck = async (req, res) => {
  try {
    const result = await Service.forgetPasswordCheck(req.body);

    SUCCESS(res, UserCodes.SUC_FORGET_PASSWORD_CHECK, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const forgetPasswordSetPassword = async (req, res) => {
  try {
    const result = await Service.forgetPasswordSetPassword(req.body);

    SUCCESS(res, UserCodes.SUC_PASSWORD_UPDATE, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const changePassword = async (req, res) => {
  try {
    const result = await Service.changePassword(req.body, req.user);

    SUCCESS(res, UserCodes.SUC_CHANGE_PASSWORD, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const getAuthUser = async (req, res) => {
  try {
    const result = await Service.getAuthUser(req.user);

    SUCCESS(res, UserCodes.SUC_CODE, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const query = req.query;
    const result = await Service.getUsers(query);

    SUCCESS(res, UserCodes.SUC_CODE, result);
  } catch (error) {
    ERROR(res, error);
  }
};

module.exports = {
  login,
  signUp,
  forgetPasswordCheck,
  forgetPasswordSetPassword,
  passwordRest,
  changePassword,
  getAuthUser,
  getUsers,
};
