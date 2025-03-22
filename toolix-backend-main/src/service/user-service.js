const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const UserSchema = require("../models/user");

const { UserCodes } = require("../constants/user-constant");

const { SECRET_KEY } = require("../../config/config").ACCESS;

const salt = bcrypt.genSaltSync(10);

const { TE } = require("../../helper");

const _findUser = async (filter) => {
  const user = await UserSchema.findOne(filter);
  return user;
};

const login = async (data) => {
  try {
    const { password, userName } = data;

    const user = await _findUser({ userName: userName });

    if (!user) TE(UserCodes.ERR_USERNAME_NOT_REGISTERED);

    if (bcrypt.compareSync(password, user.password)) {
      const response = {
        email: user.email,
        role: user.role,
        name: user.name,
        id: user._id,
      };

      const accessToken = jwt.sign(response, SECRET_KEY, { expiresIn: "8h" });

      return {
        accessToken: accessToken,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } else {
      TE(UserCodes.ERR_INCORRECT_PASSWORD);
    }
  } catch (error) {
    TE(error);
  }
};

const signUp = async (data) => {
  try {
    const { password, email } = data;

    let storeData = data;

    storeData.password = bcrypt.hashSync(password, salt);

    const user = await _findUser({ email: email });

    if (user) TE(UserCodes.ERR_EMAIL_EXIST);

    const splitEmail = email.split("@");

    isNaN(splitEmail[0])
      ? (storeData.role = "INSTRUCTOR")
      : (storeData.role = "STUDENT");

    return await UserSchema.create(storeData);
  } catch (error) {
    TE(error);
  }
};

const forgetPasswordCheck = async ({ userName, email }) => {
  try {
    const user = await _findUser({ userName, email });

    if (!user) TE(UserCodes.ERR_USERNAME_OR_EMAIL_NOT_VALID);

    return { userId: user._id };
  } catch (error) {
    TE(error);
  }
};

const forgetPasswordSetPassword = async ({ userId, password }) => {
  try {
    const user = await _findUser({ _id: userId });

    if (!user) TE(UserCodes.ERR_USERNAME_NOT_REGISTERED);

    const storePassword = bcrypt.hashSync(password, salt);

    await UserSchema.findOneAndUpdate(
      { _id: userId },
      { $set: { password: storePassword } },
      { new: true, runValidators: true }
    );
  } catch (error) {
    TE(error);
  }
};

const changePassword = async (data, user) => {
  try {
    const { oldPassword, newPassword } = data;

    const password = bcrypt.hashSync(newPassword, salt);

    const userData = await _findUser({ _id: user.id });

    if (!userData) TE(UserCodes.ERR_USERNAME_NOT_REGISTERED);

    if (bcrypt.compareSync(oldPassword, userData.password)) {
      await UserSchema.findOneAndUpdate(
        { _id: userData._id },
        { $set: { password } },
        { new: true, runValidators: true }
      );
    } else {
      TE(UserCodes.ERR_OLD_PASSWORD_INCORRECT);
    }
  } catch (error) {
    TE(error);
  }
};

const getAuthUser = async (user) => {
  try {
    const userData = await _findUser({ _id: user.id });

    if (!userData) TE(UserCodes.ERR_USERNAME_NOT_REGISTERED);

    return { id: userData._id, name: userData.name, email: userData.email };
  } catch (error) {
    TE(error);
  }
};

const getUsers = async (query) => {
  try {
    const users = await UserSchema.find(query).select({
      name: 1,
      _id: 1,
      email: 1,
    });
    return users;
  } catch (error) {
    TE(error);
  }
};

module.exports = {
  login,
  signUp,
  forgetPasswordSetPassword,
  forgetPasswordCheck,
  changePassword,
  getAuthUser,
  getUsers,
};
