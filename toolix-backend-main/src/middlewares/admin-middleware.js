const jwt = require("jsonwebtoken");
const { ERROR } = require("../../helper");
const { SECRET_KEY } = require("../../config/config").ACCESS;
const { AuthCodes } = require("../constants/auth-constant");

const _checkToken = (req, res, next, roleList) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return ERROR(res, AuthCodes.ERR_TOKEN_EXPIRED);
        }
        return ERROR(res, AuthCodes.ERR_TOKEN_INVALID);
      } else {
        if (roleList.includes(decoded.role)) {
          req.user = decoded;
          next();
        } else {
          return ERROR(res, AuthCodes.ERR_ACCESS_DENIED);
        }
      }
    });
  } else {
    return ERROR(res, AuthCodes.ERR_TOKEN_NOT_PROVIDED);
  }
};

exports.checkAdminToken = (req, res, next) => {
  _checkToken(req, res, next, ["ADMIN"]);
};

exports.checkInstructorToken = (req, res, next) => {
  _checkToken(req, res, next, ["INSTRUCTOR"]);
};

exports.checkStudentToken = (req, res, next) => {
  _checkToken(req, res, next, ["STUDENT"]);
};

exports.checkAdminAndInstructorToken = (req, res, next) => {
  _checkToken(req, res, next, ["ADMIN", "INSTRUCTOR"]);
};

exports.checkAllToken = (req, res, next) => {
  _checkToken(req, res, next, ["ADMIN", "INSTRUCTOR", "STUDENT"]);
};
