const { TE } = require("../../helper");

const BorrowSchema = require("../models/borrow");

const ToolSchema = require("../models/tool");

const { BorrowCodes, Status } = require("../constants/borrow-constant");

const { ToolCodes } = require("../constants/tool-constant");

const _findTool = async (filter) => {
  const tool = await ToolSchema.findOne(filter);
  return tool;
};

const _findBorrow = async (filter) => {
  const borrow = await BorrowSchema.findOne(filter);
  return borrow;
};

const createBorrow = async (data, user) => {
  try {
    const { toolId } = data;
    const borrowData = {
      ...data,
      tool: toolId,
      status: Status.REQUESTED,
      requestedDate: new Date(),
      student: user.id,
    };

    const tool = await _findTool({ _id: toolId, isAvailable: true });

    if (!tool) TE(ToolCodes.ERR_TOOL_NOT_FOUND);

    tool.isAvailable = false;
    await tool.save();

    const borrow = await BorrowSchema.create(borrowData);

    return borrow;
  } catch (error) {
    TE(error);
  }
};

const getBorrows = async (params) => {
  try {
    return await BorrowSchema.find(params)
      .sort({
        createdAt: -1,
      })
      .populate("tool", ["_id", "name", "description"])
      .populate("student", ["_id", "name", "email"])
      .populate("approvedBy", ["_id", "name"])
      .populate("rejectedBy", ["_id", "name"])
      .populate("collectedBy", ["_id", "name"]);
  } catch (error) {
    TE(error);
  }
};

const updateBorrow = async (params, data, user) => {
  try {
    const { status, dueDate } = data;
    const borrow = await _findBorrow({ _id: params.id });
    if (!borrow) TE(BorrowCodes.ERR_BORROW_NOT_FOUND);

    const tool = await _findTool({ _id: borrow.tool });
    if (!tool) TE(ToolCodes.ERR_TOOL_NOT_FOUND);

    let borrowToUpdate = {};

    if (status == Status.APPROVED) {
      if (borrow.status !== Status.REQUESTED)
        TE(BorrowCodes.ERR_TOOL_NOT_IN_REQUESTED_STATUS);
      borrowToUpdate = {
        status: Status.APPROVED,
        dueDate: dueDate,
        approvedBy: user.id,
        approvedDate: new Date(),
      };
    } else if (data.status == Status.REJECTED) {
      if (borrow.status !== Status.REQUESTED)
        TE(BorrowCodes.ERR_TOOL_NOT_IN_REQUESTED_STATUS);
      tool.isAvailable = true;
      borrowToUpdate = {
        status: Status.REJECTED,
        rejectedDate: new Date(),
        rejectedBy: user.id,
      };
    } else if (status == Status.RETURNED) {
      if (borrow.status !== Status.APPROVED)
        TE(BorrowCodes.ERR_TOOL_NOT_IN_APPROVED_STATUS);
      tool.isAvailable = true;
      borrowToUpdate = {
        status: Status.RETURNED,
        collectedDate: new Date(),
        collectedBy: user.id,
      };
    }

    await tool.save();

    return await BorrowSchema.findOneAndUpdate(
      { _id: borrow._id },
      { $set: borrowToUpdate },
      { new: true, runValidators: true }
    );
  } catch (error) {
    TE(error);
  }
};

const getBorrowsByInstructorId = async ({ instructorId }) => {
  try {
    const filter = {
      $or: [
        { approvedBy: instructorId },
        { rejectedBy: instructorId },
        { collectedBy: instructorId },
      ],
    };

    return await BorrowSchema.find(filter)
      .sort({
        createdAt: -1,
      })
      .populate("tool", ["_id", "name", "description"])
      .populate("student", ["_id", "name", "email"])
      .populate("approvedBy", ["_id", "name"])
      .populate("rejectedBy", ["_id", "name"])
      .populate("collectedBy", ["_id", "name"]);
  } catch (error) {
    TE(error);
  }
};

module.exports = {
  createBorrow,
  getBorrows,
  updateBorrow,
  getBorrowsByInstructorId,
};
