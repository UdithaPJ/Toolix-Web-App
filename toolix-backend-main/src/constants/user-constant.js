const ToolStatus = ["New", "Used"];

const Role = ["ADMIN", "INSTRUCTOR", "STUDENT"];

const _setCode = (code) => ({
  code: code, // custom_code
});

const UserCodes = {
  SUC_LOGIN: { ..._setCode(200), message: "Login success" },

  SUC_PASSWORD_UPDATE: {
    ..._setCode(200),
    message: "Password updated successfully",
  },

  SUC_FORGET_PASSWORD_CHECK: {
    ..._setCode(200),
    message: "Please enter new password",
  },

  SUC_CODE: { ..._setCode(200), message: "ok" },

  SUC_CHANGE_PASSWORD: {
    ..._setCode(200),
    message: "Password changed successfully",
  },

  SUC_SIGNUP: { ..._setCode(200), message: "Successfully registered" },

  ERR_EMAIL_EXIST: {
    ..._setCode(400),
    message: "Email already registered",
  },

  ERR_OLD_PASSWORD_INCORRECT: {
    ..._setCode(400),
    message: "Old password is incorrect",
  },

  ERR_USERNAME_EXIST: {
    ..._setCode(400),
    message: "UserName already registered",
  },

  ERR_USERNAME_NOT_REGISTERED: {
    ..._setCode(404),
    message: "User not registered. Please register for an account",
  },

  ERR_USERNAME_OR_EMAIL_NOT_VALID: {
    ..._setCode(400),
    message: "User name or email address you have entered is not valid",
  },

  ERR_INCORRECT_PASSWORD: {
    ..._setCode(400),
    message: "Invalid password",
  },

  ERR_SOMETHING_WRONG: {
    ..._setCode(400),
    message: "Something went wrong. Please try again later",
  },
};

module.exports = { ToolStatus, Role, UserCodes };
