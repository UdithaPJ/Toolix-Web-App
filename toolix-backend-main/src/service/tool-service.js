const { TE } = require("../../helper");

const ToolSchema = require("../models/tool");
const BorrowSchema = require("../models/borrow");

const { ToolCodes } = require("../constants/tool-constant");
const { Status } = require("../constants/borrow-constant");

const _findTool = async (filter) => {
  const tool = await ToolSchema.findOne(filter);
  return tool;
};

const createTool = async (data) => {
  
  const { quantity, name, description } = data;

  const toolArr = [];

  try {
    for (let i = 0; i < quantity; i++) {
      const data = {
        name: name + ` (${i + 1})`,
        isDeleted: false,
        description,
      };
      toolArr.push(data);
    }

    return await ToolSchema.insertMany(toolArr);
  } catch (error) {
    TE(error);
  }
};

const getTools = async (params) => {
  try {
    const { search, type } = params;

    let typeFilter;
    let searchFilter;

    if (type == "CURRENT") {
      typeFilter = { isAvailable: true };
    }

    if (search) {
      searchFilter = { name: { $regex: search, $options: "i" } };
    }

    const filter = { ...typeFilter, ...searchFilter, isDeleted: false };

    const tools = await ToolSchema.find(filter).lean();

    for (const tool of tools) {
      if (tool.isAvailable) {
        tool.availability = "Available";
      } else {
        const borrowings = await BorrowSchema.find({
          tool: tool._id,
          $or: [
            {
              status: Status.REQUESTED,
            },
            {
              status: Status.APPROVED,
            },
          ],
        })
          .populate("student")
          .sort({ createdAt: -1 });
        const { student, status } = borrowings[0];
        tool.availability = `Already ${
          status == Status.REQUESTED ? "requested" : "taken"
        } by ${student?.name || "someone"}`;
      }
    }
    return tools;
  } catch (error) {
    TE(error);
  }
};

const updateTool = async (params, data) => {
  try {
    let toolData = data;

    const tool = await _findTool({ _id: params.id });

    if (!tool) TE(ToolCodes.ERR_TOOL_NOT_FOUND);

    return await ToolSchema.findOneAndUpdate(
      { _id: tool._id },
      { $set: toolData },
      { new: true, runValidators: true }
    );
  } catch (error) {
    TE(error);
  }
};

const deleteTool = async (params) => {
  try {
    const tool = await _findTool({ _id: params.id });

    if (!tool) TE(ToolCodes.ERR_TOOL_NOT_FOUND);

    await ToolSchema.findByIdAndDelete({ _id: tool._id });

    return;
  } catch (error) {
    TE(error);
  }
};

module.exports = {
  createTool,
  getTools,
  updateTool,
  deleteTool,
};
