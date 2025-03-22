const { SUCCESS, ERROR } = require("../../helper");
const { BorrowCodes } = require("../constants/borrow-constant");
const Service = require("../service/borrow-service");

const createBorrow = async (req, res) => {
  try {
    const result = await Service.createBorrow(req.body, req.user);

    SUCCESS(res, BorrowCodes.SUC_CREATE_BORROW, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const getBorrows = async (req, res) => {
  try {
    const result = await Service.getBorrows(req.query);

    SUCCESS(res, BorrowCodes.SUC_CODE, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const updateBorrow = async (req, res) => {
  try {
    const result = await Service.updateBorrow(req.params, req.body, req.user);

    SUCCESS(res, BorrowCodes.SUC_UPDATE_BORROW, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const getBorrowsByInstructorId = async (req, res) => {
  try {
    const result = await Service.getBorrowsByInstructorId(req.query);

    SUCCESS(res, BorrowCodes.SUC_CODE, result);
  } catch (error) {
    ERROR(res, error);
  }
};

module.exports = {
  createBorrow,
  getBorrows,
  updateBorrow,
  getBorrowsByInstructorId,
};
