const Status = {
  REQUESTED: "REQUESTED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  RETURNED: "RETURNED",
};

const BorrowCodes = {
  SUC_CREATE_BORROW: {
    code: 201,
    message: "Borrow request recorded successfully",
  },

  SUC_CODE: { code: 200, message: "ok" },

  SUC_UPDATE_BORROW: { code: 200, message: "Borrowing updated successfully" },

  ERR_BORROW_NOT_FOUND: { code: 404, message: "Requested barrow not found" },

  ERR_BORROW_QUANTITY_LOWER: {
    code: 400,
    message:
      "This operation cannot be permitted because the requested quantity less than available quantity",
  },

  ERR_TOOL_NOT_IN_REQUESTED_STATUS: {
    code: 400,
    message:
      "This operation cannot be permitted because the selected borrowing is currently not in 'Requested' status.",
  },

  ERR_TOOL_NOT_IN_APPROVED_STATUS: {
    code: 400,
    message:
      "This operation cannot be permitted because the selected borrowing is currently not in 'Approved' status.",
  },
};

module.exports = { Status, BorrowCodes };
