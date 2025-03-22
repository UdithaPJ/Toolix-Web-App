const express = require("express");

const UserController = require("../controller/user-controller");

const Validator = require("../validation/user-validator");
const { checkAdminToken } = require("../middlewares/admin-middleware");

const router = express.Router();

router.route("/login").post(Validator.login, UserController.login);

router.route("/signup").post(Validator.signup, UserController.signUp);

router
  .route("/forget-password-check")
  .post(Validator.forgetPasswordCheck, UserController.forgetPasswordCheck);

router
  .route("/forget-password-set-password")
  .post(
    Validator.forgetPasswordSetPassword,
    UserController.forgetPasswordSetPassword
  );

router.route("/").get(checkAdminToken, UserController.getUsers);

module.exports = router;
