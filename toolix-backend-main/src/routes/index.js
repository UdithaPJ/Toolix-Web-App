const express = require("express");

const UserRoutes = require("./user-router");

const BorrowRoutes = require("./borrow-route");

const ToolRoutes = require("./tool-router");

const { checkAllToken } = require("../middlewares/admin-middleware");

const Validator = require("../validation/user-validator");

const Controller = require("../controller/user-controller");

const router = express.Router();

router.use("/auth", UserRoutes);

router
  .route("/api/change-password")
  .post(checkAllToken, Validator.changePassword, Controller.changePassword);

router.route("/api/auth-user").get(checkAllToken, Controller.getAuthUser);

router.use("/api/tools", ToolRoutes);

router.use("/api/borrowings", BorrowRoutes);

router.use("/api/users", UserRoutes);

module.exports = router;
