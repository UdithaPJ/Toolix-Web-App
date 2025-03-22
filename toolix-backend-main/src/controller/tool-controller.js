const { SUCCESS, ERROR } = require("../../helper");
const { ToolCodes } = require("../constants/tool-constant");
const Service = require("../service/tool-service");

const createTool = async (req, res) => {
  try {
    const result = await Service.createTool(req.body);

    SUCCESS(res, ToolCodes.SUC_CREATE_TOOL, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const getTools = async (req, res) => {
  try {
    const result = await Service.getTools(req.query);

    SUCCESS(res, ToolCodes.SUC_CODE, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const updateTool = async (req, res) => {
  try {
    const result = await Service.updateTool(req.params, req.body);

    SUCCESS(res, ToolCodes.SUC_UPDATE_TOOL, result);
  } catch (error) {
    ERROR(res, error);
  }
};

const deleteTool = async (req, res) => {
  try {
    const result = await Service.deleteTool(req.params);

    SUCCESS(res, ToolCodes.SUC_DELETE_TOOL, result);
  } catch (error) {
    ERROR(res, error);
  }
};

module.exports = {
  createTool,
  getTools,
  updateTool,
  deleteTool,
};
