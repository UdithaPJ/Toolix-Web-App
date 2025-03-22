const ToolCodes = {
  SUC_CREATE_TOOL: { code: 201, message: "Tool created successfully" },

  SUC_CODE: { code: 200, message: "ok" },

  SUC_UPDATE_TOOL: { code: 200, message: "Tool updated successfully" },

  SUC_DELETE_TOOL: { code: 200, message: "Tool deleted successfully" },

  ERR_TOOL_NOT_FOUND: { code: 404, message: "Requested tool not found" },
};

module.exports = { ToolCodes };
