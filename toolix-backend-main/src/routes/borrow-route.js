const express = require("express");

const borrowController = require("../controller/borrow-controller");

const Validator = require("../validation/borrow-validator");

const {
  checkAdminAndInstructorToken,
  checkAdminToken,
  checkAllToken,
} = require("../middlewares/admin-middleware");

const router = express.Router();

router
  .route("/")
  .post(checkAllToken, Validator.borrowCreate, borrowController.createBorrow);

router
  .route("/")
  .get(checkAllToken, Validator.borrowGetList, borrowController.getBorrows);

router
  .route("/by-instructor")
  .get(
    checkAdminToken,
    Validator.borrowGetListByInstructorId,
    borrowController.getBorrowsByInstructorId
  );

router
  .route("/:id")
  .put(
    checkAdminAndInstructorToken,
    Validator.borrowUpdate,
    borrowController.updateBorrow
  );

module.exports = router;
